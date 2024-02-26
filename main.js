import Scene from "./src/modelLoader"; 

import "./style.css";

window.addEventListener("DOMContentLoaded", ()=>{
    const canvas = document.getElementById('app');
    new Scene({canvas});
})