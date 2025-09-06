"use client";
import Link from "next/link";
import { useLoader } from "@/context/LoaderContext";

export default function LoaderLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void; // custom onClick
}) {
  const { setLoading } = useLoader();

  const handleClick = () => {
    setLoading(true);
    onClick?.();
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
