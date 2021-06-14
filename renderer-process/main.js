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

// homework 5----------------------------------------------------------------

// panel at the end of an app to ask for a key word and show time
const watchWindow = document.getElementById('watch');
// form to ask for the key word
const passwordForm = document.createElement('form');
passwordForm.innerHTML = `
<label for="password-input">Type in secret key</label>
<input type="password" name="password-input" id="password-input">
<input type="button" value="Submit key" name="submit">
<input type="button" value="Exit" name="exit">
`;
// string to collect keys pressed
let checkString = '';

function generateTime() {
    /**
     * Function will check the submitted key word and in case of correct one will show time.
     * Time will be shown for cca 5 seconds and then the panel will dissapear together with time.
     **/
    if (passwordForm.elements['password-input'].value === 'heslo') {
        console.log('correct password');
        watchWindow.innerHTML = '';
        let curTime = new Date();
        //add div with time
        const divTimer = document.createElement('div');
        watchWindow.appendChild(divTimer);
        // to set timeinterval for 1 sec
        const timeInt = setInterval(() => {
            divTimer.innerHTML = `${curTime.toLocaleTimeString()}`;
            curTime.setSeconds(curTime.getSeconds() + 1);
        }, 1000);
        //after 6 seconds to stop interval
        setTimeout(() => {
            //reset intervl
            clearInterval(timeInt);
            //clear and hide window
            watchWindow.removeChild(divTimer);
            watchWindow.classList.add('hidden');
        }, 6000);
    } else {
        const errorDiv = document.createElement('div');

        errorDiv.innerHTML = `
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Wrong key, try again!
        `;
        errorDiv.setAttribute('id', 'alert-message');
        watchWindow.innerHTML = '';
        watchWindow.appendChild(errorDiv);
        passwordForm.elements['password-input'].value = '';
        watchWindow.appendChild(passwordForm);
    }
}

document.addEventListener('keydown', (KeyboardEvent) => {
    //to collect pressed keys
    checkString += KeyboardEvent.key;
    //to check if pressed keys contain 'time' string
    if (checkString.indexOf('time') !== -1) {
        //if yes than ask for a key word
        watchWindow.classList.remove('hidden');
        watchWindow.appendChild(passwordForm);
        checkString = '';
        // when exit button is pressed then exit event listener
        passwordForm.elements['exit'].addEventListener('click', () => {
            watchWindow.classList.add('hidden');
            passwordForm.elements['password-input'].value = '';
            watchWindow.innerHTML = '';
            return;
        });
        //when submit is clicked than run generateTime function
        passwordForm.elements['submit'].addEventListener('click', generateTime);
    }
});
// homework 5----------------------------------------------------------------