import Wrapper from "@/component/auth/Wrapper";
import Login from "@/component/auth/login";
import { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Signin",
  };
}

export default function Page({}) {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
}
