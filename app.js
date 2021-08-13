const searchValue = document.getElementById('search-value');
const search = document.querySelector('.search')
const html = document.querySelector('.meal-wrapper')

function queryDB(){
    search.addEventListener('click', function(){
        let item = searchValue.value
        getData(item);
    })
} queryDB();

function getData(param){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`)
        .then(data => data.json())
        .then(data => {
            if (param === ''){
                return;
            }
            if(data.meals){
                data.meals.forEach(element => {
                html.innerHTML += `
                    <div class="meal-item">
                        <div class="meal-img"><img src="${element.strMealThumb}" width="130px" alt=""></div>
                        <div class="meal-name">${element.strMeal}</div>
                    </div>` 
                });
            }
        })
}