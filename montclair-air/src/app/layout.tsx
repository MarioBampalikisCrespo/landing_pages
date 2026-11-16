import type { Metadata } from "next";
import { Syne, Sora } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucen Airways — by Montclair",
  description:
    "Aviación privada de Montclair. Una flota reducida, rutas curadas y el cielo servido con la misma discreción que Lumière. Est. MMXVIII.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${syne.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
