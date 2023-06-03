export default class Scroll {
    constructor(elementId = 'null') {
        this.elementId = elementId;
    }

    scrollToElement(elementId = 'null') {
        const element = document.getElementById(elementId);

        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            console.log('Scrolling to element with id', elementId);
        } else {
            console.log('Error finding element with id', elementId);
        }
    }
}