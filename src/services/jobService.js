const BASE_URL = `https://www.themuse.com/api/public/jobs?category=Data%20and%20Analytics&category=Product%20Management&category=Software%20Engineer&location=Melbourne%2C%20Australia&location=Seoul%2C%20South%20Korea&location=Shanghai%2C%20China&location=Singapore&location=Taipei%2C%20Taiwan&location=Tokyo%2C%20Japan&page=2`;

async function index() {
  const url = `${BASE_URL}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export { index };
