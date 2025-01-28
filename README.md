# Project: Jobs Matching App
This project is about developing a simple React App. I have chosen to develop an app on jobs matching using API from The Muse. You can try it here: [Emotions Word Game](https://zwleileen.github.io/emotions-word-game/).

# Description 
This app allows user to search jobs in Singapore based on a primary criterion i.e. job category. The user can then filter the jobs further based on values e.g. joy, creativity, inclusive. 

![Landing page](https://i.imgur.com/5MSh23c.png)

# User story (includes wireframe)
The user stories for an MVP version of the jobs matching app, as well as wireframes can be found on this public [trello board](https://trello.com/b/XKLA7OIr/project-2-react-app-jobs-matching).

Several minor changes have been made to the initial wireframes while developing the app:
1. Changed the search inputs to job category and company values
2. Changed to job details to company, role and industry

  
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

## Checking for certain words in content

# Planned future enhancements
To make the filtering based on values more meaningful, there are a few enhancements we can make:
1. Expand the list of values and allow multiple selections
2. Match the selected values based on context, instead of whenever/wherever the words appear
3. Allow multiple users by adding sign-in and user account features
4. Expand the list of job categories
5. Expand the jobs to include jobs located in other geographical markets

# Why this app
Filtering based certain criteria is a very common feature in many apps we use day-to-day e.g. search engines, e-commerce sites, jobsearch sites. I have decided to try developing a simple jobs matching app because I am curious about filtering jobs based on other criteria e.g. personal values, mission.

