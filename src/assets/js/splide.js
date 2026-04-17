import '@splidejs/splide/css';
import '@splidejs/splide/css/core';
import Splide from '@splidejs/splide';

document.addEventListener( 'DOMContentLoaded', function() {
    window.slide1 = new Splide('.portfolio__slider', {
        type   : 'loop',
        pagination: false,
        perPage: 3,
        gap: 20,

        breakpoints: {
            576: {
                perPage: 1,
            },
            1024: {
                perPage: 2,
            },
        }
    });
    window.slide1.mount();
});