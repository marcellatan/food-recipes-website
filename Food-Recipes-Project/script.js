// Sample list of recipes
const recipes = [
    { id: 1, name: "Fried Rice", category: "main-course", ingredients: ["Rice", "Egg", "Soy Sauce", "Salt"], steps: ["Cook rice", "Fry egg", "Mix everything"], image: "fried-rice.jpg", rating: 4.5 },
    { id: 2, name: "Fried Noodles", category: "main-course", ingredients: ["Noodles", "Egg", "Garlic", "Soy Sauce"], steps: ["Boil noodles", "Fry egg", "Mix everything"], image: "fried-noodles.jpg", rating: 4.0 },
    { id: 3, name: "Grilled Chicken", category: "main-course", ingredients: ["Chicken", "Soy Sauce Marinade", "Palm Sugar"], steps: ["Marinate chicken", "Grill chicken"], image: "grilled-chicken.jpg", rating: 4.7 },
    { id: 4, name: "Caesar Salad", category: "appetizer", ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar Dressing"], steps: ["Chop lettuce", "Add croutons", "Add dressing"], image: "caesar-salad.jpg", rating: 4.2 },
    { id: 5, name: "Chocolate Cake", category: "dessert", ingredients: ["Flour", "Sugar", "Cocoa", "Eggs"], steps: ["Mix ingredients", "Bake", "Decorate"], image: "chocolate-cake.jpg", rating: 4.8 }
];

// Save recipes to localStorage (if not already saved)
if (!localStorage.getItem("recipes")) {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Load recipes into the page
function displayRecipes(recipesList) {
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = "";

    recipesList.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p class="rating">Rating: ${recipe.rating} ★</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <button class="favorite-button" onclick="toggleFavorite(${recipe.id})">
                ${isFavorite(recipe.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <button class="detail-button" onclick="viewDetail(${recipe.id})">View Details</button>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

// Check if a recipe is already in favorites
function isFavorite(recipeId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(recipeId);
}

// Toggle favorite recipes using Local Storage
function toggleFavorite(recipeId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (favorites.includes(recipeId)) {
        favorites = favorites.filter(id => id !== recipeId);
    } else {
        favorites.push(recipeId);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Favorites updated!");
    displayRecipes(recipes);
}

// Search recipes by name
document.getElementById("searchInput").addEventListener("input", function() {
    const searchText = this.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchText));
    displayRecipes(filteredRecipes);
});

// Filter recipes by category
document.querySelectorAll(".category-button").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll(".category-button").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        const category = this.getAttribute("data-category");
        const filteredRecipes = category === "all" ? recipes : recipes.filter(recipe => recipe.category === category);
        displayRecipes(filteredRecipes);
    });
});

// View recipe details
function viewDetail(recipeId) {
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    localStorage.setItem("currentRecipe", JSON.stringify(recipe));
    window.location.href = "detail.html";
}

// Initialize the recipe list
displayRecipes(recipes);