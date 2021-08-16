const searchValue = document.getElementById('search-value');
const search = document.querySelector('.search')
const html = document.querySelector('.meal-wrapper')
const recipeWrap = document.querySelector('.recipe-wrapper')
const recipeHead = document.querySelector('.recipe-header')
const recipePar = document.querySelector('.recipe')
const recipeLink = document.getElementById('link')
const closeBtn = document.querySelector('.close-btn')

function queryDB(){
    search.addEventListener('click', function(){
        let item = searchValue.value
        getData(item);
    })
} queryDB();

function getMealRecipe(item){
    item.forEach(function(e){
        e.addEventListener('click', function(btnItem){
            let recipe = btnItem.currentTarget.parentElement.dataset.id;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe}`)
                .then(data => data.json())
                .then(data => {
                    recipeHeader = data.meals[0].strMeal;
                    recipeInstructions = data.meals[0].strInstructions;
                    recipeYouTube = data.meals[0].strYoutube;
                    
                    recipeHead.innerHTML = recipeHeader
                    recipePar.innerHTML = recipeInstructions
                    recipeLink.href = recipeYouTube

                    if(recipeWrap.classList.contains('clear')){
                        recipeWrap.classList.remove('clear');
                    }
                    
                })
        });
    })
}

function closeRecipe(){
    closeBtn.addEventListener('click', function(){
        recipeWrap.classList.toggle('clear');
    })
}closeRecipe();

function getData(param){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`)
        .then(data => data.json())
        .then(data => {
            let item = '';
            if (param === ''){
                return;
            }
            if(data.meals){
                data.meals.forEach(element => {
                item += `
                    <div class="meal-item" data-id = ${element.idMeal}>
                        <div class="meal-img"><img src="${element.strMealThumb}" width="130px" alt=""></div>
                        <button class='btn'>Get Recipe</button>
                        <div class="meal-name">${element.strMeal}</div>
                    </div>` 
                });
            } 
            html.innerHTML = item;
            const btn = document.querySelectorAll('.btn')
            getMealRecipe(btn);
        }) 
}