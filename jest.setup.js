// Mock import.meta for Vite compatibility
global.import = global.import || {};
global.import.meta = global.import.meta || {};
global.import.meta.env = global.import.meta.env || {};
global.import.meta.env.VITE_API_URL = process.env.VITE_API_URL || "http://localhost:8080";
