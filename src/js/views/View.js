import { icons } from "./recipeView.js";

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElem.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElem.innerHTML = '';
    }
    renderSpinner() {
        const markup = `
            <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
            </div>
        `;
        this._clear();
        this._parentElem.insertAdjacentHTML('afterbegin', markup);
    }
    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div> 
        `;
        this._clear();
        this._parentElem.insertAdjacentHTML('afterbegin', markup);
    }
}