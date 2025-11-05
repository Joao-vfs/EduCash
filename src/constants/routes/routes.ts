export const APP_NAME = "Edu Cash";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_STEP: "/register?step=",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
} as const;
