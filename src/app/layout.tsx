import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vesti Challenge",
  description: "Teste tecnico para vaga de desenvolvedor Front-End ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
