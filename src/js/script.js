'use strict';
import calc  from'./modules/calc';
import  cards  from'./modules/cards';
import  forms  from'./modules/forms';
import  modal  from'./modules/modal';
import  slider  from'./modules/slider';
import  tabs  from'./modules/tabs';
import  time  from'./modules/time';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () =>{

	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 60000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal');
	time('.timer', '2023-06-17');
	cards();
	calc();
	forms(modalTimerId);
	slider();
});
