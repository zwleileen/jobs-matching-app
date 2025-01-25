# Project: Jobs Matching App
This project is about developing a simple React App. I have chosen to develop an app on jobs matching using API from The Muse. You can try it here: [Emotions Word Game](https://zwleileen.github.io/emotions-word-game/).

# Description 

![Landing page](https://i.imgur.com/5MSh23c.png)

# User story (includes wireframe)
The user stories for an MVP version of the jobs matching app, as well as wireframes can be found on this public [trello board](https://trello.com/b/XKLA7OIr/project-2-react-app-jobs-matching).

  
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



# Planned future enhancements
To make the game more engaging, the following features may be added:
1. Allow user to quit the game halfway and return to main page
2. Attribute points to every successful match, more points to more number of words matched e.g. 2 points for 2 words matched versus 6 points for 6 words matched, then keep track of the points on a scoreboard

# Why this game
In the book titled "How Emotions are Made: The Secret Life of the Brain" by Dr. Lisa Feldman Barrett, she shared about the importance of emotional granularity in developing emotional intelligence. Being able to accurately label our emotions can help us to better understand, regulate and communicate them. Studies have shown that people with more vocabulary describing their emotions i.e. emotional granularity are better equipped to handle adversity. This game aims to make it easier for everyone to remember more granular emotions and hopefully use them in our day to day.

