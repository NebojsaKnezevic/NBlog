
import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { NextFont } from "next/dist/compiled/@next/font";
import { Poppins } from "next/font/google"
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// const myFont: NextFont = localFont({src:'../fonts/Poppins-bold.ttf'});
const myFont: NextFont = localFont({
  src: [
    {
      path: '../fonts/Poppins-Bold.ttf',
      weight: '600',
      style: 'bold'
    },
    {
      path: '../fonts/Poppins-Light.ttf',
      weight: '200',
      style: 'light'
    }
  ]
});

const poppins2: NextFont = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600"]
})

export const poppins: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface IRootProps {
  children: React.ReactNode
}

export default function RootLayout(props: IRootProps) {
  const { children } = props

  return (
    <html lang="en">
      <body className={poppins2.className}>
        <header>
          <Navigation/>
        </header>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
