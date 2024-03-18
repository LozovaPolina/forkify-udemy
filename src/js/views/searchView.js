import View from './View.js';

class SearchView {
    _parentElem = document.querySelector('.search');


    getQuery() {
        const query = this._parentElem.querySelector('.search__field').value;
        this._cleatInput();
        return query;
    }

    _cleatInput() {
        this._parentElem.querySelector('.search__field').value = '';
    }
    addHandlerSearch(handler) {
        this._parentElem.addEventListener('submit', (e) => {
            e.preventDefault();
            handler();
        });
    }
    renderMessage(message = this._message) {
        const markup = `
            <div class="message">
            <div>
                <svg>
                <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
            </div>
        `;
        this._clear();
        this._parentElem.insertAdjacentHTML('afterbegin', markup);
    }

}

export default new SearchView();