document.addEventListener("DOMContentLoaded", loadFavorites);

function loadFavorites() {
    const favoritesContainer = document.getElementById("favoritesContainer");

    // Ambil daftar resep dari localStorage
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    
    // Ambil daftar ID favorit dari localStorage
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favoriteIds.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorite recipes yet.</p>";
        return;
    }

    // Filter hanya resep yang ada dalam daftar favorit
    const favoriteRecipes = recipes.filter(recipe => favoriteIds.includes(recipe.id));

    favoritesContainer.innerHTML = "";
    favoriteRecipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <button class="remove-favorite-button" onclick="removeFavorite(${recipe.id})">
                Remove from Favorites
            </button>
        `;
        favoritesContainer.appendChild(recipeCard);
    });
}

// Remove a recipe from favorites
function removeFavorite(recipeId) {
    let favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    favoriteIds = favoriteIds.filter(id => id !== recipeId);
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));

    loadFavorites(); // Reload the favorites list
}
