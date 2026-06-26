"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEvent } from "../../context/EventContext";

const eventos = [
  {
    nombre: "Casamiento",
    imagen: "/images/casamiento.png",
    icono: "💍",
  },
  {
    nombre: "Cumpleaños",
    imagen: "/images/cumpleaños.png",
    icono: "🎂",
  },
  {
    nombre: "15 Años",
    imagen: "/images/15años.png",
    icono: "👑",
  },
  {
    nombre: "Corporativo",
    imagen: "/images/corporativo.png",
    icono: "💼",
  },
  {
    nombre: "Otro Evento",
    imagen: "/images/otroevento.png",
    icono: "🎉",
  },
];

export default function EventoPage() {
  const { setEvento } = useEvent();

  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActivo((prev) =>
        prev >= eventos.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-[1700px] mx-auto px-8 py-8">

        {/* HEADER */}

        <div className="flex justify-between items-start mb-10">

          <Image
            src="/images/logo.png"
            alt="Prestige"
            width={130}
            height={130}
          />

          <div className="text-center">

            <h1 className="text-5xl text-yellow-500 mb-2">
              PLANIFICÁ TU BARRA IDEAL
            </h1>

            <p className="text-zinc-300 text-xl">
              En simples pasos calculamos las cantidades perfectas para tu evento
            </p>

          </div>

          <div className="border border-yellow-500/30 rounded-2xl px-6 py-4 bg-zinc-950">

            <div className="font-semibold">
              ¿NECESITÁS AYUDA?
            </div>

            <div className="text-zinc-400">
              Hablá con un asesor
            </div>

          </div>

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
                    index === 0
                      ? "bg-yellow-500 text-black border-yellow-500"
                      : "border-zinc-700 text-zinc-500"
                  }
                `}
              >
                {index + 1}
              </div>

              <div className="mt-3 text-center text-sm text-zinc-400 uppercase">
                {paso}
              </div>

            </div>

          ))}

        </div>

        {/* TITULO */}

        <div className="text-center mb-12">

          <h2 className="text-6xl font-light mb-4">
            ¿Qué tipo de evento
            <br />
            <span className="text-yellow-500">
              estás organizando?
            </span>
          </h2>

          <p className="text-zinc-400 text-xl">
            Seleccioná la opción que mejor lo describe
          </p>

        </div>

        {/* CARDS */}

        <div className="grid grid-cols-5 gap-6 mb-12">

          {eventos.map((evento, index) => (

            <Link
              key={evento.nombre}
              href="/personas"
              onClick={() =>
                setEvento(evento.nombre)
              }
              className={`
                relative
                h-[520px]
                rounded-3xl
                overflow-hidden
                transition-all
                duration-500

                ${
                  activo === index
                    ? "scale-105 border-2 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.4)]"
                    : "border border-yellow-700/30"
                }
              `}
            >

              <Image
                src={evento.imagen}
                alt={evento.nombre}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-10 left-0 right-0 text-center">

                <div className="text-6xl mb-4">
                  {evento.icono}
                </div>

                <div className="text-3xl font-semibold">
                  {evento.nombre}
                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* BENEFICIOS */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">

            <div className="text-5xl mb-4">
              🛡️
            </div>

            <h3 className="text-2xl text-yellow-500 mb-2">
              Cantidades Precisas
            </h3>

            <p className="text-zinc-400">
              Calculamos exactamente lo que necesitás para evitar faltantes y excesos.
            </p>

          </div>

          <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">

            <div className="text-5xl mb-4">
              🍸
            </div>

            <h3 className="text-2xl text-yellow-500 mb-2">
              Tragos que Encantan
            </h3>

            <p className="text-zinc-400">
              Elegí los favoritos de tus invitados entre los más pedidos.
            </p>

          </div>

          <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">

            <div className="text-5xl mb-4">
              ✨
            </div>

            <h3 className="text-2xl text-yellow-500 mb-2">
              Experiencia Prestige
            </h3>

            <p className="text-zinc-400">
              Diseñamos barras elegantes para que tu evento tenga identidad propia.
            </p>

          </div>

        </div>

        {/* VOLVER */}
        <div className="flex justify-start mt-8">
          <Link href="/" className="border border-zinc-700 px-10 py-4 rounded-2xl text-xl hover:border-yellow-500 transition">
            ← VOLVER
          </Link>
        </div>

      </div>

    </main>
  );
}