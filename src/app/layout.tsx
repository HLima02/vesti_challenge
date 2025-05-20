import type { Metadata } from "next";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer } from 'react-toastify';
import "./globals.scss";

import ProductProvider from "@/contexts/ProductContext";
import Header from "./components/Header";
import Cart from "./components/Cart";

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
        <ProductProvider>
          <Header />
          <Cart />
          {children}
          <ToastContainer />
        </ProductProvider>
      </body>
    </html>
  );
}
