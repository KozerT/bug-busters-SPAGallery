import "./style.css";
import { setupCounter } from "./counter.ts";

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

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
