"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvent } from "../../context/EventContext";

const tragos = [
  {
    nombre: "Aperol Spritz",
    imagen: "/images/Aperol.png",
  },
  {
    nombre: "Merle Gin & Tonic",
    imagen: "/images/Gin.png",
  },
  {
    nombre: "Mojito",
    imagen: "/images/mojito.png",
  },
  {
    nombre: "Fernet con Coca",
    imagen: "/images/fernet.png",
  },
  {
    nombre: "Sex on the Beach",
    imagen: "/images/sexonthebeach.png",
  },
  {
    nombre: "Vodka Berry Smash",
    imagen: "/images/vodkaberry.png",
  },
];

export default function TragosPage() {
  const { data, toggleTrago } = useEvent();

  const getEventoImage = () => {
    switch (data.evento) {
      case "Casamiento":
        return "/images/casamiento.png";

      case "Cumpleaños":
        return "/images/cumpleaños.png";

      case "15 Años":
        return "/images/15años.png";

      case "Corporativo":
        return "/images/corporativo.png";

      default:
        return "/images/otroevento.png";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-[1700px] mx-auto px-8 py-8">

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

        <div className="mb-16">

          <div className="flex justify-center">

            <div className="w-full max-w-5xl">

              <div className="relative flex justify-between items-center">

                <div className="absolute top-7 left-0 right-0 h-px bg-zinc-700" />

                {[1, 2, 3, 4, 5].map((numero) => (

                  <div
                    key={numero}
                    className="relative z-10 flex flex-col items-center"
                  >

                    <div
                      className={`
                        w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-xl

                        ${
                          numero <= 3
                            ? "bg-green-500 border-green-500 text-black"
                            : numero === 4
                            ? "bg-yellow-500 border-yellow-500 text-black"
                            : "bg-black border-zinc-600 text-zinc-400"
                        }
                      `}
                    >
                      {numero <= 3 ? "✓" : numero}
                    </div>

                    <div
                      className={`
                        mt-3 text-center text-sm uppercase

                        ${
                          numero === 4
                            ? "text-yellow-500"
                            : "text-zinc-400"
                        }
                      `}
                    >
                      {
                        [
                          "Evento",
                          "Personas",
                          "Consumo",
                          "Tragos",
                          "Cantidades",
                        ][numero - 1]
                      }
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-8">

          {/* SIDEBAR */}

          <div className="space-y-6">

            <div className="relative h-[320px] rounded-3xl overflow-hidden border border-yellow-700/30">

              <Image
                src={getEventoImage()}
                alt={data.evento}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6">

                <div className="text-yellow-500 text-sm uppercase mb-2">
                  Evento
                </div>

                <div className="text-3xl font-semibold">
                  {data.evento}
                </div>

              </div>

            </div>

            <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">

              <h3 className="text-2xl text-yellow-500 mb-6">
                Resumen
              </h3>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Invitados
                  </span>

                  <span className="font-semibold">
                    {data.personas}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Consumo
                  </span>

                  <span className="font-semibold">
                    {data.consumo}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Tragos elegidos
                  </span>

                  <span className="font-semibold text-yellow-500">
                    {data.tragos.length}
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-zinc-950 border border-yellow-700/30 rounded-3xl p-6">

              <h3 className="text-2xl text-yellow-500 mb-5">
                Tu Selección
              </h3>

              {data.tragos.length === 0 ? (

                <p className="text-zinc-500">
                  Aún no seleccionaste tragos.
                </p>

              ) : (

                <div className="space-y-3">

                  {data.tragos.map((trago) => (

                    <div
                      key={trago}
                      className="flex items-center gap-3"
                    >
                      <span className="text-yellow-500">
                        ✓
                      </span>

                      <span>
                        {trago}
                      </span>
                    </div>

                  ))}

                </div>

              )}

            </div>

            <div className="bg-zinc-950 border border-yellow-500/20 rounded-3xl p-6">

              <div className="text-4xl mb-4">
                💡
              </div>

              <h3 className="text-yellow-500 text-xl mb-3">
                Tip Prestige
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                Para lograr una barra equilibrada,
                recomendamos seleccionar entre
                4 y 6 tragos diferentes.
              </p>

            </div>

          </div>

          {/* TRAGOS */}

          <div>

            <div className="mb-10">

              <h2 className="text-6xl font-light mb-4">
                Elegí tus
                <span className="text-yellow-500">
                  {" "}tragos
                </span>
              </h2>

              <p className="text-zinc-400 text-xl">
                Seleccioná los tragos que más te representan.
              </p>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {tragos.map((trago) => {

                const activo =
                  data.tragos.includes(
                    trago.nombre
                  );

                return (

                  <div
                    key={trago.nombre}
                    onClick={() =>
                      toggleTrago(trago.nombre)
                    }
                    className={`
                      relative
                      cursor-pointer
                      rounded-3xl
                      overflow-hidden
                      transition-all
                      duration-300

                      ${
                        activo
                          ? "border-4 border-yellow-500 scale-105 shadow-[0_0_40px_rgba(234,179,8,0.35)]"
                          : "border border-yellow-700/30"
                      }
                    `}
                  >

                    <div className="relative h-[520px]">

                      <Image
                        src={trago.imagen}
                        alt={trago.nombre}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      {activo && (

                        <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xl">
                          ✓
                        </div>

                      )}

                      <div className="absolute bottom-0 left-0 p-8">

                        <h3 className="text-3xl font-semibold mb-4">
                          {trago.nombre}
                        </h3>

                        <div className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold inline-block">

                          {activo
                            ? "SELECCIONADO"
                            : "+ AGREGAR"}

                        </div>

                      </div>

                    </div>

                  </div>

                );
              })}

            </div>

            <div className="mt-12 border-t border-zinc-800 pt-8 flex justify-between items-center">

              <Link
                href="/consumo"
                className="
                  border
                  border-zinc-700
                  px-10
                  py-4
                  rounded-2xl
                  text-xl
                  hover:border-yellow-500
                  transition
                "
              >
                ← VOLVER
              </Link>

              <Link
                href="/cantidades"
                className="
                  bg-yellow-500
                  text-black
                  px-14
                  py-5
                  rounded-2xl
                  text-2xl
                  font-bold
                  hover:bg-yellow-400
                  transition
                "
              >
                CONTINUAR →
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}