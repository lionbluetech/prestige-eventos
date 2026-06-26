"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEvent } from "../../context/EventContext";

const opciones = [
  {
    nombre: "Social",
    emoji: "🍷",
    tragos: "3 a 4 tragos por persona",
    descripcion:
      "La bebida acompaña la conversación.",
  },
  {
    nombre: "Clasico",
    emoji: "🍸",
    tragos: "5 a 6 tragos por persona",
    descripcion:
      "El escenario más habitual.",
  },
  {
    nombre: "Barra Protagonista",
    emoji: "🎉",
    tragos: "7 a 9 tragos por persona",
    descripcion:
      "La barra será uno de los centros de la fiesta.",
  },
];

export default function ConsumoPage() {
  const { setConsumo } = useEvent();

  const [activo, setActivo] = useState(1);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActivo((prev) =>
        prev >= opciones.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-10 py-10">

        {/* HEADER */}

        <div className="text-center mb-10">

          <h1 className="text-5xl text-yellow-500 mb-2">
            PLANIFICÁ TU BARRA IDEAL
          </h1>

          <p className="text-zinc-300 text-xl">
            En simples pasos calculamos las cantidades perfectas para tu evento
          </p>

        </div>

        {/* PASOS */}

        <div className="flex justify-center items-center gap-12 mb-16">

          {[
            "Tipo de Evento",
            "Cantidad de Personas",
            "Consumo",
            "Tragos",
            "Cantidades",
          ].map((paso, index) => (

            <div
              key={paso}
              className="flex flex-col items-center"
            >

              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border

                  ${
                    index <= 1
                      ? "bg-green-500 text-black border-green-500"
                      : index === 2
                      ? "bg-yellow-500 text-black border-yellow-500"
                      : "border-zinc-700 text-zinc-500"
                  }
                `}
              >
                {index <= 1 ? "✓" : index + 1}
              </div>

              <div className="mt-3 text-center text-sm text-zinc-400 uppercase">
                {paso}
              </div>

            </div>

          ))}

        </div>

        {/* TITULO */}

        <div className="text-center mb-16">

          <h2 className="text-6xl font-light mb-4">
            ¿Cómo toman tus
            <span className="text-yellow-500">
              {" "}invitados?
            </span>
          </h2>

          <p className="text-zinc-400 text-xl">
            Esto nos ayuda a estimar mejor las cantidades.
          </p>

        </div>

        {/* OPCIONES */}

        <div className="grid md:grid-cols-3 gap-8 mb-16">

          {opciones.map((opcion, index) => (

            <Link
              key={opcion.nombre}
              href="/tragos"
              onClick={() =>
                setConsumo(opcion.nombre)
              }
              className={`
                relative
                rounded-3xl
                p-10
                bg-zinc-950
                transition-all
                duration-500

                ${
                  activo === index
                    ? "border-2 border-yellow-500 scale-105 shadow-[0_0_40px_rgba(234,179,8,0.35)]"
                    : "border border-yellow-700/30"
                }
              `}
            >

              <div className="text-center">

                <div className="text-7xl mb-6">
                  {opcion.emoji}
                </div>

                <h3 className="text-4xl mb-6">
                  {opcion.nombre}
                </h3>

                <div className="text-yellow-500 text-xl font-semibold mb-4">
                  {opcion.tragos}
                </div>

                <p className="text-zinc-400 text-lg">
                  {opcion.descripcion}
                </p>

              </div>

            </Link>

          ))}

        </div>

        {/* NAVEGACIÓN VOLVER */}
        <div className="flex justify-start mb-8">
          <Link href="/personas" className="border border-zinc-700 px-10 py-4 rounded-2xl text-xl hover:border-yellow-500 transition">
            ← VOLVER
          </Link>
        </div>

        {/* BENEFICIOS */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">

            <div className="text-5xl mb-4">
              📊
            </div>

            <h3 className="text-2xl text-yellow-500 mb-2">
              Estimación Inteligente
            </h3>

            <p className="text-zinc-400">
              Calculamos el volumen ideal según el perfil de tus invitados.
            </p>

          </div>

          <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">

            <div className="text-5xl mb-4">
              🍸
            </div>

            <h3 className="text-2xl text-yellow-500 mb-2">
              Sin Faltantes
            </h3>

            <p className="text-zinc-400">
              Evitá quedarte corto durante el momento más importante.
            </p>

          </div>

          <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">

            <div className="text-5xl mb-4">
              💰
            </div>

            <h3 className="text-2xl text-yellow-500 mb-2">
              Sin Excesos
            </h3>

            <p className="text-zinc-400">
              Comprá solamente lo necesario para tu celebración.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}