import 'core-js/actual';
import 'regenerator-runtime/runtime';

import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// if (module.hot) {
//     module.hot.accept();
// }



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


const constrolSearchResults = async function () {
    try {

        resultsView.renderSpinner();
        // get search query
        const query = searchView.getQuery();
        if (!query) return;

        // load search result
        await model.loadSearchResults(query);

        // render results
        resultsView.render(model.getSearchResutsPage());
    } catch (err) {
        resultsView.renderError();
    }
};
// constrolSearchResults();
const init = function () {
    recipeView.addHendlerRender(controlRecipes);
    searchView.addHendlerSearch(constrolSearchResults);
    
};
init();

