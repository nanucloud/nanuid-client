export const getLocationByIP = async (ip: string): Promise<string> => {
  try {
    const response = await fetch(`https://ipwhois.app/json/${ip}`);
    const data = await response.json();
    if (data.success) {
      const country = data.country || "Unknown Country";
      const city = data.city || "Unknown City";
      const region = data.region || "";

      return region ? `${country}, ${city}, ${region}` : `${country}, ${city}`;
    } else {
      return "Unknown";
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return "Unknown";
  }
};
