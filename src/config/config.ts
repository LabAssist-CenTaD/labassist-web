export const config: {
  connection_address: string;
  max_cache_size: number;
  debug_level: 0 | 1 | 2; // 0 = off
  debug_warnings: boolean;
  debug_errors: boolean;
} = {
  // connection_address: "http://localhost:5000",
  connection_address: import.meta.env.VITE_API_ENDPOINT,
  max_cache_size: 5, // Default cache size set to 5
  debug_level: 1, // Default debug level set to 1
  debug_warnings: true,
  debug_errors: true,
};
