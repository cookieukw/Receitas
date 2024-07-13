const submitButton = document.getElementById("submitRecipe");
const titleInput = document.getElementById("title");
const ingredientsInput = document.getElementById("ingredients");
const preparationInput = document.getElementById("preparation");
const imageInput = document.getElementById("imageUrl");

submitButton.addEventListener("click", function (event) {
  event.preventDefault()
    const title = titleInput.value.trim();
    const ingredients = ingredientsInput.value.trim().toLowerCase();
    const preparation = preparationInput.value.trim().toLowerCase();
    const imageUrl = imageInput.value.trim();
    if (title === "" || ingredients === "" || preparation === "" || !imageUrl) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const recipeData = {
        title,
        ingredients,
        preparation,
        imageUrl
    };
    fetch("/api/submit_recipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipeData)
    })
        .then(response => {
            if (response.ok) {
                alert("Receita enviada com sucesso!");
                titleInput.value = "";
                ingredientsInput.value = "";
                preparationInput.value = "";
                imageInput.value = "";
            } else {
                alert(
                    "Erro ao enviar a receita. Por favor, tente novamente mais tarde."
                );
            }
        })
        .catch(error => {
            console.log("Erro ao enviar a receita:", error);
            alert(
                "Erro ao enviar a receita. Por favor, tente novamente mais tarde."
            );
        });
});
