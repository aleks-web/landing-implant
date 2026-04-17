import '@splidejs/splide/css';
import '@splidejs/splide/css/core';
import Splide from '@splidejs/splide';

document.addEventListener( 'DOMContentLoaded', function() {
    window.slide1 = new Splide('.portfolio__slider', {

    });
    window.slide1.mount();
});