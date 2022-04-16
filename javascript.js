const searchForm = document.querySelector('form');

const searchResult = document.querySelector(".search-result");

const container = document.querySelector(".container");


const AppID = 'b72b97ac';

const AppKeys = 'd4d2de288823258ddc1320f5d615c0b9';





var searchQuery = '';

searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;


    fetchApi();
})

async function fetchApi(){
    const baseUrl =   `https://api.edamam.com/search?q=${searchQuery}&app_id=${AppID}&app_key=${AppKeys}&from=0&to=20`;

    const response = await fetch(baseUrl);

   const data = await response.json();

   generateHtml(data.hits);

   console.log(data);

}

function generateHtml(resutls){

    container.classList.remove('initial');

    var generatedHtml ='';
    resutls.map(result =>{

        generatedHtml += 

        `
        <div class="item">
        <img src="${result.recipe.image}" alt="food" />
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-bottom" href="${result.recipe.url}" target="_blank"> View recipe </a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)} </p>
        <p class="item-data">Calories: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'} </p>
      
    </div>
    `

    })

    searchResult.innerHTML = generatedHtml;

}


