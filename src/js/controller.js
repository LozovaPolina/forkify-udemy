import 'core-js/actual';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const [icons] = new URL('../img/icons.svg', import.meta.url).href.split('?');






const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = (parentEl) => {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
};
const renderError = (parentEl) => {
    const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>No recipes found for your query. Please try again!</p>
            </div> 
    `;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
};
const showRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        renderSpinner(recipeContainer);
        // todo loading recipe
        // showLouder();
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
            // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09'
        );
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`)

        let { recipe } = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.puplisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        // todo rendering recipe
        const markup = `
            <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
            </figure>

            <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                    <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                    <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                </button>
                </div>
            </div>

            <div class="recipe__user-generated">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            <button class="btn--round">
                <svg class="">
                <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
            </button>
            </div>
                <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map(ing => {
            return `
                <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity}</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                    </div>
                </li>
            `;
        }).join('')}
                </ul>
            </div>

            <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
                directions at their website.
            </p>
            <a
                class="btn--small recipe__btn"
                href="${recipe.sourseUrl}"
                target="_blank"
            >
                <span>Directions</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
            </div>
        `;
        recipeContainer.innerHTML = '';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
        // renderRecipe(recipe);

    } catch (err) {
        renderError(recipeContainer);
    }
};
// showRecipe();
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));










function createListIngredients(ingredients) {
    let list = ``;
    ingredients.forEach((elem, i) => {
        list += `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
            </svg>
                <div class="recipe__quantity">${elem.quantity ?? ''}</div>
                <div class="recipe__description">
                <span class="recipe__unit">${elem.unit}</span>
                ${elem.description}
            </div>
        </li>
    `;
    });
    return list;
}
function renderRecipe(recipeObj) {

    recipeContainer.innerHTML = `
        <figure class="recipe__fig">
            <img src="${recipeObj.image}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${recipeObj.title}</span>
            </h1>
            </figure>

            <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipeObj.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipeObj.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                    <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                    <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                </button>
                </div>
            </div>

            <div class="recipe__user-generated">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            <button class="btn--round">
                <svg class="">
                <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
            </button>
            </div>

            <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
                ${createListIngredients(recipeObj.ingredients)}
            </ul>
            </div>

            <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${recipeObj.publisher}</span>. Please check out
                directions at their website.
            </p>
            <a
                class="btn--small recipe__btn"${recipeObj.sourseUrl}"
                target="_blank"
            >
                <span>Directions</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
            </div>
        `;
}
function showLouder(container = recipeContainer) {
    container.innerHTML = `
            <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
            </div>
    `;
}
function showError(container = recipeContainer) {
    container.innerHTML = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>No recipes found for your query. Please try again!</p>
            </div> 
    `;
}