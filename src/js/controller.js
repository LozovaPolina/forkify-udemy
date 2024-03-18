import 'core-js/actual';
import 'regenerator-runtime/runtime';

import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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
        // Update results view to mark selected search result
        resultsView.update(model.getSearchResutsPage())

        // loading recipe
        await model.loadRecipe(id);

        //  rendering recipe
        recipeView.render(model.state.recipe);

    } catch (err) {
        recipeView.renderError();
    }
};



const controlSearchResults = async function () {
    try {

        resultsView.renderSpinner();
        // get search query
        const query = searchView.getQuery();
        if (!query) return;

        // load search result
        await model.loadSearchResults(query);

        // render results
        resultsView.render(model.getSearchResutsPage());
        // render initial pagination btns
        paginationView.render(model.state.search);
    } catch (err) {
        resultsView.renderError();
    }
};

const controlPagination = function (goToPage) {
    resultsView.render(model.getSearchResutsPage(goToPage));
    paginationView.render(model.state.search);
};


const controlServings = function (newServings) {
    //Update the recipe servings (in state)
    model.updateServings(newServings);

    //Update the recipe view
    recipeView.update(model.state.recipe);
};
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerCkick(controlPagination);
};
init();

