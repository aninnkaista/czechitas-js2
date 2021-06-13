export class Day extends HTMLElement {
    constructor(date) {
        super();
        this.innerHTML = ` <div id="day-number"></div>
            `;
        this.date = date;
        this.number = date.getDate();
        this.querySelector('#day-number').innerText = this.number;
        this.addEventListener('click', this.handleClickEvent);
    }

    getDayName() {
        switch (this.date.getDay()) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
    }

    handleClickEvent() {
        alert('clicked day: ' + this.getDayName());
    }
}
// for browser to specify new element
customElements.define('day-element', Day);