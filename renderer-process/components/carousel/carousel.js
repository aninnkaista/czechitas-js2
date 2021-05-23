import { NewsArticle } from '../news-article/news-article.js';
//---------------- homework 4---------------------
export class Carousel extends HTMLElement {
    constructor() {
            super();
            // variables defined by declaratiom
            // inner HTML of the Carousel from index.html
            this.innerHTML = `<header class="header-news">
            <div class="header-news__container"></div>
            <button id="carousel-button-left">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="last" id="carousel-button-right">
                <i class="fas fa-chevron-right"></i>
            </button>
        </header>`;
            // variables defined by selecting
            this.header = document.querySelector(
                'header.header-news > div.header-news__container',
            );
            this.buttonLeft = document.getElementById('carousel-button-left');
            this.buttonRight = document.getElementById('carousel-button-right');
            // initial value
            this.itemStart = 0;
        }
        // checking buttons visibility at the borders
    checkButtonVisibity(articles, itemCount) {
            if (this.itemStart === 0) {
                this.buttonLeft.hidden = true;
            } else if (this.itemStart >= articles.length - itemCount) {
                this.buttonRight.hidden = true;
            } else {
                this.buttonLeft.hidden = false;
                this.buttonRight.hidden = false;
            }
        }
        // populating carousel
    populateCarousel(articles, itemCount) {
            this.header.innerText = '';
            //----------------------------task 2-----------------------------------------
            for (let i = this.itemStart; i < this.itemStart + itemCount; i++) {
                // to create an element
                const newsValue = articles[i];
                // add NewsArticle class
                const curNewsArticle = new NewsArticle(newsValue);
                this.header.appendChild(curNewsArticle);
            }
            this.checkButtonVisibity(articles, itemCount);
        }
        // adding event listeners to buttons
    addButtonClicks(articles, itemCount) {
        this.buttonLeft.addEventListener('click', () => {
            this.itemStart--;
            this.populateCarousel(articles, itemCount);
        });
        this.buttonRight.addEventListener('click', () => {
            this.itemStart++;
            this.populateCarousel(articles, itemCount);
        });
    }
}
//-------------homeworok 4
//to define new element for browser
customElements.define('carousel-element', Carousel);