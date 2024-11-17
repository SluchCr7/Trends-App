import { Inter } from "next/font/google";
import "./globals.css";
import Homecontent from "./components/Homecontent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trends",
  description: "Share your thoughts and opinions in Trends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Homecontent children={children}/>
      </body>
    </html>
  );
}
