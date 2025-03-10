import { icons } from "./recipeView.js";

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElem.insertAdjacentHTML('afterbegin', markup);
    }
    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentElem.querySelectorAll('*'));
        console.log(newElements);
        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            // console.log(curEl, newEl.isEqualNode(curEl));
            // console.log(newEl, newEl.firstChild);

            //Updates changed TEXT
            if (!newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== '') {
                // console.log(newEl.firstChild, newEl.firstChild.nodeValue.trim());
                curEl.textContent = newEl.textContent;
            }
            //Updates changed ATTRIBUTES
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
            }
        });
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