import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';
// data with get method from js server
fetch('http://localhost:3000/news.json')
    .then((serverResponse) => serverResponse.text())
    .then((responseText) => {
        const data = JSON.parse(responseText);
        // to create an instance of Carousel for news articles and 3 shown items
        const newsCarousel = new Carousel(data.articles, 3);
        // to populate Carousel
        newsCarousel.populateCarousel();
        // set interactivity to buttons
        newsCarousel.addButtonClicks();
    });
const main_content = document.querySelector('section.main-content');
for (let i = 1; i <= 31; i++) {
    const newDay = new Day(i);
    main_content.appendChild(newDay);
}