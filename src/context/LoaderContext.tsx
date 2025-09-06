"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Loading from "@/components/loading"; // reuse your fancy loader

type LoaderContextType = {
  isLoading: boolean;
  setLoading: (val: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}

      {/* Global Loader Overlay */}
      {isLoading && <Loading fullScreen text="Loading..." />}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("useLoader must be used inside LoaderProvider");
  return ctx;
};
