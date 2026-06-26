"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { tipo: "hero", imagen: "/images/hero1.png" },
  { tipo: "hero", imagen: "/images/hero2.png" },
  {
    tipo: "trago",
    imagen: "/images/Aperol.png",
    nombre: "Aperol Spritz",
    ingredientes: ["60ml Aperol", "90ml Espumante", "30ml Soda", "Rodaja de naranja"],
    descripcion: "Refrescante y elegante, el favorito del verano.",
  },
  { tipo: "hero", imagen: "/images/hero3.png" },
  {
    tipo: "trago",
    imagen: "/images/Gin.png",
    nombre: "Gin Tonic",
    ingredientes: ["60ml Gin Peregrino", "150ml Agua tónica", "Rodaja de limón"],
    descripcion: "Elegante y versátil, el favorito de las nuevas generaciones.",
  },
  { tipo: "hero", imagen: "/images/hero4.png" },
  {
    tipo: "trago",
    imagen: "/images/mojito.png",
    nombre: "Mojito",
    ingredientes: ["35ml Ron", "30ml Jugo de lima", "15ml Almíbar", "Soda", "Menta fresca"],
    descripcion: "Refrescante, herbal y frutal. Uno de los más pedidos.",
  },
  {
    tipo: "trago",
    imagen: "/images/fernet.png",
    nombre: "Fernet con Coca",
    ingredientes: ["60ml Fernet Branca", "190ml Coca-Cola", "Mucho hielo"],
    descripcion: "El clásico nacional. Infaltable en cualquier barra argentina.",
  },
  {
    tipo: "trago",
    imagen: "/images/vodkaberry.png",
    nombre: "Vodka Berry",
    ingredientes: ["50ml Smirnoff Berry", "100ml Jugo de arándanos", "50ml Soda"],
    descripcion: "Frutal y vibrante, ideal para las noches largas.",
  },
  {
    tipo: "trago",
    imagen: "/images/sexonthebeach.png",
    nombre: "Sex on the Beach",
    ingredientes: ["50ml Vodka", "25ml Licor de durazno", "50ml Jugo de naranja", "50ml Jugo de arándanos"],
    descripcion: "Tropical y colorido, un clásico que nunca falla.",
  },
];

export default function Home() {
  const [actual, setActual] = useState(0);
  const [animando, setAnimando] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAnimando(false);
      setTimeout(() => {
        setActual((prev) => (prev >= SLIDES.length - 1 ? 0 : prev + 1));
        setAnimando(true);
      }, 500);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const slide = SLIDES[actual];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <section className="relative min-h-screen">

        {SLIDES.map((s, i) => (
          <Image
            key={i}
            src={s.imagen}
            alt=""
            fill
            priority={i === 0}
            className={`object-cover transition-all duration-[2000ms] ${
              actual === i ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-10 py-6 sm:py-8">

          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="Prestige" width={70} height={70} className="object-contain sm:w-[120px] sm:h-[120px]" />
              <div>
                <div className="text-yellow-500 tracking-[0.2em] sm:tracking-[0.35em] text-sm sm:text-lg">PRESTIGE</div>
                <div className="text-zinc-300 text-xs tracking-[0.1em] sm:tracking-[0.2em] mt-0.5">BARRA MOVIL PARA EVENTOS</div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-2 border border-yellow-500/30 bg-black/40 backdrop-blur-md rounded-2xl px-6 py-4">
              {["🍸 Barra Prestige", "📋 Cotización Inteligente", "⚡ Resultado en menos de 1 minuto"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">{item}</div>
              ))}
            </div>
          </div>

          {/* Centro */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-tight mb-4 sm:mb-6">
              DISEÑÁ LA BARRA
              <br />
              <span className="text-yellow-500">PERFECTA PARA</span>
              <br />
              TU EVENTO
            </h1>

            <p className="text-zinc-200 text-sm sm:text-xl max-w-xl leading-relaxed mb-6 sm:mb-10 px-2">
              Seleccioná tu evento, elegí los tragos y obtené una estimación inteligente de cantidades para tu celebración.
            </p>

            <Link
              href="/evento"
              className="inline-flex items-center justify-center bg-yellow-500 text-black px-8 sm:px-16 py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-2xl hover:bg-yellow-400 transition shadow-[0_0_40px_rgba(234,179,8,0.4)]"
            >
              COMENZAR
            </Link>
          </div>

          {/* Info trago */}
          <div className={`transition-all duration-500 ${animando ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {slide.tipo === "trago" ? (
              <div className="border-t border-yellow-500/20 pt-6 sm:pt-10">
                <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Trago destacado</p>
                <h2 className="text-lg sm:text-3xl font-semibold mb-1">{slide.nombre}</h2>
                <p className="text-zinc-400 text-xs sm:text-sm mb-2 hidden sm:block">{slide.descripcion}</p>
                <div className="flex flex-wrap gap-1.5">
                  {slide.ingredientes?.map((ing) => (
                    <span key={ing} className="bg-black/50 border border-yellow-500/30 text-yellow-200 text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-yellow-500/20 pt-3">
                <p className="text-zinc-400 text-xs text-center tracking-widest uppercase">Prestige · Barra Móvil para Eventos · Gualeguaychú</p>
              </div>
            )}
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-1.5 mt-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActual(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === actual ? "w-6 bg-yellow-500" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}