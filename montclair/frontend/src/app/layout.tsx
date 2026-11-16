import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { LanguageProvider } from "./LanguageContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Montclair — Hotel de Lujo",
  description: "Un santuario de lujo refinado en la Costa Azul. Est. MCMXXIII.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${geist.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
