import { ThemeMode } from "./enums";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const USER_PROFILE_KEY = "Userprofile";

export const HOME_PAGE = "/";
export const SIGNIN_PATH = "/signin";
export const SIGNUP_PATH = "signup";
export const FORGOT_PASSWORD_PATH = "forgot-password";
export const AUTH_PATHS = [SIGNUP_PATH, FORGOT_PASSWORD_PATH];

export const DEFAULT_MODE = ThemeMode.LIGHT;
export const DARK_THEME_MEDIA_SYSTEM = "(prefers-color-scheme: dark)";

export const AN_ERROR_TRY_AGAIN = "error";

export enum STEP {
  LANDING_PAGE,
  HOME,
  TRANSFER,
  COLLECT_INFO
}

export const tabs = [
  { value: STEP.LANDING_PAGE, label: "Landing page" },
  { value: STEP.HOME, label: "Home page" },
  { value: STEP.TRANSFER, label: "Transfer page" },
  { value: STEP.COLLECT_INFO, label: "Collect info page" },
];

export const i18nConfig = {
  // A list of all locales that are supported
  locales: ['vi', 'en'],

  // Used when no locale matches
  defaultLocale: 'vi'
} as const