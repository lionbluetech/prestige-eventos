"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEvent } from "../../context/EventContext";

const eventos = [
  { nombre: "Casamiento", imagen: "/images/casamiento.png", icono: "💍" },
  { nombre: "Cumpleaños", imagen: "/images/cumpleaños.png", icono: "🎂" },
  { nombre: "15 Años", imagen: "/images/15años.png", icono: "👑" },
  { nombre: "Corporativo", imagen: "/images/corporativo.png", icono: "💼" },
  { nombre: "Otro Evento", imagen: "/images/otroevento.png", icono: "🎉" },
];

export default function EventoPage() {
  const { setEvento } = useEvent();
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActivo((prev) => prev >= eventos.length - 1 ? 0 : prev + 1);
    }, 2500);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 py-4 sm:py-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Image src="/images/logo.png" alt="Prestige" width={70} height={70} className="sm:w-[100px] sm:h-[100px]" />
          <div className="text-center">
            <h1 className="text-xl sm:text-4xl text-yellow-500 mb-1">PLANIFICÁ TU BARRA IDEAL</h1>
            <p className="text-zinc-300 text-xs sm:text-base hidden sm:block">En simples pasos calculamos las cantidades perfectas para tu evento</p>
          </div>
          <div className="hidden sm:block border border-yellow-500/30 rounded-2xl px-4 py-3 bg-zinc-950 text-sm">
            <div className="font-semibold">¿NECESITÁS AYUDA?</div>
            <div className="text-zinc-400">Hablá con un asesor</div>
          </div>
          <div className="sm:hidden w-[70px]" />
        </div>

        {/* PASOS */}
        <div className="flex justify-center items-center gap-3 sm:gap-12 mb-4 sm:mb-8">
          {["Tipo de Evento", "Personas", "Consumo", "Tragos", "Cantidades"].map((paso, index) => (
            <div key={paso} className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-sm sm:text-2xl font-bold border ${
                index === 0 ? "bg-yellow-500 text-black border-yellow-500" : "border-zinc-700 text-zinc-500"
              }`}>
                {index + 1}
              </div>
              <div className="mt-1 sm:mt-3 text-center text-xs text-zinc-400 uppercase hidden sm:block">{paso}</div>
            </div>
          ))}
        </div>

        {/* TITULO */}
        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-2xl sm:text-5xl font-light mb-2">
            ¿Qué tipo de evento
            <br />
            <span className="text-yellow-500">estás organizando?</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-xl hidden sm:block">Seleccioná la opción que mejor lo describe</p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-6 mb-4 sm:mb-8">
          {eventos.map((evento, index) => (
            <Link
              key={evento.nombre}
              href="/personas"
              onClick={() => setEvento(evento.nombre)}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 h-48 sm:h-[380px] ${
                activo === index
                  ? "scale-105 border-2 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.4)]"
                  : "border border-yellow-700/30"
              }`}
            >
              <Image src={evento.imagen} alt={evento.nombre} fill sizes="(max-width: 640px) 20vw, 300px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-2 sm:bottom-8 left-0 right-0 text-center">
                <div className="text-2xl sm:text-5xl mb-1 sm:mb-3">{evento.icono}</div>
                <div className="text-xs sm:text-2xl font-semibold px-1">{evento.nombre}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* BENEFICIOS - solo desktop */}
        <div className="hidden sm:grid md:grid-cols-3 gap-6 mb-6">
          {[
            { emoji: "🛡️", titulo: "Cantidades Precisas", texto: "Calculamos exactamente lo que necesitás para evitar faltantes y excesos." },
            { emoji: "🍸", titulo: "Tragos que Encantan", texto: "Elegí los favoritos de tus invitados entre los más pedidos." },
            { emoji: "✨", titulo: "Experiencia Prestige", texto: "Diseñamos barras elegantes para que tu evento tenga identidad propia." },
          ].map((b) => (
            <div key={b.titulo} className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">
              <div className="text-4xl mb-3">{b.emoji}</div>
              <h3 className="text-xl text-yellow-500 mb-2">{b.titulo}</h3>
              <p className="text-zinc-400 text-sm">{b.texto}</p>
            </div>
          ))}
        </div>

        {/* VOLVER */}
        <div className="flex justify-start">
          <Link href="/" className="border border-zinc-700 px-6 py-3 rounded-2xl text-sm sm:text-xl hover:border-yellow-500 transition">
            ← VOLVER
          </Link>
        </div>

      </div>
    </main>
  );
}