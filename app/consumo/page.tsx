"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEvent } from "../../context/EventContext";

const opciones = [
  {
    nombre: "Social",
    emoji: "🍷",
    tragos: "3 a 4 tragos por persona",
    descripcion: "La bebida acompaña la conversación.",
  },
  {
    nombre: "Clasico",
    emoji: "🍸",
    tragos: "5 a 6 tragos por persona",
    descripcion: "El escenario más habitual.",
  },
  {
    nombre: "Barra Protagonista",
    emoji: "🎉",
    tragos: "7 a 9 tragos por persona",
    descripcion: "La barra será uno de los centros de la fiesta.",
  },
];

export default function ConsumoPage() {
  const { setConsumo } = useEvent();
  const [activo, setActivo] = useState(1);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActivo((prev) => prev >= opciones.length - 1 ? 0 : prev + 1);
    }, 2500);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 sm:py-10">

        {/* HEADER */}
        <div className="text-center mb-4 sm:mb-10">
          <h1 className="text-xl sm:text-5xl text-yellow-500 mb-1 sm:mb-2">PLANIFICÁ TU BARRA IDEAL</h1>
          <p className="text-zinc-300 text-xs sm:text-xl hidden sm:block">En simples pasos calculamos las cantidades perfectas para tu evento</p>
        </div>

        {/* PASOS */}
        <div className="flex justify-center items-center gap-3 sm:gap-12 mb-6 sm:mb-16">
          {["Tipo de Evento", "Personas", "Consumo", "Tragos", "Cantidades"].map((paso, index) => (
            <div key={paso} className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-sm sm:text-2xl font-bold border ${
                index <= 1 ? "bg-green-500 text-black border-green-500" :
                index === 2 ? "bg-yellow-500 text-black border-yellow-500" :
                "border-zinc-700 text-zinc-500"
              }`}>
                {index <= 1 ? "✓" : index + 1}
              </div>
              <div className="mt-1 sm:mt-3 text-center text-xs text-zinc-400 uppercase hidden sm:block">{paso}</div>
            </div>
          ))}
        </div>

        {/* TITULO */}
        <div className="text-center mb-6 sm:mb-16">
          <h2 className="text-2xl sm:text-6xl font-light mb-2 sm:mb-4">
            ¿Cuál es la preferencia de trago
            <span className="text-yellow-500"> de tus invitados?</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-xl">Esto nos ayuda a estimar mejor las cantidades.</p>
        </div>

        {/* OPCIONES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-16">
          {opciones.map((opcion, index) => (
            <Link
              key={opcion.nombre}
              href="/tragos"
              onClick={() => setConsumo(opcion.nombre)}
              className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-zinc-950 transition-all duration-500 ${
                activo === index
                  ? "border-2 border-yellow-500 scale-105 shadow-[0_0_40px_rgba(234,179,8,0.35)]"
                  : "border border-yellow-700/30"
              }`}
            >
              <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0">
                <div className="text-4xl sm:text-7xl sm:mb-6">{opcion.emoji}</div>
                <div>
                  <h3 className="text-xl sm:text-4xl sm:mb-6 font-semibold">{opcion.nombre}</h3>
                  <div className="text-yellow-500 text-sm sm:text-xl font-semibold sm:mb-4">{opcion.tragos}</div>
                  <p className="text-zinc-400 text-xs sm:text-lg hidden sm:block">{opcion.descripcion}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* VOLVER */}
        <div className="flex justify-start mb-6 sm:mb-8">
          <Link href="/personas" className="border border-zinc-700 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-sm sm:text-xl hover:border-yellow-500 transition">
            ← VOLVER
          </Link>
        </div>

        {/* BENEFICIOS - solo desktop */}
        <div className="hidden sm:grid md:grid-cols-3 gap-6">
          {[
            { emoji: "📊", titulo: "Estimación Inteligente", texto: "Calculamos el volumen ideal según el perfil de tus invitados." },
            { emoji: "🍸", titulo: "Sin Faltantes", texto: "Evitá quedarte corto durante el momento más importante." },
            { emoji: "💰", titulo: "Sin Excesos", texto: "Comprá solamente lo necesario para tu celebración." },
          ].map((b) => (
            <div key={b.titulo} className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">
              <div className="text-4xl mb-3">{b.emoji}</div>
              <h3 className="text-xl text-yellow-500 mb-2">{b.titulo}</h3>
              <p className="text-zinc-400 text-sm">{b.texto}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}