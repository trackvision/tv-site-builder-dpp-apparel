export const SHORT_DATE_FORMAT =
  import.meta.env.VITE_SHORT_DATE_FORMAT ?? "YYYY-MM-DD";

export const API_URL =
  import.meta.env.VITE_API_URL ??
  `https://${window.location.hostname.split(".").slice(1).join(".")}`;

export const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;
export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// URL parameter constants
export const URL_PARAMS = {
  PREVIEW: "preview",
  GTIN: "gtin",
  SERIAL: "serial",
  SSCC: "sscc",
  GRAI: "grai",
  SCANID: "scanid",
  // DPP-specific parameters
  DPP: "dpp",
  CLASS: "class",
  LOT: "lot",
  MODE: "mode"
} as const;

// Product detail constants
export const PRODUCT_DEFAULTS = {
  CONDITION: "FRESH",
  STORAGE: "REFRIGERATE",
  SEASON: "JAN - MAR",
  VARIETY: "Premium",
  DESCRIPTION: "Premium quality product offering exceptional freshness and flavor.",
  FALLBACK_PACK_NUMBER: "MXMRZLZB"
} as const;

// Location constants
export const LOCATION_DEFAULTS = {
  REGION: "Regional Producer",
  DESCRIPTION: "This product was sourced from a regional farming area known for its high-quality agricultural production, owing to its rich soils, favorable climate and sustainable farming practices.",
  PLACEHOLDER_IMAGE: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center"
} as const;

// Nutrition facts constants
export const NUTRITION_CONSTANTS = {
  DAILY_VALUE_DISCLAIMER: "* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:",
  CALORIES_PER_GRAM: "Calories per gram: Fat 9 • Carbohydrate 4 • Protein 4",
  REFERENCE_CALORIES: {
    LOW: "2,000",
    HIGH: "2,500"
  },
  DAILY_LIMITS: {
    TOTAL_FAT: { LOW: "65g", HIGH: "80g" },
    SATURATED_FAT: { LOW: "20g", HIGH: "25g" },
    CHOLESTEROL: { LOW: "300mg", HIGH: "300mg" },
    SALT: { LOW: "6g", HIGH: "6g" },
    TOTAL_CARBOHYDRATE: { LOW: "300g", HIGH: "375g" }
  }
} as const;

// Verification constants
export const VERIFICATION_CONSTANTS = {
  VERIFYING_DURATION: 2000, // 2 seconds
  VERIFIED_DURATION: 1000,  // 1 second
  TOTAL_DURATION: 3000,     // 3 seconds total
  MESSAGE: {
    VERIFYING: "VERIFYING...",
    VERIFIED: "PRODUCT VERIFIED",
    COMPLETE: "VERIFIED PRODUCT",
    FAILED: "Product could not be verified"
  }
} as const;

// Language constants
export const LANGUAGE_CONSTANTS = {
  DEFAULT_LANGUAGE: "en-US",
  FALLBACK_LANGUAGE: "en-US",
  STORAGE_KEY: "preferred-language",
  AVAILABLE_LANGUAGES: [
    { code: "en-US", name: "English", abbreviation: "EN" },
    { code: "es-MX", name: "Español", abbreviation: "ES" },
    { code: "fr-FR", name: "Français", abbreviation: "FR" }
  ]
} as const;

// DPP (Digital Product Passport) constants
export const DPP_CONSTANTS = {
  DEFAULT_PREVIEW_FILE: "/apparelDppPreview.json",
  MODE_VALUES: {
    DPP: "dpp",
    FOOD: "food"
  },
  GS1_DIGITAL_LINK: {
    BASE_URL: "https://id.gs1.org",
    CLASS_PREFIX: "/01/",
    LOT_PREFIX: "/10/"
  },
  DURABILITY_SCORE_MAX: 100,
  CIRCULARITY_PERCENT_MAX: 100
} as const;

// DPP Product defaults
export const DPP_DEFAULTS = {
  BRAND: "Brand Not Specified",
  MANUFACTURER: "Manufacturer Not Specified",
  COUNTRY: "Country Not Specified",
  DESCRIPTION: "Digital Product Passport provides transparency about this product's materials, production, and environmental impact.",
  FALLBACK_CLASS_ID: "Unknown Class",
  FALLBACK_LOT_ID: "Unknown Lot"
} as const;

// DPP Environmental thresholds
export const DPP_ENVIRONMENTAL_THRESHOLDS = {
  CARBON_LOW: 5,      // kg CO₂
  CARBON_MEDIUM: 15,  // kg CO₂
  WATER_LOW: 50,      // L
  WATER_MEDIUM: 150,  // L
  ENERGY_LOW: 10,     // kWh
  ENERGY_MEDIUM: 30   // kWh
} as const;

// Logging utility
export const logger = {
  warn: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn(`[ItemTrace]: ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.error(`[ItemTrace]: ${message}`, ...args);
    }
  },
  info: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.info(`[ItemTrace]: ${message}`, ...args);
    }
  }
};

// DPP Logging utility
export const dppLogger = {
  warn: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn(`[DPP]: ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.error(`[DPP]: ${message}`, ...args);
    }
  },
  info: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.info(`[DPP]: ${message}`, ...args);
    }
  }
};
