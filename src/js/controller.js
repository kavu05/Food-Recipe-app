const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showRecipe = async function () {
  try {

    const title = window.location.hash.slice(1);
    console.log(title);
    if (!title) return;

    // Loading recipe data
    const res = await fetch(`https://my-recipe-api-project.herokuapp.com/recipes/${title}`);

    let data = await res.json();

    console.log(res, data);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let recipe = data.map(
      obj => {
        return {
          author: obj.author,
          description: obj.description,
          directions: obj.directions,
          ingredients: obj.ingredients,
          servings: obj.servings,
          sourceUrl: obj.source_url,
          tags: obj.tags,
          title: obj.title
        }
      }
    );
    //console.log(recipe);

    //rendering recipe
    const markup = `

    <figure class="recipe__fig">
          <img src="src/img/logo.png" alt="Logo" class="header__logo" />
          <h1 class="recipe__title">
            <span>${recipe.map(tit => {
      return tit.title
    })}</span >
          </h1 >
        </figure >

  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="src/img/icons.svg#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${recipe.map(ser => {
      return ser.servings
    })}</span>
    <span class="recipe__info-text">servings</span>
    <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
      
        ${recipe.map(ing => {
      return ing.ingredients
    })}
        </div>
      </li>

      <div class="recipe__directions">
      <h2 class="heading--2">Recipe directions</h2>
      <span>${recipe.map(dir => {
      return dir.directions
    })}</span>

     

    `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err)

  }

};
//showRecipe();

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe))
//window.addEventListener('hashchange', showRecipe);