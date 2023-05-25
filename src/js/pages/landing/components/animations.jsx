import anime from 'animejs';

export default class Animations {
    constructor() {
    }

    titleSlideIn() {
        anime.timeline({
            targets: '#title-holder',
            autoplay: true,
            opacity: [0, 1],
            easing: 'easeOutQuad',
        })
    }
}
