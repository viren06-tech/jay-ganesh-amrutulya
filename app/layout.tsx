import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "जय गणेश अमृततुल्य | Authentic Chai in Pimpri-Chinchwad",
  description:
    "जय गणेश अमृततुल्य — authentic chai, special Basundi Chai and delicious tea-time treats near Kalewadi Fata, Pimpri-Chinchwad.",
  keywords: [
    "Jai Ganesh Amrutulya",
    "Amrutulya Tea",
    "Basundi Chai",
    "Tea Shop Pimpri Chinchwad",
    "Tea near Kalewadi Fata",
    "Chai Pimpri Chinchwad",
  ],
  openGraph: {
    title: "जय गणेश अमृततुल्य",
    description:
      "एक कप चहा... पिऊन तर पहा..! Special Basundi Chai in Pimpri-Chinchwad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}