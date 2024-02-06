import "../../../public/styles/globals.css";
import "../../../public/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProvider from "@/layouts/AppProvider";
import { i18nConfig } from "@/constants";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });
const locales = i18nConfig.locales;

export const metadata: Metadata = {
  title: "M&N",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  console.log("locale", locale);

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body suppressHydrationWarning={true}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
