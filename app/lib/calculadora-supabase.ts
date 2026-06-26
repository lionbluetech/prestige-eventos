import { supabase } from './supabase';

// Factores calibrados con datos reales de Prestige
// (del quince de Sofía 130 personas / 8.5hs y el evento de adultos)
export const HORAS_EVENTO: Record<string, number> = {
  Casamiento: 8,
  Cumpleaños: 6,
  '15 Años': 8,
  Corporativo: 4,
  'Otro Evento': 5,
};

export const FACTOR_CONSUMO: Record<string, number> = {
  Social: 0.4,       // quince / eventos con menores / adultos mayores tranquilos
  Clasico: 0.7,      // adultos mayores de 40 / cena / evento mixto
  'Barra Protagonista': 1.0, // fiesta de adultos / cumpleaños / after
};

export type IngredienteCalculado = {
  nombre: string;
  unidades: number;
  unidadLabel: string;
};

export type DetalleTrago = {
  trago: string;
  tragos: number;
  ingredientes: IngredienteCalculado[];
};

export type ResultadoCalculo = {
  totalTragos: number;
  tragosPorCocktail: number;
  hieloKg: number;
  agua: number;
  vasos: number;
  personasEquivalentes: number;
  detallePorTrago: DetalleTrago[];
};

// Carga ingredientes desde Supabase
async function getIngredientes(): Promise<Record<string, { yield: number; label: string; purchaseUnitLabel: string }>> {
  const { data } = await supabase.from('ingredients').select('key, label, yield_per_purchase_unit, purchase_unit_label');
  if (!data) return {};
  const map: Record<string, { yield: number; label: string; purchaseUnitLabel: string }> = {};
  data.forEach((i: { key: string; label: string; yield_per_purchase_unit: number; purchase_unit_label: string }) => {
    map[i.key] = { yield: i.yield_per_purchase_unit, label: i.label, purchaseUnitLabel: i.purchase_unit_label };
  });
  return map;
}

// Carga recetas desde Supabase
async function getRecetas(): Promise<Record<string, Array<{ ingredient_key: string; amount: number }>>> {
  const { data } = await supabase.from('cocktail_ingredients').select('cocktail_key, ingredient_key, amount');
  if (!data) return {};
  const map: Record<string, Array<{ ingredient_key: string; amount: number }>> = {};
  data.forEach((r: { cocktail_key: string; ingredient_key: string; amount: number }) => {
    if (!map[r.cocktail_key]) map[r.cocktail_key] = [];
    map[r.cocktail_key].push({ ingredient_key: r.ingredient_key, amount: r.amount });
  });
  return map;
}

// Carga los keys de cócteles por label desde Supabase
async function getCocktailKeys(): Promise<Record<string, string>> {
  const { data } = await supabase.from('cocktails').select('key, label');
  if (!data) return {};
  const map: Record<string, string> = {};
  data.forEach((c: { key: string; label: string }) => {
    map[c.label] = c.key;
  });
  return map;
}

export async function calcularCantidadesSupabase(
  evento: string,
  hombres: number,
  mujeres: number,
  consumo: string,
  tragos: string[]
): Promise<ResultadoCalculo> {
  const horas = HORAS_EVENTO[evento] ?? 6;
  const factor = FACTOR_CONSUMO[consumo] ?? 0.7;

  // Mujeres consumen ~60% respecto a hombres en promedio
  const personasEquivalentes = hombres + mujeres * 0.6;
  const totalTragos = Math.ceil(personasEquivalentes * horas * factor);
  const tragosPorCocktail = Math.ceil(totalTragos / Math.max(tragos.length, 1));

  // Cargar datos de Supabase
  const [ingredientes, recetas, cocktailKeys] = await Promise.all([
    getIngredientes(),
    getRecetas(),
    getCocktailKeys(),
  ]);

  const detallePorTrago: DetalleTrago[] = tragos.map((tragoLabel) => {
    const key = cocktailKeys[tragoLabel] || tragoLabel.toLowerCase().replace(/ /g, '_');
    const receta = recetas[key] || [];

    const ingredientesCalculados: IngredienteCalculado[] = receta.map((linea) => {
      const totalMl = linea.amount * tragosPorCocktail;
      const ing = ingredientes[linea.ingredient_key];
      const rendimiento = ing?.yield || 1;
      const unidades = Math.ceil(totalMl / rendimiento);
      return {
        nombre: ing?.label || linea.ingredient_key,
        unidades,
        unidadLabel: ing?.purchaseUnitLabel || 'unidad',
      };
    });

    return {
      trago: tragoLabel,
      tragos: tragosPorCocktail,
      ingredientes: ingredientesCalculados,
    };
  });

  // Insumos generales calibrados con datos reales Prestige
  const hieloKg = Math.ceil((mujeres + hombres) * 1.1); // 1.1kg por persona (datos reales)
  const agua = Math.ceil((mujeres + hombres) * 0.8);    // ~1 botella cada 1.25 personas
  const vasos = Math.ceil((mujeres + hombres) * 1.5);

  return {
    totalTragos,
    tragosPorCocktail,
    hieloKg,
    agua,
    vasos,
    personasEquivalentes,
    detallePorTrago,
  };
}

// Guardar la consulta del cliente en Supabase
export async function guardarConsulta(data: {
  evento: string;
  personas: number;
  mujeres: number;
  hombres: number;
  consumo: string;
  tragos: string[];
  nombre?: string;
  telefono?: string;
  fecha?: string;
  total_tragos: number;
}) {
  const { error } = await supabase.from('consultas_kiosk').insert({
    event_type: data.evento,
    guests: data.personas,
    mujeres: data.mujeres,
    hombres: data.hombres,
    consumo: data.consumo,
    cocktails: data.tragos,
    client_name: data.nombre || null,
    client_phone: data.telefono || null,
    event_date: data.fecha || null,
    total_tragos: data.total_tragos,
    created_at: new Date().toISOString(),
  });
  return error;
}
