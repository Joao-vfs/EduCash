import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/providers";
import { getSession } from "@/lib/auth/session";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduCash",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
