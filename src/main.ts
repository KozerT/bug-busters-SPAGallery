import "./style.css";
import { setupCard } from "./card.ts";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});
const accessKey = import.meta.env.VITE_ACCESS_KEY;

let searchQuery: string;
let pastSearches: string[] = [];
console.log(pastSearches);
const form = document.getElementById("form") as HTMLFormElement;
const formInput = document.getElementById("search-form") as HTMLInputElement;
const ul = document.getElementById("searchList") as HTMLUListElement;
const next = document.getElementById("next") as HTMLElement;
const prev = document.getElementById("prev") as HTMLElement;
let resultStats = document.querySelector(".js-result-stats") as HTMLElement;

if (localStorage["pastSearches"]) {
  pastSearches = JSON.parse(localStorage["pastSearches"]);
}

formInput.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("are we finding the click?");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // handleSubmit(e);
  searchQuery = formInput.value;
  console.log(searchUnsplash(searchQuery));
  console.log(pastSearches);
  let itemFromStorage: string[] = [];
  if (
    pastSearches.indexOf(searchQuery) == -1 &&
    typeof searchQuery === "string" &&
    searchQuery !== ""
  ) {
    pastSearches.unshift(searchQuery);
    if (pastSearches.length > 5) {
      pastSearches.pop();
    }
    localStorage["pastSearches"] = JSON.stringify(pastSearches);
  }
  if (localStorage.getItem("pastSearches") !== null) {
    console.log(JSON.parse(localStorage.getItem("pastSearches") as string));
    const itemFromStorage: string[] = JSON.parse(
      localStorage.getItem("pastSearches") as string
    );
    addItemToDom(itemFromStorage);
    console.log("in if", itemFromStorage);
  }
  console.log("THE BITTER END", pastSearches);
  console.log("outside", itemFromStorage);
  const inputValue = formInput.value; //formInput
  searchQuery = inputValue.trim();
  console.log(searchQuery);
  fetchResults(searchQuery);
});

const addItemToDom = (item: string[]) => {
  ul.innerHTML = ""; // empty the array
  console.log("tjotjopp", item);
  for (let i = 0; i < item.length; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    li.innerText = item[i];
  }
};

// function handleSubmit(event: any) {
//   event.preventDefault();
//   const inputValue = formInput.value; //formInput
//   searchQuery = inputValue.trim();
//   console.log(searchQuery);
//   fetchResults(searchQuery);
// }

async function searchUnsplash(searchQuery: string) {
  const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  console.log(typeof json);
  return json;
}

//console.log(searchUnsplash(searchQuery));

async function fetchResults(searchQuery: string) {
  try {
    const results = await searchUnsplash(searchQuery);
    console.log(results);
    displayResults(results);
  } catch (err) {
    console.log(err);
    alert("Failed to search Unsplash");
  }
}

//We need to display;
function displayResults(json: any) {
  const searchResults = document.querySelector(
    ".js-search-results"
  ) as HTMLElement;
  searchResults.textContent = "";
  console.log(json);
  json.results.forEach((result: any) => {
    const url = result.urls.small;
    const unsplashLink = result.links.html;
    // const photographer = result.user.name;
    // const photographerPage = result.user.links.html;
    searchResults.insertAdjacentHTML(
      "beforeend",
      `<div>
              <a href="${unsplashLink}" target="_blank">
                  <div class="result-item" style="background-image: url(${url});"></div>
              </a>
          </div>`
    );
  });
}
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  
`;
