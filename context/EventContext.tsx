"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type EventData = {
  evento: string;
  personas: number;

  mujeres: number;
  hombres: number;

  consumo: string;
  tragos: string[];
};

type EventContextType = {
  data: EventData;

  setEvento: (evento: string) => void;

  setPersonas: (personas: number) => void;

  setMujeres: (mujeres: number) => void;
  setHombres: (hombres: number) => void;

  setConsumo: (consumo: string) => void;

  toggleTrago: (trago: string) => void;
};

const EventContext = createContext<EventContextType | null>(null);

export function EventProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<EventData>({
    evento: "",

    personas: 0,

    mujeres: 0,
    hombres: 0,

    consumo: "",

    tragos: [],
  });

  const setEvento = (evento: string) => {
    setData((prev) => ({
      ...prev,
      evento,
    }));
  };

  const setPersonas = (personas: number) => {
    setData((prev) => ({
      ...prev,
      personas,
    }));
  };

  const setMujeres = (mujeres: number) => {
    setData((prev) => ({
      ...prev,
      mujeres,
    }));
  };

  const setHombres = (hombres: number) => {
    setData((prev) => ({
      ...prev,
      hombres,
    }));
  };

  const setConsumo = (consumo: string) => {
    setData((prev) => ({
      ...prev,
      consumo,
    }));
  };

  const toggleTrago = (trago: string) => {
    setData((prev) => ({
      ...prev,
      tragos: prev.tragos.includes(trago)
        ? prev.tragos.filter((t) => t !== trago)
        : [...prev.tragos, trago],
    }));
  };

  return (
    <EventContext.Provider
      value={{
        data,
        setEvento,
        setPersonas,
        setMujeres,
        setHombres,
        setConsumo,
        toggleTrago,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEvent debe usarse dentro de EventProvider"
    );
  }

  return context;
}