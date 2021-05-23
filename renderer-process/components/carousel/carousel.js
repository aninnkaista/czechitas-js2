import { NewsArticle } from '../news-article/news-article.js';
export class Carousel {
    constructor(articles, itemCount) {
            // variables defined by declaratiom
            this.articles = articles;
            this.itemCount = itemCount;

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
    checkButtonVisibity() {
            if (this.itemStart === 0) {
                this.buttonLeft.hidden = true;
            } else if (this.itemStart >= this.articles.length - this.itemCount) {
                this.buttonRight.hidden = true;
            } else {
                this.buttonLeft.hidden = false;
                this.buttonRight.hidden = false;
            }
        }
        // populating carousel
    populateCarousel() {
            this.header.innerText = '';
            //----------------------------task 2-----------------------------------------
            for (let i = this.itemStart; i < this.itemStart + this.itemCount; i++) {
                // to create an element
                const newsValue = this.articles[i];
                // add NewsArticle class
                const curNewsArticle = new NewsArticle(newsValue);
                this.header.appendChild(curNewsArticle);
            }
            this.checkButtonVisibity();
        }
        // adding event listeners to buttons
    addButtonClicks() {
        this.buttonLeft.addEventListener('click', () => {
            this.itemStart--;
            this.populateCarousel();
        });
        this.buttonRight.addEventListener('click', () => {
            this.itemStart++;
            this.populateCarousel();
        });
    }
}