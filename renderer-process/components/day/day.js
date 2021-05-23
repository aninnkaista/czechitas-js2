export class Day extends HTMLElement {
    constructor(dayNumber) {
        super();
        this.innerHTML = 'something';
        this.number = dayNumber;
        this.addEventListener('click', this.handleClickEvent);
    }
    handleClickEvent() {
        alert('clicked day: ' + this.number);
    }
}
// for browser to specify new element
customElements.define('day-element', Day);