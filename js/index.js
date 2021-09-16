/* eslint-disable strict */
'use strict';

import togglePopup from './modules/popup';
import scrollTop from './modules/scrollTop';
import Carousel from './modules/carousel';
import timer from './modules/timer';
import docsGallery from './modules/docsGallery';
import calc from './modules/calc';

// модальные окна:
togglePopup();

// кнопка плавной прокрутки вверх:
scrollTop();

// карусель "Выгоды для клиентов":
const carouselBenefits = new Carousel({
  main: '.benefits-inner',
  wrap: '.benefits-wrap',
  prev: '.benefits__arrow--left',
  next: '.benefits__arrow--right',
  slidesToShow: 3,
  infinity: true,
  responsive: [
    {
      breakpoint: 576,
      slidesToShow: 1
    }
  ]
});
carouselBenefits.init();

// карусель "Наши услуги":
const carouselServices = new Carousel({
  main: '.services-wrap',
  wrap: '.services-wrap .row',
  prev: '.services__arrow--left',
  next: '.services__arrow--right',
  slidesToShow: 2,
  infinity: true,
  responsive: [
    {
      breakpoint: 576,
      slidesToShow: 1
    }
  ]
});
carouselServices.init();

// таймер:
timer('18 september 2021');

// галерея "Сертификаты и документы":
docsGallery();

// калькулятор:
calc();
