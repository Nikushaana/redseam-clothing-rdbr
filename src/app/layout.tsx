import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "./components/header";
import Cart from "./components/modals/cart";
import Success from "./components/modals/success";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RedSeam Clothing",
  description: "RDBR Bootcamp project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <div>
          <Header />
          {children}
          <Success />
          <ToastContainer />
          <Cart />
        </div>
      </body>
    </html>
  );
}
