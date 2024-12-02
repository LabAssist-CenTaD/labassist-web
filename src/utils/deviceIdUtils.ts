// src/utils/deviceIdUtil.ts

// Function to get a cookie value by name
const getCookie = (name: string): string | null => {
  const value = document.cookie;
  const parts = value.split(`${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
};

// Function to set a cookie
const setCookie = (name: string, value: string, days: number): void => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiration in days
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

// Function to get or create a device ID
export const getOrCreateDeviceId = (): string => {
  let deviceId = getCookie("device_id");
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // Generate a new UUID
    setCookie("device_id", deviceId, 365); // Set it to expire in 1 year
  }
  return deviceId;
};