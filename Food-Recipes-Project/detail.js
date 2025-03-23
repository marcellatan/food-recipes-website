document.addEventListener("DOMContentLoaded", loadRecipeDetail);

function loadRecipeDetail() {
    const recipeDetail = document.getElementById("recipeDetail");
    const recipe = JSON.parse(localStorage.getItem("currentRecipe"));

    recipeDetail.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h2>${recipe.name}</h2>
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Rating:</strong> ${recipe.rating} ★</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <h3>Steps:</h3>
        <ol>
            ${recipe.steps.map(step => `<li>${step}</li>`).join("")}
        </ol>
    `;
}