// ================= BASE PREFIX =================
export enum EApiPrefix {
  API = "/api",
}

// ================= AUTH =================
export enum EAuthApi {
  BASE = `${EApiPrefix.API}/auth`,
  LOGIN = `${EApiPrefix.API}/auth/login`,
  REFRESH = `${EApiPrefix.API}/auth/refresh`,
  ME = `${EApiPrefix.API}/auth/me`,
  LOGOUT = `${EApiPrefix.API}/auth/logout`,
}

// ================= USERS =================
export enum EUserApi {
  BASE = `${EApiPrefix.API}/users`,
}

// ================= CATEGORIES =================
export enum ECategoryApi {
  BASE = `${EApiPrefix.API}/categories`,
}

// ================= PRODUCTS =================
export enum EProductApi {
  BASE = `${EApiPrefix.API}/products`,
  IMAGES = `${EApiPrefix.API}/products/images`,
}

// ================= PAGES =================
export enum EPageApi {
  BASE = `${EApiPrefix.API}/pages`,
  BY_SLUG = `${EApiPrefix.API}/pages/slug`,
}

// ================= DOCUMENTS =================
export enum EDocumentApi {
  BASE = `${EApiPrefix.API}/documents`,
  DOWNLOAD = `${EApiPrefix.API}/documents/download`,
  PREVIEW = `${EApiPrefix.API}/documents/preview`,
}

// ================= SETTINGS =================
export enum ESettingApi {
  BASE = `${EApiPrefix.API}/settings`,
  BY_KEY = `${EApiPrefix.API}/settings/key`,
}

// ================= DASHBOARD =================
export enum EDashboardApi {
  BASE = `${EApiPrefix.API}/dashboard`,
  STATS = `${EApiPrefix.API}/dashboard/stats`,
  GROWTH = `${EApiPrefix.API}/dashboard/growth`,
  CATEGORY_SPLIT = `${EApiPrefix.API}/dashboard/category-split`,
  LATEST_PRODUCTS = `${EApiPrefix.API}/dashboard/latest-products`,
  CONTENT_STATUS = `${EApiPrefix.API}/dashboard/content-status`,
}
