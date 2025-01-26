const BASE_URL = `https://www.themuse.com/api/public/jobs`;

async function index(category) {
  const url = `${BASE_URL}?category=${category}&page=2`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
    return { results: [] };
  }
}

async function create(companyData) {
  console.log("data received:", companyData);
  const url = "https://api.airtable.com/v0/appw9wRJh8QZRzdTo/companyId";
  const API_KEY =
    "patBs0UGOdhpF8r4C.8d34f97773a641fb58486d125b0195875081a722649ae023e3851ecf00eb7df2";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              company: companyData.company,
              companyId: String(companyData.companyId),
            },
          },
        ],
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log("airtable error:", errorData);
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export { index, create };
