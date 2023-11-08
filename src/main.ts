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

if (localStorage["pastSearches"]) {
  pastSearches = JSON.parse(localStorage["pastSearches"]);
}

formInput.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("are we finding the click?");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchQuery = formInput.value;
  console.log(searchUnsplash(searchQuery));
  console.log(pastSearches);
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
  }
  console.log("THE BITTER END", pastSearches);
});

async function searchUnsplash(searchQuery: string) {
  const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
}

//console.log(searchUnsplash(searchQuery));

async function fetchResults(searchQuery) {
  try {
    const results = await searchUnsplash(searchQuery);
    console.log(results);
    displayResults(results);
  } catch (err) {
    console.log(err);
    alert("Failed to search Unsplash");
  }
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  
    <div>Picture1</div>
    <div>Picture2</div>
    <div>Picture3</div>
    <div>Picture4</div>
    <div>Picture5</div>
    <div>Picture6</div>
    <div>Picture7</div>
    <div>Picture8</div>
    <div>Picture9</div>
  </div>
`;
