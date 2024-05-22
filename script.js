

const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const searchBox = document.querySelector('.searchBox');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');



// Function to get recipes
const fetchRecipes = async (query) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyACFPPXcHFmPIkOTLEyS2c5bQelPBJfYaE`;

    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";

    try {
        const data = await fetch(url);
        const response = await data.json();
        console.log(response.items);
        recipeContainer.innerHTML = "";

        response.items.forEach(item => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            const amount = item.saleInfo.retailPrice && item.saleInfo.retailPrice.amount;
            const MRP = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
            const main = document.querySelector("main");
            main.style.height = "100%";
            if (amount != undefined|| MRP != undefined) {
                recipeDiv.innerHTML = `
                <img src = "${item.volumeInfo.imageLinks.thumbnail}">
                <div style="display: flex;">
                    <p>Price: INR<h2>${amount}</h2> </p>
                    <p><s>${MRP}</s></p>
                </div>
                <p>Publisher's name:<span>${item.volumeInfo.publisher}</span></p>
                <p>Published Date:<span>${item.volumeInfo.publishedDate}</span></p> 
            `

            const button = document.createElement('button');
            button.innerHTML = `<a href="${item.saleInfo.buyLink}">buy now</a>`;
            recipeDiv.appendChild(button);

            recipeContainer.appendChild(recipeDiv);
            }
            

            // Adding eventlistener to recipe button
            // const desButton = document.querySelector(".btn");
            // a.addEventListener('click' , (item) =>{
            //     openRecipePopup(item);
            // })

           
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
    }
}



// const openRecipePopup = (item) => {
//     recipeDetailsContent.innerHTML = `
//     <div class="recipeInstructions">
//         <p>${item.volumeInfo.description}</p>
//     </div>
//     `
//     recipeDetailsContent.parentElement.style.display = "block";
// }

// recipeCloseBtn.addEventListener('click', () =>{
//     recipeDetailsContent.parentElement.style.display = "none";
// })

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the book name in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    //console.log("Button clicked");
});


