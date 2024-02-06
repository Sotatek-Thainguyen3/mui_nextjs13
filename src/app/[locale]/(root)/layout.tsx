import MainLayout from "@/layouts/MainLayout";
import AuthWrapper from "@/layouts/AuthWrapper";
import { _toggleAppReady, _updateAuth } from "@/state/app/reducer";

import { Metadata } from "next/types";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "M&N | root",
  };
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthWrapper>
      <MainLayout>{children}</MainLayout>
    </AuthWrapper>
  );
};

export default Layout;
