import type { Metadata } from "next";
import "./globals.scss";

import Header from "./components/Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
