"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvent } from "../../context/EventContext";
import { calcularCantidadesSupabase, guardarConsulta, ResultadoCalculo } from "../lib/calculadora-supabase";
import { useEffect, useState, useMemo } from "react";

const HORAS_EVENTO: Record<string, number> = {
  Casamiento: 8, Cumpleaños: 6, "15 Años": 8, Corporativo: 4, "Otro Evento": 5,
};

const TRAGO_IMAGEN: Record<string, string> = {
  "Aperol Spritz": "/images/Aperol.png",
  "Merle Gin & Tonic": "/images/Gin.png",
  "Mojito": "/images/mojito.png",
  "Fernet con Coca": "/images/fernet.png",
  "Sex on the Beach": "/images/sexonthebeach.png",
  "Vodka Berry Smash": "/images/vodkaberry.png",
};

export default function CantidadesPage() {
  const { data } = useEvent();
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [tragoActivo, setTragoActivo] = useState(0);
  const [verTodosIng, setVerTodosIng] = useState(false);
  const [pesos, setPesos] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!data.evento) return;
    setLoading(true);
    calcularCantidadesSupabase(data.evento, data.hombres, data.mujeres, data.consumo, data.tragos)
      .then((r) => {
        setResultado(r);
        const pesosIniciales: Record<string, number> = {};
        r.detallePorTrago.forEach((item) => {
          pesosIniciales[item.trago] = Math.round(100 / r.detallePorTrago.length);
        });
        setPesos(pesosIniciales);
        setLoading(false);
      });
  }, [data]);

  const detallePonderado = useMemo(() => {
    if (!resultado) return [];
    const totalPeso = Object.values(pesos).reduce((a, b) => a + b, 0) || 1;
    return resultado.detallePorTrago.map((item) => {
      const peso = pesos[item.trago] || 0;
      const servings = Math.max(1, Math.round((resultado.totalTragos * peso) / totalPeso));
      return {
        ...item,
        tragos: servings,
        ingredientes: item.ingredientes.map((ing) => ({
          ...ing,
          unidades: Math.ceil((ing.unidades / (resultado.tragosPorCocktail || 1)) * servings),
        })),
      };
    });
  }, [resultado, pesos]);

  const ingredientesTotales = useMemo(() => {
    const totales: Record<string, { nombre: string; unidades: number; unidadLabel: string }> = {};
    detallePonderado.forEach((item) => {
      item.ingredientes.forEach((ing) => {
        if (!totales[ing.nombre]) totales[ing.nombre] = { nombre: ing.nombre, unidades: 0, unidadLabel: ing.unidadLabel };
        totales[ing.nombre].unidades += ing.unidades;
      });
    });
    return Object.values(totales).sort((a, b) => b.unidades - a.unidades);
  }, [detallePonderado]);

  const ingVisibles = verTodosIng ? ingredientesTotales : ingredientesTotales.slice(0, 4);

  const getEventoImage = () => {
    switch (data.evento) {
      case "Casamiento": return "/images/casamiento.png";
      case "Cumpleaños": return "/images/cumpleaños.png";
      case "15 Años": return "/images/15años.png";
      case "Corporativo": return "/images/corporativo.png";
      default: return "/images/otroevento.png";
    }
  };

  const handleSolicitar = async () => {
    if (resultado) {
      await guardarConsulta({
        evento: data.evento, personas: data.personas, mujeres: data.mujeres,
        hombres: data.hombres, consumo: data.consumo, tragos: data.tragos,
        nombre, telefono, fecha, total_tragos: resultado.totalTragos,
      });
    }
    const msg = `🍹 Nueva consulta desde el Planificador Prestige\n\nEvento: ${data.evento}\nPersonas: ${data.personas}\nConsumo: ${data.consumo}\nTragos: ${data.tragos.join(', ')}\nTotal tragos: ${resultado?.totalTragos}\n\nCliente: ${nombre || '-'}\nTeléfono: ${telefono || '-'}\nFecha: ${fecha || '-'}`;
    window.open(`https://wa.me/5493446584028?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🍹</div>
        <p className="text-yellow-500 text-2xl">Calculando tu barra ideal…</p>
        <p className="text-zinc-400 mt-2">Consultando recetas reales de Prestige</p>
      </div>
    </main>
  );

  if (!resultado) return null;

  const horas = HORAS_EVENTO[data.evento] || 6;
  const tragoDetalleActivo = detallePonderado[tragoActivo];
  const totalPeso = Object.values(pesos).reduce((a, b) => a + b, 0) || 1;

  return (
    <main className="min-h-screen bg-black text-white px-3 sm:px-6 py-3 flex flex-col gap-2">

      {/* HEADER */}
      <div className="text-center shrink-0">
        <h1 className="text-lg sm:text-2xl font-bold">PLANIFICÁ TU <span className="text-yellow-500">BARRA IDEAL</span></h1>
        <p className="text-zinc-400 text-xs hidden sm:block">Todo lo que necesitás para un evento perfecto</p>
      </div>

      {/* STEPPER */}
      <div className="flex justify-center items-center gap-2 sm:gap-6 shrink-0">
        {["EVENTO", "PERSONAS", "CONSUMO", "TRAGOS", "CANTIDADES"].map((paso, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 4 ? "bg-green-500 text-black" : "bg-yellow-500 text-black"}`}>
              {i < 4 ? "✓" : "5"}
            </div>
            <span className={`text-xs uppercase font-semibold hidden sm:block ${i === 4 ? "text-yellow-500" : "text-zinc-400"}`}>{paso}</span>
          </div>
        ))}
      </div>

      {/* BANNER CELULAR — solo mobile */}
      <div className="relative sm:hidden rounded-xl overflow-hidden border border-yellow-700/30 h-20 shrink-0">
        <Image src={getEventoImage()} alt={data.evento} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 px-4 flex items-center justify-between">
          <div>
            <p className="text-yellow-500 text-xs uppercase tracking-widest">Evento</p>
            <h2 className="text-base font-bold">{data.evento}</h2>
          </div>
          <div className="flex gap-4 text-xs">
            {[["Invitados", data.personas], ["Tragos", data.tragos.length], ["Consumo", data.consumo]].map(([l, v]) => (
              <div key={l as string} className="text-center">
                <p className="text-zinc-400">{l}</p>
                <p className="font-bold text-white">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILA PRINCIPAL — desktop: imagen columna izquierda / celular: sin imagen */}
      <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-2 sm:gap-3 flex-1 min-h-0">

        {/* Imagen evento — solo desktop, columna alta */}
        <div className="hidden sm:block relative rounded-2xl overflow-hidden border border-yellow-700/30">
          <Image src={getEventoImage()} alt={data.evento} fill sizes="300px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div>
              <p className="text-yellow-500 text-xs uppercase tracking-widest">Evento</p>
              <h2 className="text-xl font-bold">{data.evento}</h2>
            </div>
            <div className="space-y-1 text-sm">
              {[["Invitados", data.personas], ["Consumo", data.consumo], ["Tragos elegidos", data.tragos.length]].map(([l, v]) => (
                <div key={l as string} className="flex justify-between">
                  <span className="text-zinc-400">{l}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha — KPIs + sliders + paneles */}
        <div className="flex flex-col gap-2 min-h-0">

          {/* KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
            {[
              ["TRAGOS", resultado.totalTragos, "estimados"],
              ["POR CÓCTEL", tragoDetalleActivo?.tragos || 0, "activo"],
              ["HIELO", `${resultado.hieloKg} kg`, "total"],
              ["DURACIÓN", `${horas} hs`, "del evento"],
            ].map(([label, val, sub]) => (
              <div key={label as string} className="bg-zinc-950 border border-yellow-700/30 rounded-xl p-2 sm:p-3 text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-500">{val}</p>
                <p className="text-zinc-500 text-xs">{sub}</p>
              </div>
            ))}
          </div>

          {/* Sliders tragos */}
          <div className="bg-zinc-950 border border-yellow-700/30 rounded-xl px-2 sm:px-3 py-2 shrink-0">
            <p className="text-yellow-500 text-xs uppercase tracking-wide mb-1.5">¿Cuál es la preferencia de tus invitados? selecciona el coctel para ver ingredientes</p>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
              {detallePonderado.map((item, i) => {
                const peso = pesos[item.trago] || 0;
                const pct = Math.round((peso / totalPeso) * 100);
                return (
                  <div
                    key={item.trago}
                    onClick={() => setTragoActivo(i)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-xl border p-1.5 cursor-pointer transition-all w-16 sm:w-24 ${tragoActivo === i ? "border-yellow-500 bg-yellow-500/10" : "border-zinc-700"}`}
                  >
                    <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-zinc-800">
                      {TRAGO_IMAGEN[item.trago]
                        ? <Image src={TRAGO_IMAGEN[item.trago]} alt={item.trago} fill sizes="48px" className="object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-sm">🍹</div>}
                    </div>
                    <p className="text-xs text-center w-full truncate leading-tight">{item.trago}</p>
                    <p className="text-xs text-yellow-500 font-bold">{item.tragos}</p>
                    <input
                      type="range" min={0} max={10} value={peso}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => { e.stopPropagation(); setPesos((prev) => ({ ...prev, [item.trago]: Number(e.target.value) })); }}
                      className="w-full accent-yellow-500 h-1"
                    />
                    <p className="text-xs text-zinc-400">{pct}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Paneles — desktop: 4 columnas / celular: apilado */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_240px] gap-2 sm:gap-3 flex-1">

            {/* Detalle trago activo */}
            <div className="bg-zinc-950 border border-yellow-700/30 rounded-2xl p-4 flex flex-col">
              {tragoDetalleActivo && (
                <>
                  <div className="flex items-center gap-3 mb-3 pb-2 border-b border-yellow-500/20">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                      {TRAGO_IMAGEN[tragoDetalleActivo.trago]
                        ? <Image src={TRAGO_IMAGEN[tragoDetalleActivo.trago]} alt={tragoDetalleActivo.trago} fill sizes="32px" className="object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-sm">🍹</div>}
                    </div>
                    <div>
                      <h3 className="text-yellow-500 font-bold text-sm">{tragoDetalleActivo.trago}</h3>
                      <p className="text-zinc-400 text-xs">{tragoDetalleActivo.tragos} tragos estimados</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                    {tragoDetalleActivo.ingredientes.map((ing) => (
                      <div key={ing.nombre} className="flex items-center justify-between bg-black/40 rounded-xl px-3 py-2 border border-zinc-800">
                        <div>
                          <p className="capitalize text-xs font-medium">{ing.nombre}</p>
                          <p className="text-zinc-500 text-xs">{ing.unidadLabel}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-yellow-500 font-bold text-base">{ing.unidades}</span>
                          <p className="text-zinc-500 text-xs">unid.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Ingredientes totales */}
            <div className="bg-zinc-950 border border-yellow-700/30 rounded-2xl p-4 flex flex-col">
              <h3 className="text-yellow-500 font-bold mb-3 pb-2 border-b border-yellow-500/20 text-sm">Resumen de ingredientes totales</h3>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {ingVisibles.map((ing) => (
                  <div key={ing.nombre} className="flex items-center justify-between bg-black/40 rounded-xl px-3 py-2 border border-zinc-800">
                    <div>
                      <p className="capitalize text-xs font-medium">{ing.nombre}</p>
                      <p className="text-zinc-500 text-xs">{ing.unidadLabel}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-yellow-500 font-bold text-base">{ing.unidades}</span>
                      <p className="text-zinc-500 text-xs">unid.</p>
                    </div>
                  </div>
                ))}
              </div>
              {ingredientesTotales.length > 4 && (
                <button onClick={() => setVerTodosIng(!verTodosIng)} className="mt-2 text-yellow-500 text-xs hover:text-yellow-400 transition">
                  {verTodosIng ? "Ver menos ↑" : `Ver todos (${ingredientesTotales.length}) ↓`}
                </button>
              )}
            </div>

            {/* Insumos */}
            <div className="bg-zinc-950 border border-yellow-700/30 rounded-2xl p-4 flex flex-col">
              <h3 className="text-yellow-500 font-bold mb-3 pb-2 border-b border-yellow-500/20 text-sm">Insumos y complementos</h3>
              <div className="space-y-2">
                {[
                  { label: "Hielo", val: `${resultado.hieloKg} kg`, sub: `${Math.ceil(resultado.hieloKg)} bolsas de 1 kg`, emoji: "🧊" },
                  { label: "Agua 500cc", val: `${resultado.agua} unid.`, sub: "botellas individuales", emoji: "💧" },
                  { label: "Vasos", val: `${resultado.vasos} unid.`, sub: "incluye reposición", emoji: "🥂" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between bg-black/40 rounded-xl px-3 py-2 border border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span>{item.emoji}</span>
                      <div>
                        <p className="font-medium text-xs">{item.label}</p>
                        <p className="text-zinc-500 text-xs">{item.sub}</p>
                      </div>
                    </div>
                    <span className="text-yellow-500 font-bold text-sm">{item.val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3">
                <p className="text-yellow-500 text-xs font-semibold mb-1">🎁 Beneficio exclusivo</p>
                <p className="text-zinc-400 text-xs">Solicitá tu propuesta y obtené 5% OFF contratando desde esta terminal.</p>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-zinc-950 border border-yellow-700/30 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-yellow-500 font-bold mb-1 text-sm">Tu barra está lista</h3>
                <p className="text-zinc-400 text-xs mb-3">Dejanos tus datos y un asesor te contacta para confirmar el pedido.</p>
                <div className="space-y-2">
                  <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
                  <input type="tel" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
                  <input type="date" value={fecha} onChange={e => setFecha(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-500" />
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <button onClick={handleSolicitar}
                  className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition">
                  SOLICITAR PROPUESTA →
                </button>
                <Link href="/tragos"
                  className="w-full block border border-zinc-700 text-center py-2.5 rounded-xl text-sm hover:border-yellow-500 transition">
                  ← VOLVER
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}