# Project: Jobs Matching App
This project is about developing a simple React App. I have chosen to develop an app on jobs matching using API from The Muse. You can try it [here](https://jobsmatching.netlify.app/).

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
const [jobsData, setJobsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    location: "",
    category: ""
  });
  const [savedResults, setSavedResults] = useState([]);
```
The general logic of the game is as follows:


# Key learnings
## Saving data in Airtable
create in airtable then save the data via callback, more reliable than saving directly

The key difference is in how they handle state updates when multiple updates might happen quickly or simultaneously:

Using the callback (safer approach):

javascriptCopyprops.setSavedResults(prevResults => [...prevResults, response.records[0].fields]);

Takes a callback function that receives the guaranteed latest state
Ensures you're always working with the most current state
React batches these updates reliably
Safer for multiple rapid updates


Direct state reference:

javascriptCopyprops.setSavedResults([...savedResults, response.records[0].fields])

Uses the savedResults variable directly from the closure
Might not have the most up-to-date state value
Could miss updates if state changes between render cycles
Could lead to race conditions

Example of when it matters:
// If these happen very quickly:
handleSave(result1) // Tries to add result1
handleSave(result2) // Tries to add result2

// Direct reference might miss one update
// Because savedResults might not be updated yet when the second call happens

// Callback version guarantees both get added
// Because each callback receives the latest state

## Merging data from different URLs
Data fetched from URL combined with data fetched from another URL

## Using Promise when fetching data
To ensure the page shows all the filtered results together, instead of loading one at a time, I used Promise in the following codes:
```
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
- The use of Promise.all allows all API calls to happen concurrently rather than sequentially, making the data fetching much faster when there are multiple companies to look up
- Without Promise, the fitered results show up in bits and pieces which is not conducive for user experience
- useEffect here loads the page whenever there is a change in searchResults

## Checking for certain words in content
For this app, I experimented with filtering jobs based on certain words in the job content, in addition to the job category. To find words that match, I have used the following codes:
```
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
  
# Planned future enhancements
To make the filtering based on values more meaningful, there are a few enhancements we can make:
1. Expand the list of values and allow multiple selections
2. Match the selected values based on context, instead of whenever/wherever the words appear in the content
3. Allow multiple users by adding sign-in and user account features
4. Expand the list of job categories
5. Expand the jobs to include jobs located in other geographical markets

# Why this app
Filtering based certain criteria is a very common feature in many apps we use day-to-day e.g. search engines, e-commerce sites, jobsearch sites. I have decided to try developing a simple jobs matching app because I am curious about filtering jobs based on other criteria e.g. personal values, mission.

