"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvent } from "../../context/EventContext";

const tragos = [
  { nombre: "Aperol Spritz", imagen: "/images/Aperol.png" },
  { nombre: "Merle Gin & Tonic", imagen: "/images/Gin.png" },
  { nombre: "Mojito", imagen: "/images/mojito.png" },
  { nombre: "Fernet con Coca", imagen: "/images/fernet.png" },
  { nombre: "Sex on the Beach", imagen: "/images/sexonthebeach.png" },
  { nombre: "Vodka Berry Smash", imagen: "/images/vodkaberry.png" },
];

export default function TragosPage() {
  const { data, toggleTrago } = useEvent();

  const getEventoImage = () => {
    switch (data.evento) {
      case "Casamiento": return "/images/casamiento.png";
      case "Cumpleaños": return "/images/cumpleaños.png";
      case "15 Años": return "/images/15años.png";
      case "Corporativo": return "/images/corporativo.png";
      default: return "/images/otroevento.png";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 py-4 sm:py-8">

        {/* HEADER */}
        <div className="text-center mb-4 sm:mb-10">
          <h1 className="text-xl sm:text-5xl text-yellow-500 mb-1 sm:mb-2">PLANIFICÁ TU BARRA IDEAL</h1>
          <p className="text-zinc-300 text-xs sm:text-xl hidden sm:block">En simples pasos calculamos las cantidades perfectas para tu evento</p>
        </div>

        {/* PASOS */}
        <div className="flex justify-center items-center gap-3 sm:gap-8 mb-4 sm:mb-16">
          {["Evento", "Personas", "Consumo", "Tragos", "Cantidades"].map((paso, index) => (
            <div key={paso} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center font-bold text-sm sm:text-xl ${
                index <= 2 ? "bg-green-500 border-green-500 text-black" :
                index === 3 ? "bg-yellow-500 border-yellow-500 text-black" :
                "bg-black border-zinc-600 text-zinc-400"
              }`}>
                {index <= 2 ? "✓" : index + 1}
              </div>
              <div className={`mt-1 sm:mt-3 text-center text-xs uppercase hidden sm:block ${index === 3 ? "text-yellow-500" : "text-zinc-400"}`}>
                {paso}
              </div>
            </div>
          ))}
        </div>

        {/* RESUMEN COMPACTO - solo celular */}
        {data.tragos.length > 0 && (
          <div className="sm:hidden flex flex-wrap gap-2 mb-3">
            {data.tragos.map((t) => (
              <span key={t} className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs px-2 py-1 rounded-full">
                ✓ {t}
              </span>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-[420px_1fr] gap-8">

          {/* SIDEBAR - solo desktop */}
          <div className="hidden lg:flex flex-col space-y-6">
            <div className="relative h-[320px] rounded-3xl overflow-hidden border border-yellow-700/30">
              <Image src={getEventoImage()} alt={data.evento} fill sizes="420px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="text-yellow-500 text-sm uppercase mb-2">Evento</div>
                <div className="text-3xl font-semibold">{data.evento}</div>
              </div>
            </div>

            <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">
              <h3 className="text-2xl text-yellow-500 mb-6">Resumen</h3>
              <div className="space-y-5">
                {[["Invitados", data.personas], ["Consumo", data.consumo], ["Tragos elegidos", data.tragos.length]].map(([l, v]) => (
                  <div key={l as string} className="flex justify-between">
                    <span className="text-zinc-400">{l}</span>
                    <span className="font-semibold text-yellow-500">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">
              <h3 className="text-2xl text-yellow-500 mb-5">Tu Selección</h3>
              {data.tragos.length === 0 ? (
                <p className="text-zinc-500">Aún no seleccionaste tragos.</p>
              ) : (
                <div className="space-y-3">
                  {data.tragos.map((trago) => (
                    <div key={trago} className="flex items-center gap-3">
                      <span className="text-yellow-500">✓</span>
                      <span>{trago}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-zinc-950 border border-yellow-500/20 rounded-3xl p-6">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-yellow-500 text-xl mb-3">Tip Prestige</h3>
              <p className="text-zinc-400 leading-relaxed">Para lograr una barra equilibrada, recomendamos seleccionar entre 4 y 6 tragos diferentes.</p>
            </div>
          </div>

          {/* TRAGOS */}
          <div>
            <div className="mb-4 sm:mb-10">
              <h2 className="text-2xl sm:text-6xl font-light mb-2 sm:mb-4">
                Elegí tus <span className="text-yellow-500">tragos</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-xl">Seleccioná los tragos que más te representan.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-8">
              {tragos.map((trago) => {
                const activo = data.tragos.includes(trago.nombre);
                return (
                  <div
                    key={trago.nombre}
                    onClick={() => toggleTrago(trago.nombre)}
                    className={`relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
                      activo
                        ? "border-4 border-yellow-500 scale-105 shadow-[0_0_40px_rgba(234,179,8,0.35)]"
                        : "border border-yellow-700/30"
                    }`}
                  >
                    <div className="relative h-40 sm:h-[520px]">
                      <Image src={trago.imagen} alt={trago.nombre} fill sizes="(max-width: 640px) 50vw, 400px" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      {activo && (
                        <div className="absolute top-2 right-2 sm:top-5 sm:right-5 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm sm:text-xl">✓</div>
                      )}
                      <div className="absolute bottom-0 left-0 p-3 sm:p-8">
                        <h3 className="text-sm sm:text-3xl font-semibold mb-1 sm:mb-4">{trago.nombre}</h3>
                        <div className="bg-yellow-500 text-black px-2 py-1 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-base inline-block">
                          {activo ? "SELECCIONADO" : "+ AGREGAR"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 sm:mt-12 border-t border-zinc-800 pt-4 sm:pt-8 flex justify-between items-center">
              <Link href="/consumo" className="border border-zinc-700 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-sm sm:text-xl hover:border-yellow-500 transition">
                ← VOLVER
              </Link>
              <Link href="/cantidades" className="bg-yellow-500 text-black px-8 sm:px-14 py-3 sm:py-5 rounded-2xl text-lg sm:text-2xl font-bold hover:bg-yellow-400 transition">
                CONTINUAR →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}