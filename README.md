# Project: Jobs Matching App
This project is about developing a simple React App. I have chosen to develop an app on jobs matching using API from The Muse. You can try it [here](https://jobsmatching.netlify.app/).

To develop this app, I used JavaScript for the codes, Airtable to fetch and save data, as well as Bruno to test and store my APIs and URLs. 

# Description 
This app allows user to search jobs in Singapore based on a primary criterion i.e. job category. The user can then filter the jobs further based on values e.g. joy, creativity, inclusive. 

![Landing page](https://i.imgur.com/5MSh23c.png)

# User story (includes wireframe)
The user stories for an MVP version of the jobs matching app, as well as wireframes can be found on this public [trello board](https://trello.com/b/XKLA7OIr/project-2-react-app-jobs-matching).

Several minor changes have been made to the initial wireframes while developing the app:
1. Changed the search inputs to job category and company values
2. Changed the job details to show company, role and industry

# Pseudocode
These are the variables for the initial state:
```javascript
  const [savedResults, setSavedResults] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [count, setCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    values: "",
    category: ""
    });
  const [jobsData, setJobsData] = useState([]);
  const [valuesList, setValuesList] = useState([]);  
  const [category, setCategory] = useState("Software%20Engineering");
  const [loading, setLoading] = useState(false);
```
There are 5 components:
1. HomePage: displays search inputs and search results
2. SearchInputs: allows user to choose from a dropdown list of variables to search
3. JobCategory: a list of job categories to choose from
4. SearchResults: takes the chosen search variables and displays corresponding results
5. SavedResults: displays results that are saved by the user

# Key learnings
## Keeping states at global level versus component level
There are several states that I had to keep at global level in my App.jsx because they are required to persist when user navigates away/back to HomePage i.e. the search inputs and search results. If I move any of these states to the component level, the states will reset whenever the user navigates away and back. 

## Checking for certain words in content
For this app, I experimented with filtering jobs based on certain words in the job content, in addition to the job category. To find words that match, I have used the following codes:
```javascript
      useEffect(() => {
      if (searchInputs.values || searchInputs.category) {
        const searches = jobsData.filter(job => {

          const encodedCategory = encodeURIComponent(job.category); 
          const categoryMatches = encodedCategory === searchInputs.category;

          if (!searchInputs.values || searchInputs.values === "Company Value") {
            return categoryMatches;
          }

          const cleanContent = job.content.replace(/<[^>]*>|<br\/>|\n/g, ' '); 
          const values = searchInputs.values.toLowerCase().split(','); 

          return values.some(value => {
            const regex = new RegExp(`\\b${value.trim()}\\b`, 'i'); 
            return regex.test(cleanContent);
          }) && categoryMatches;
        });
        setSearchResults(searches);
        setCount(searches.length);
      }
      }, [setCount, jobsData, searchInputs, setSearchResults]);
```
- I had to convert job category to URL-safe format in order to fetch the job with the API and this is done using encodeURIComponent()
- To find words in job content, I first had to clean up the job content by replacing line breaks, HTML tags etc. with empty spacing, then I had to clean up the words by creating a regex that places boundary (\b) on the whole word and trim away any spacing
- Without the boundary, the results could return any character match e.g. "val", instead of whole word match e.g. "value"

## Using Promise when fetching data
To ensure the page shows all the filtered results together, instead of loading one at a time, I used Promise in the following codes:
```javascript
    useEffect(() => {
      const fetchCompanyDetails = async () => {
        if (searchResults.length > 0) {
          const details = await Promise.all( 
            searchResults.map(async company => {
              const detail = await jobService.companyDetails(company.companyId);
              return {
                id: detail.id,
                company: detail.name,
                description: detail.description || 'No description available',
                industries: detail.industries?.length ? detail.industries.map(industry => industry.name) : 'Industry unknown'
              };
            })
          );
          setCompanyDetails(details);
        }
      };
      fetchCompanyDetails();
    }, [searchResults, setCompanyDetails]);
```
- useEffect here loads the page whenever there is a change in searchResults, and it consists of an async function that only runs if there is searchResult
- The use of Promise.all allows all API calls to happen concurrently rather than sequentially, making the data fetching much faster when there are multiple companies to look up
- Without Promise, the fitered results show up in bits and pieces which is not conducive for user experience
- To get the companyDetails, it maps the searchResults based on companyId and fetches additional data and stores them in companyDetails

## Merging data from different URLs
Each job displays the following results: company's name, job role and company's industry. As the company's industry is fetched using a different URL from company's name and job role, I had to merge the data fetched from different URLs using .find as shown in my codes below:

```javascript
    {!props.searchResults.length ? (
        <p>No result to show, try modifying your search</p> 
        ) : props.loading ? (
        <p>Loading...</p>
        ) : (
        <div>
        <p>Showing {props.count} results</p>
        <ul>
        {props.searchResults.map((result) => {
        
            const matchingDetail = props.companyDetails.find(detail => detail.id === result.companyId);
            return(
            <li key={result.id} onClick={(event) => handleClick(result.link, event)} style={{ cursor: 'pointer' }}>
                <button className="save-btn" onClick={() => handleSave(result)}>
                <i className="material-icons">favorite</i>
                </button>
                <h3>{result.company}</h3>
                <p>Role: {result.role}</p>  
                {matchingDetail ? (
                    <>
                    <p>Industry: {Array.isArray(matchingDetail.industries) ? matchingDetail.industries.join(', ') : 'Not sure, click to read on'}</p> 
                    </>
                ) : (
                    <>
                    <p>Industry: Not sure, click to read on</p>
                    </>
                )}
            </li>
        )})} 
        </ul>
        </div>
        )}    
```

## Saving data in Airtable
The jobs that the user saves are stored in both the savedResults state and Airtable. To do so, I wrote codes to create the data that user wants to save in Airtable, then store this data in the savedResults state as shown:
```javascript
  const handleSave = async (result) => {
        try {
            const matchingDetail = props.companyDetails.find(
                detail => detail.id === result.companyId
            );

            const response = await props.jobService.create(result, matchingDetail);     

            if (response && response.records && response.records[0]) {
                props.setSavedResults(prevResults => [...prevResults, response.records[0].fields]);
                navigate(`/savedjobs`);
            } else {
                console.error('Invalid response from Airtable');
            }
        } catch (error) {
            console.error('Failed to save:', error);
        }
    };
```
- As I am saving data from two different sources, I used .find to obtain the second set of data before creating a new data in Airtable using jobService.create(result, matchingDetail)
- The data is then saved in setSavedResults using callback (prevResults => [...prevResults, //continues]) instead of direct ([...savedResults, //continues]) as callback is a safer approach when there are multiple updates e.g. saving multiple jobs quickly
- The callback ensures that we're always working with the most current state, instead of a state that may still be awaiting changes
  
# Planned future enhancements
To make the filtering based on values more meaningful, there are a few enhancements we can make:
1. Expand the list of values and allow multiple selections
2. Match the selected values based on context, instead of whenever/wherever the words appear in the content
3. Allow multiple users by adding sign-in and user account features
4. Expand the list of job categories
5. Expand the jobs to include jobs located in other geographical markets

# Why this app
Filtering based certain criteria is a very common feature in many apps we use day-to-day e.g. search engines, e-commerce sites, jobsearch sites. I have decided to try developing a simple jobs matching app because I am curious about filtering jobs based on other criteria e.g. personal values, mission.

