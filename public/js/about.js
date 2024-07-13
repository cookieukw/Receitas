const noRecipeIcon = document.getElementById("noRecipeIcon");
const recipeImage = document.getElementById("recipeImage");
const recipeIngredients = document.getElementById("recipeIngredients");
const recipePreparation = document.getElementById("recipePreparation");
const recipeTitpe = document.getElementById("recipeTitle");

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    const recipeId = urlParams.get("id");
    if (recipeId) {
        fetch(`/api/recipe?id=${recipeId}`)
            .then(response => response.json())
            .then(data => {
                recipeImage.src = data.imageUrl;
                
                
                
                
                recipePreparation.innerHTML = data.preparation.replace(/\n/g, '<br>');
                recipeIngredients.innerHTML = data.ingredients.replace(/\n/g, '<br>');
                
                
                recipeTitle.textContent = data.title;
            })
            .catch(error =>
                console.log("Erro ao obter os dados da receita: " + error)
            );
    } else {
        noRecipeIcon.classList.remove("hidden");
    }
});
