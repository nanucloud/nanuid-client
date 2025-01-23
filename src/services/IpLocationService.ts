export const getLocationByIP = async (ip: string): Promise<string> => {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    if (data.status === "success") {
      return `${data.city}, ${data.regionName}, ${data.country}`;
    } else {
      return "Unknown";
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return "Unknown";
  }
};
