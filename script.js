const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");

const recipeCloseBtn = document.getElementById("recipe-close-btn");
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.remove("showRecipe");
});
// MEAL FUNCTION
function getMealList() {
  let searchInput = document.getElementById("search-input").value.trim();

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      const { meals } = data;

      if (meals) {
        meals.map((meal) => {
          html += `<div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src=${meal.strMealThumb} alt="food" />
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                 </div>`;
        });
        mealList.classList.remove("notFound");
      } else {
        html += "Sorry, the meal you searched for is not available ";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    })
    .catch((err) => {});
}

// GET RECIPE OF MEAL

function getMealRecipe(e) {
  e.preventDefault();

  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// CREATE A MODAL
function mealRecipeModal(meal) {
  meal = meal[0];
  let html = ` <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
              <h3>Instructions:</h3>
              <p>
              ${meal.strInstructions}
              </p>
            </div>
            <div class="recipe-meal-img">
              <img src="${meal.strMealThumb}" alt="" />
            </div>
            <div class="recipe-link">
              <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>`;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
