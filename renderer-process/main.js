// to connect carousel element to index.html
import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';
const CarouselLENGTH = 3;
// data with get method from js server
fetch('http://localhost:3000/news.json')
    .then((serverResponse) => serverResponse.text())
    .then((responseText) => {
        const data = JSON.parse(responseText);
        // to select created carousel html element ----homework 4 edited
        const newsCarousel = document.querySelector('carousel-element');
        // to populate Carousel
        newsCarousel.populateCarousel(data.articles, CarouselLENGTH);
        // set interactivity to buttons
        newsCarousel.addButtonClicks(data.articles, CarouselLENGTH);
    });
const main_content = document.querySelector('section.main-content');
for (let i = 1; i <= 31; i++) {
    const newDay = new Day(i);
    main_content.appendChild(newDay);
}