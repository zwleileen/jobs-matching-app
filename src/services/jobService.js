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
    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error(error.message);
  }
}

async function create(savedResult) {
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

// async function create(companyData) {
//   //   console.log("data received:", companyData);
//   const url = "https://api.airtable.com/v0/appw9wRJh8QZRzdTo/companyId";
//   const API_KEY =
//     "patBs0UGOdhpF8r4C.8d34f97773a641fb58486d125b0195875081a722649ae023e3851ecf00eb7df2";

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         records: [
//           {
//             fields: {
//               company: companyData.company,
//               companyId: String(companyData.companyId),
//             },
//           },
//         ],
//       }),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.log("airtable error:", errorData);
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.json();

//     // console.log("Created record ID:", json.records[0].id);
//     const newRecordedId = json.records[0].id;
//     recordIds.push(newRecordedId);
//     return json;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// let recordIds = []; //initiate an array to store recordIds

// async function deleteAll() {
//   const API_KEY =
//     "patBs0UGOdhpF8r4C.8d34f97773a641fb58486d125b0195875081a722649ae023e3851ecf00eb7df2";

//   for (const recordId of recordIds) {
//     const url = `https://api.airtable.com/v0/appw9wRJh8QZRzdTo/companyId/${recordId}`;
//     try {
//       await fetch(url, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${API_KEY}` },
//       });
//     } catch (error) {
//       console.error(`Error deleting record ${recordId}:`, error);
//     }
//   }
//   recordIds = []; //Clear the array after deletion
// }

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
