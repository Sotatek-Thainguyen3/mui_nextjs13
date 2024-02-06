import { Home } from "@/component/home";
import { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "M&N | Home",
  };
}

const Page = () => {
  return <Home />;
};

export default Page;
