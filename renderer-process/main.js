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

function showDayModal() {
    const template = document.getElementById('modal-template');
    const modal = template.content.cloneNode(true);

    const closeAction = () => {
        const child = document.querySelector('section.modal-container');
        document.body.removeChild(child);
    };
    modal.querySelector('#close-modal').addEventListener('click', closeAction);

    const cancelButton = modal.querySelector('#cancel-button');
    cancelButton.addEventListener('click', closeAction);

    modal.querySelector('#save-button').addEventListener('click', () => {
        const formRef = document.querySelector('#modal-form');
        const formData = new FormData(formRef);
        const isHoliday = formData.get('isHolidayControl') === 'on';
    });
    document.body.appendChild(modal);

    const checkbox = document.querySelector('#limitAttendeesByGender');
    const row = document.querySelector('#genderSelectRow');
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });

    const days = document.querySelectorAll('day-element');
    const daysArray = Array.from(days);

    for (const item of days) {
        console.log(item);
    }

    fetch('http://localhost:3000/contacts')
        .then((serverResponse) => serverResponse.text())
        .then((responseText) => {
            const data = JSON.parse(responseText);
            const select = document.querySelector('#eventAttendees');

            data.forEach((it) => {
                const option = document.createElement('option');
                option.setAttribute('value', it.id);
                option.innerText = `${it.first_name} ${it.last_name}`;
                select.appendChild(option);
            });
        });
}

window.showModal = showDayModal;