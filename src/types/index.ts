import { ReactNode } from "react";

export type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export interface MenuItem {
  title: string;
  url?: string;
  icon?: ReactNode;
  isSub?: boolean;
  subItem?: MenuItem[]
}