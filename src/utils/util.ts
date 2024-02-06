import { ThemeMode } from "@/constants/enums";
import { clientStorage } from "./storage";
import { DARK_THEME_MEDIA_SYSTEM } from "@/constants";

export const DATE_FORMAT_SLASH = "yyyy-MM-dd";

export const formatDate = (
  date: number | Date,
  format: string,
  fallback?: string
) => {
  if (!date) return fallback ?? "";
  if (!format) format = DATE_FORMAT_SLASH;
  const newDate = typeof date === "number" ? new Date(date) : date;

  const year = newDate.getFullYear();

  if (year === 1 || year === 1970) return fallback ?? "";
  const day = `0${newDate.getDate()}`.slice(-2);
  const month = `0${newDate.getMonth() + 1}`.slice(-2);
  const hours = `0${newDate.getHours()}`.slice(-2);
  const minutes = `0${newDate.getMinutes()}`.slice(-2);
  const seconds = `0${newDate.getSeconds()}`.slice(-2);
  const milliseconds = `${newDate.getMilliseconds()}`.slice(-2);
  let dateFormat = format.replace("yyyy", year.toString());
  dateFormat = dateFormat.replace("MM", month);
  dateFormat = dateFormat.replace("dd", day);
  dateFormat = dateFormat.replace("HH", hours);
  dateFormat = dateFormat.replace("mm", minutes);
  dateFormat = dateFormat.replace("ss", seconds);
  dateFormat = dateFormat.replace("ms", milliseconds);
  return dateFormat;
};

export const sleep = async (ms: number): Promise<void> => {
  console.log("Kindly remember to remove `sleep`");
  return new Promise((resolve, result) => setTimeout(resolve, ms));
};

export const getTheme = (key: string, fallback: ThemeMode): ThemeMode => {
  if (typeof window === "undefined") return fallback;
  try {
    const theme = (clientStorage.get(key) as ThemeMode) || getThemeSystem();
    return theme || fallback;
  } catch (error) {
    // Unsupported
    console.error(error);
  }
  return fallback;
};

export const getThemeSystem = (e?: MediaQueryList): ThemeMode => {
  if (!e) {
    e = window.matchMedia(DARK_THEME_MEDIA_SYSTEM);
  }

  const isDark = e.matches;

  const themeSystem = isDark ? ThemeMode.DARK : ThemeMode.LIGHT;
  return themeSystem;
};
