const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';

(async () => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data, "data");
  } catch (error) {
    console.error("Error fetching testimonials:", error.message);
  }
})();
