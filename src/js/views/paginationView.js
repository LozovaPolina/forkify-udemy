
import View from './View.js';
import { icons } from './recipeView.js';

class PaginationView extends View {
    _parentElem = document.querySelector('.pagination');


    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const curPage = this._data.page;
        console.log(numPages);

        // Page 1, and there are other pages

        if (curPage === 1 && numPages > 1) {
            return `
                <button data-goto="${curPage + 1}"class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        // Last page
        if (curPage === numPages && numPages > 1) {
            return ` 
                <button data-goto="${curPage - 1}" button class="btn--inline pagination__btn--prev" >
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button >
            `;
        }
        // Other page
        if (curPage < numPages) {
            return `
                <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                <button data-goto="${curPage - 1}" button class="btn--inline pagination__btn--prev" >
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button >
            `;
        }
        return '';
    }

    addHendlerCkick(handler) {
        this._parentElem.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }
}



export default new PaginationView();