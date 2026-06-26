"use client";

import Link from "next/link";
import { useEvent } from "../../context/EventContext";

export default function ConfirmacionPage() {
  const { data } = useEvent();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">

      <div className="max-w-5xl w-full text-center">

        <div className="mb-8">

          <h1 className="text-7xl text-yellow-500 mb-4">
            ✓
          </h1>

          <h2 className="text-5xl font-bold mb-4">
            ¡Gracias por elegir
            <span className="text-yellow-500"> Prestige</span>!
          </h2>

          <p className="text-gray-400 text-xl">
            Tu propuesta fue enviada correctamente.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="border border-yellow-600 rounded-3xl p-6 bg-zinc-950">

            <h3 className="text-yellow-500 text-xl mb-2">
              Evento
            </h3>

            <p className="text-2xl font-bold">
              {data.evento || "Sin definir"}
            </p>

          </div>

          <div className="border border-yellow-600 rounded-3xl p-6 bg-zinc-950">

            <h3 className="text-yellow-500 text-xl mb-2">
              Invitados
            </h3>

            <p className="text-2xl font-bold">
              {data.personas || 0}
            </p>

          </div>

          <div className="border border-yellow-600 rounded-3xl p-6 bg-zinc-950">

            <h3 className="text-yellow-500 text-xl mb-2">
              Consumo
            </h3>

            <p className="text-2xl font-bold">
              {data.consumo || "Sin definir"}
            </p>

          </div>

          <div className="border border-yellow-600 rounded-3xl p-6 bg-zinc-950">

            <h3 className="text-yellow-500 text-xl mb-2">
              Tragos
            </h3>

            <p className="text-2xl font-bold">
              {data.tragos.length}
            </p>

          </div>

        </div>

        <div className="border border-yellow-600 rounded-3xl p-8 bg-zinc-950 mb-10">

          <h3 className="text-3xl font-bold mb-4">
            Selección realizada
          </h3>

          <p className="text-yellow-500 text-xl">

            {data.tragos.length === 0
              ? "No se seleccionaron tragos"
              : data.tragos.join(" • ")}

          </p>

        </div>

        <div className="border border-yellow-600 rounded-3xl p-8 bg-zinc-950 mb-10">

          <h3 className="text-3xl font-bold mb-4">
            Un asesor se comunicará con vos
          </h3>

          <p className="text-gray-400 text-lg">
            Revisaremos tu selección y prepararemos una propuesta personalizada.
          </p>

        </div>

        <div className="flex justify-center">

          <Link
            href="/"
            className="bg-yellow-500 text-black px-10 py-4 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            NUEVA COTIZACIÓN
          </Link>

        </div>

      </div>

    </main>
  );
}