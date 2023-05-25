export default class Scroll {
    constructor(elementId = 'null') {
        this.elementId = elementId;
    }

    scrollToElement(elementId = 'null') {
        console.log('Scrolling to element with id', elementId);
        const element = document.getElementById(elementId);

        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
}