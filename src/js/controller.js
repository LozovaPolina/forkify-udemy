import 'core-js/actual';
import 'regenerator-runtime/runtime';

import * as model from './model.js'
import recipeView from './views/recipeView.js';



const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        // todo loading recipe
        await model.loadRecipe(id);

        // todo rendering recipe

        recipeView.render(model.state.recipe);


    } catch (err) {
        recipeView.renderError();
    }
};
// controlRecipes();
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

