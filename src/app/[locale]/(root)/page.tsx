import Dashboard from "@/component/Dashboard/Dashboard";
import { useTranslations } from "next-intl";

export const revalidate = 1;

const Page = () => {
  const t = useTranslations("common");

  console.log('on server: dashboard');
  
  return (
    <>
      Root {t("title")} <Dashboard />
    </>
  );
};

export default Page;
