"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoader } from "@/context/LoaderContext";

export default function RouteChangeLoader() {
  const { setLoading } = useLoader();
  const pathname = usePathname();

  useEffect(() => {
    // whenever route changes → stop loader
    setLoading(false);
  }, [pathname, setLoading]);

  return null;
}
