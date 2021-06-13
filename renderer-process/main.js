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

const currentDate = new Date();
const maxDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
).getDate();
for (let i = 1; i <= maxDate; i++) {
    const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i,
    );
    main_content.appendChild(new Day(newDate));
}

const buttonOpenModal = document.getElementById('open-modal');
const modalContainer = document.querySelector('.modal-container');

buttonOpenModal.addEventListener('click', () => {
    modalContainer.hidden = false;
});