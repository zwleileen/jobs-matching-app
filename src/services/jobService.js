const BASE_URL = `https://www.themuse.com/api/public/jobs`;

async function index(category) {
  const url = `${BASE_URL}?category=${category}&location=Singapore&page=2`;
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

async function getValues() {
  const url = "https://api.airtable.com/v0/appw9wRJh8QZRzdTo/inputValues";
  const API_KEY =
    "patBs0UGOdhpF8r4C.8d34f97773a641fb58486d125b0195875081a722649ae023e3851ecf00eb7df2";

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    // console.log(response);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data = await response.json();
    // console.log(data);
    const formattedData = data.records.map((record) => record.fields.value);
    // console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error(error.message);
  }
}

async function create(savedResult, companyDetail) {
  const url = "https://api.airtable.com/v0/appw9wRJh8QZRzdTo/savedResults";
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
              company: savedResult.company,
              companyId: String(savedResult.companyId),
              id: String(savedResult.id),
              content: savedResult.content,
              role: savedResult.role,
              link: savedResult.link,
              companyDescription:
                companyDetail?.description || "No description available",
              industries: companyDetail?.industries
                ? Array.isArray(companyDetail.industries)
                  ? companyDetail.industries.join(", ")
                  : companyDetail.industries
                : "Industry unknown",
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
    console.log("Response from Airtable:", json);
    return json;
  } catch (error) {
    console.error(error.message);
    throw error; // Re-throw the error so we can catch it in handleSave
  }
}

async function companyDetails(companyId) {
  const BASE_URL = "https://www.themuse.com/api/public/companies";
  const url = `${BASE_URL}/${companyId}`;
  //   console.log(url);

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return {
        id: companyId,
        name: "Unknown Company",
        description: "No description available",
        industries: [],
      };
    }

    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const json = await response.json();
    // console.log("companyDetails:", json);
    return json;
  } catch (error) {
    console.error(error.message);
    return {
      id: companyId,
      name: "Unknown Company",
      description: "No description available",
      industries: [],
    };
  }
}

export { index, getValues, create, companyDetails };
