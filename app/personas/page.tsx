"use client";

import Link from "next/link";
import { useState } from "react";
import { useEvent } from "../../context/EventContext";

export default function PersonasPage() {
  const { setPersonas, setMujeres, setHombres } = useEvent();
  const [cantidad, setCantidad] = useState(50);

  const handleContinuar = () => {
    setPersonas(cantidad);
    setMujeres(Math.round(cantidad / 2));
    setHombres(Math.round(cantidad / 2));
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl text-yellow-500 mb-2">PLANIFICÁ TU BARRA IDEAL</h1>
          <p className="text-zinc-300 text-xl">En simples pasos calculamos las cantidades perfectas para tu evento</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center items-center gap-12 mb-16">
          {["Tipo de Evento", "Cantidad de Personas", "Consumo", "Tragos", "Cantidades"].map((paso, index) => (
            <div key={paso} className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border ${
                index < 1 ? "bg-green-500 text-black border-green-500" :
                index === 1 ? "bg-yellow-500 text-black border-yellow-500" :
                "border-zinc-700 text-zinc-500"
              }`}>
                {index < 1 ? "✓" : index + 1}
              </div>
              <div className="mt-3 text-center text-sm text-zinc-400 uppercase">{paso}</div>
            </div>
          ))}
        </div>

        {/* Contenido */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-light mb-4">
            ¿Cuántos <span className="text-yellow-500">invitados</span> asistirán?
          </h2>
          <p className="text-zinc-400 text-xl mb-16">Una estimación está perfecta.</p>

          <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-12 max-w-2xl mx-auto">
            <div className="text-8xl font-bold text-yellow-500 mb-8">{cantidad}</div>
            <input
              type="range" min={10} max={500} step={5}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-full accent-yellow-500 mb-4"
            />
            <div className="flex justify-between text-zinc-500 text-sm">
              <span>10 personas</span>
              <span>500 personas</span>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div className="flex justify-between items-center">
          <Link href="/evento" className="border border-zinc-700 px-10 py-4 rounded-2xl text-xl hover:border-yellow-500 transition">
            ← VOLVER
          </Link>
          <Link href="/consumo" onClick={handleContinuar}
            className="bg-yellow-500 text-black px-14 py-5 rounded-2xl text-2xl font-bold hover:bg-yellow-400 transition">
            CONTINUAR →
          </Link>
        </div>

      </div>
    </main>
  );
}
