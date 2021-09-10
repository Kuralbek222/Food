import cards from './modules/cards';
import tabs from './modules/tabs';
import DateTimer from './modules/DateTimer';
import moduWindow from './modules/moduWindow';
import calculate from './modules/calculate';
import slider from './modules/slider';
import forms from './modules/forms';
import { openModal } from './modules/moduWindow';



window.addEventListener('DOMContentLoaded', () => {


    const modalTimerId = setTimeout(() => {

        openModal('.modal')
    }, 30000);
    moduWindow('[data-modal]', '.modal', modalTimerId)
    tabs()
    cards()
    DateTimer('.timer', '2021-09-20')

    calculate()
    slider({
        container: document.querySelector('.offer__slider-wrapper'),
        slideCon: document.querySelectorAll('.offer__slide'),
        slideBtnNextCon: document.querySelector('.offer__slider-next'),
        slideBtnPrevCon: document.querySelector('.offer__slider-prev'),
        slideFieldCon: document.querySelector('.offer__slider-inner'),
        toTalCon: document.getElementById('total'),
        CurrCon: document.getElementById('current'),
        dotsSlider: document.querySelector('.offer__slider'),
    })
    forms('form', modalTimerId, '.modal')


});