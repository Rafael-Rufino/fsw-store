import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { AuthProvider } from "@/providers/auth";
import CartProvider from "@/providers/cart";
import ToastProvider from "@/providers/toast";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commercee - FSW - Store",
  description: "E-commerce de produtos de tecnologia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <ToastProvider>
              <CartProvider>
                <Header />
                <div className="flex-1">{children}</div>
                <Footer />
              </CartProvider>
            </ToastProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
