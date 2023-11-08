import "./style.css";
import { setupCard } from "./card.ts";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});
const accessKey = import.meta.env.VITE_ACCESS_KEY;
// const browserApi = createApi({
//   apiUrl: "https://mywebsite.com/unsplash-proxy",
// });

//1. searchQuery comes from the form;

let searchQuery: string;
let pastSearches: string | [] = localStorage.getItem("searchItems")
  ? JSON.parse(localStorage.getItem("searchItems") as string)
  : [];
console.log(pastSearches);
const form = document.getElementById("form") as HTMLFormElement;
const formInput = document.getElementById("search-form") as HTMLInputElement;
const ul = document.getElementById("searchList") as HTMLUListElement;

const addSearch = (text: string) => {
  const li = document.createElement("li");
  li.textContent = text;
  ul.appendChild(li);
};

form.addEventListener("submit", function(e) {
  e.preventDefault();
  searchQuery = formInput.value;
  console.log(searchUnsplash(searchQuery));
  addSearch(searchQuery);
  console.log(pastSearches);
  if (!localStorage.getItem(searchQuery)) {
    if (localStorage.getItem("searchItems"))
      localStorage.setItem("searchItem", searchQuery);
  }
});

//const submitResults = () => {};

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
