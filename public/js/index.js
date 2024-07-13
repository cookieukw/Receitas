const recipesContainer = document.getElementById("recipes-container");
fetch("/api/recipes")
    .then(response => response.json())
    .then(data => {
        console.log({ data });
        data.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            recipesContainer.appendChild(recipeCard);
        });
    })
    .catch(error =>
        console.error("Erro ao obter os dados das receitas:", error)
    );

function createRecipeCard(recipe) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card", "mdl-card", "mdl-shadow--2dp");

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("mdl-card__title");

    const recipeImage = document.createElement("img");
    recipeImage.classList.add("recipe-image");
    recipeImage.src = recipe.imageUrl;
    recipeCard.appendChild(recipeImage);

    const titleText = document.createElement("h2");
    titleText.classList.add("mdl-card__title-text", "recipe-title");
    titleText.textContent = recipe.title;
    cardTitle.appendChild(titleText);

    const descriptionText = document.createElement("div");
    descriptionText.classList.add(
        "mdl-card__supporting-text",
        "recipe-description"
    );
    descriptionText.textContent = recipe.description;

    const viewRecipeButton = document.createElement("button");
    viewRecipeButton.classList.add(
        "mdl-button",
        "mdl-js-button",
        "mdl-button--raised",
        "mdl-button--colored",
        "mdl-button--accent"
    );
    viewRecipeButton.textContent = "Ver Receita";
    viewRecipeButton.addEventListener("click", () => {
        window.location.href = `/about.html?id=${recipe.id}`;
    });

    recipeCard.appendChild(cardTitle);
    recipeCard.appendChild(descriptionText);
    recipeCard.appendChild(viewRecipeButton);

    return recipeCard;
}
