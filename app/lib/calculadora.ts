type IngredientesMap = {
    [key: string]: number;
  };
  
  const HORAS_EVENTO: Record<string, number> = {
    Casamiento: 6,
    Cumpleaños: 5,
    "15 Años": 5,
    Corporativo: 4,
    Otro: 5,
  };
  
  const FACTOR_CONSUMO: Record<string, number> = {
    Social: 0.7,
    Clasico: 1.0,
    "Barra Protagonista": 1.3,
  };
  
  export const RECETAS: Record<
    string,
    Record<string, number>
  > = {
    "Aperol Spritz": {
      aperol: 60,
      prosecco: 90,
      soda: 30,
    },
  
    "Gin Tonic": {
      gin: 60,
      tonica: 200,
      limon: 1,
    },
  
    Mojito: {
      ron: 60,
      soda: 120,
      lima: 10,
      menta: 5,
    },
  
    "Fernet con Cola": {
      fernet: 70,
      coca: 210,
    },
  
    "Sex on the Beach": {
      vodka: 40,
      licor_durazno: 20,
      jugo_naranja: 40,
      jugo_arandanos: 40,
    },
  
    "Vodka Berry Smash": {
      vodka: 60,
      pulpa_frutos_rojos: 40,
      almibar: 20,
    },
  };
  
  export const RENDIMIENTOS: Record<
    string,
    number
  > = {
    aperol: 750,
    prosecco: 750,
    gin: 750,
    ron: 750,
    fernet: 750,
    vodka: 750,
    licor_durazno: 750,
  
    soda: 1500,
    tonica: 1500,
    coca: 1500,
  
    lima: 20,
  };
  
  const ALCOHOLES = [
    "aperol",
    "prosecco",
    "gin",
    "ron",
    "fernet",
    "vodka",
    "licor_durazno",
  ];
  
  const MEZCLADORES = [
    "soda",
    "tonica",
    "coca",
    "jugo_naranja",
    "jugo_arandanos",
    "almibar",
    "pulpa_frutos_rojos",
  ];
  
  const FRUTAS = [
    "lima",
    "limon",
    "menta",
  ];
  
  export function calcularCantidades(
    evento: string,
    hombres: number,
    mujeres: number,
    consumo: string,
    tragos: string[]
  ) {
    const horas =
      HORAS_EVENTO[evento] ?? 5;
  
    const factor =
      FACTOR_CONSUMO[consumo] ?? 1;
  
    const personasEquivalentes =
      hombres +
      mujeres * 0.6;
  
    const totalTragos = Math.ceil(
      personasEquivalentes *
        horas *
        factor
    );
  
    const tragosPorCocktail =
      Math.ceil(
        totalTragos /
          Math.max(tragos.length, 1)
      );
  
    const ingredientes: IngredientesMap =
      {};
  
    const detallePorTrago =
      tragos.map((trago) => {
        const receta =
          RECETAS[trago];
  
        if (!receta) return null;
  
        const ingredientesTrago =
          Object.entries(receta).map(
            ([nombre, cantidad]) => {
              const total =
                cantidad *
                tragosPorCocktail;
  
              const rendimiento =
                RENDIMIENTOS[nombre];
  
              return {
                nombre,
                unidades:
                  rendimiento
                    ? Math.ceil(
                        total /
                          rendimiento
                      )
                    : Math.ceil(total),
              };
            }
          );
  
        return {
          trago,
          ingredientes:
            ingredientesTrago,
        };
      });
  
    tragos.forEach((trago) => {
      const receta =
        RECETAS[trago];
  
      if (!receta) return;
  
      Object.entries(receta).forEach(
        ([ingrediente, cantidad]) => {
          ingredientes[ingrediente] =
            (ingredientes[
              ingrediente
            ] || 0) +
            cantidad *
              tragosPorCocktail;
        }
      );
    });
  
    const resumen =
      Object.entries(
        ingredientes
      ).map(
        ([ingrediente, cantidad]) => {
          const rendimiento =
            RENDIMIENTOS[
              ingrediente
            ];
  
          return {
            ingrediente,
            cantidad,
            unidades:
              rendimiento
                ? Math.ceil(
                    cantidad /
                      rendimiento
                  )
                : Math.ceil(
                    cantidad
                  ),
          };
        }
      );
  
    const alcoholes =
      resumen.filter((item) =>
        ALCOHOLES.includes(
          item.ingrediente
        )
      );
  
    const mezcladores =
      resumen.filter((item) =>
        MEZCLADORES.includes(
          item.ingrediente
        )
      );
  
    const frutas =
      resumen.filter((item) =>
        FRUTAS.includes(
          item.ingrediente
        )
      );
  
    const hieloKg = Math.ceil(
      (totalTragos * 150) / 1000
    );
  
    return {
      personasEquivalentes,
      totalTragos,
      tragosPorCocktail,
  
      alcoholes,
      mezcladores,
      frutas,
  
      detallePorTrago,
  
      hieloKg,
    };
  }