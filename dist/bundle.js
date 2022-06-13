/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    	//___________-calc-_________________

	const result = document.querySelector('#result');

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female'
		localStorage.setItem('sex', 'female')
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('sex');
	} else {
		ratio = 1.375
		localStorage.setItem('ratio', 1.375)
	}

	 function localShow(select, activeClass) {
		 const elements = document.querySelectorAll(select);

		 elements.forEach(elem =>{
			elem.classList.remove(activeClass)
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			} 
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		 });
	 }
	 localShow('#gender div', 'calculating__choose-item_active');
	 localShow('.calculating__choose_big div', 'calculating__choose-item_active');
	function calcTotal() {
		if(!sex || !height || !weight || !age || !ratio){
			 result.textContent = ''
			 return;
		}

		if (sex === 'female') {
			
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio) + ' калл';
		} else {
			
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio) + ' калл';
		}
	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

			elements.forEach(elem => {
				elem.addEventListener('click', (e) => {
					if (e.target.getAttribute('data-ratio')) {
						ratio = +e.target.getAttribute('data-ratio');
						localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
					} else {
						sex = e.target.getAttribute('id');
						localStorage.setItem('sex', e.target.getAttribute('id'))
					}
						elements.forEach(elem => {
							elem.classList.remove(activeClass);
						});

						e.target.classList.add(activeClass);
						
						calcTotal();
			});
		});
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', ()=>{

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red'
			} else {
				input.style.border = 'none'
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {
    
	

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResoursce)('http://localhost:3000/menu')
		.then(data => createCard(data));

	function createCard(data) {
		data.forEach(({img, altimg, title, descr, price}) => {
			const element = document.createElement('div');
			const Price = price * 27;
			element.classList.add('menu__item');


			element.innerHTML = `
				<img src=${img} alt=${altimg}>
				<h3 class="menu__item-subtitle">${title}</h3>
				<div class="menu__item-descr">${descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${Price}</span> грн/день</div>
				</div>
		`;

		

		document.querySelector('.menu .container').append(element);
		});
	}

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms(modalTimerId){
    	//__________________FORMS___________________
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'спасибо мы скоро свяжемся с вами',
		failure: 'ошибка, попробуйте еще раз'
	}

	forms.forEach(i => bindPostData(i));







	function bindPostData(form){
		form.addEventListener('submit', (e) => {
			e.preventDefault();// отключение стандартного поведения браузера(перезагрузка страницы)

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
			`;

			form.insertAdjacentElement('afterend', statusMessage)//добавляем statusMessage в форму

			const formData = new FormData(form);// создаем обьект formData

			const json = JSON.stringify(Object.fromEntries(formData.entries()));
 
			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json )
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure);
			}).finally(() =>{
				form.reset();
			})
		});
	}
	//____
	function showThanksModal(message){
		const prevModalDilog = document.querySelector('.modal__dialog');

		prevModalDilog.classList.add('hide');
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close="" class="modal__close">×</div>
				<div class="modal__title">${message}</div>
			</.div>
		`;
		
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() =>{
			thanksModal.remove();
			prevModalDilog.classList.add('show');
			prevModalDilog.classList.remove('hide');
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 4000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
	function openModal(modalSelector, modalTimerId){
		const mod = document.querySelector(modalSelector);
		
		mod.classList.remove('hide');
		mod.classList.add('show');
		document.body.style.overflow = 'hidden';

		if (modalTimerId) {
			clearInterval(modalTimerId);
		}
		
	}
	
	function closeModal(modalSelector) {
		const mod = document.querySelector(modalSelector);

		mod.classList.add('hide');
		mod.classList.remove('show');
		document.body.style.overflow = '';
	} 

function modal(triggerSelector, modalSelector, modalTimerId){    
	
	const btnModal = document.querySelectorAll(triggerSelector),
    	  modal = document.querySelector(modalSelector);

    
    //scrollModal	
    function showModalScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= 
        document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalScroll);
        }
    }
    window.addEventListener('scroll', showModalScroll);

    //Modal


	btnModal.forEach(btn =>{
		btn.addEventListener('click', () =>  openModal(modalSelector, modalTimerId));
	})	


	modal.addEventListener('click', (e)=>{
		if(e.target === modal || e.target.getAttribute('data-close') == '' ){
			closeModal(modalSelector);
		}
	})

	document.addEventListener('keydown', (e)=>{
		if(e.code === 'Escape'){
			closeModal(modalSelector);
		}
	})
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


 

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    //_______________SLIDER_______________

	
	const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    slidesWarapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    btnNext = document.querySelector('.offer__slider-next'),
    btnPrev = document.querySelector('.offer__slider-prev'),
    current = document.querySelector('#current'), 
    total = document.querySelector('#total'),
    width = window.getComputedStyle(slidesField).width;

    let  offset = 0;
    let slideIndex = 1;

    //{{{{{{{{{{{{{__________Nav______________
    slider.style.position = 'relative';
    function createPoint(){
        const el = document.createElement('div');
        el.classList.add('carousel-indicators');
        slider.append(el);
        slides.forEach(a =>{
            const dot = document.createElement('div');
            el.append(dot);
            dot.classList.add('dot');		
        });
    };
    createPoint();

    const dot = document.querySelectorAll('.dot'),
        dotWrap = document.querySelector('.carousel-indicators');


    function hideGovno(){
        dot.forEach(item =>{
            item.style.opacity = '0.6';
        })

    }
    hideGovno();

    dotWrap.addEventListener('click', (e) =>{
        if(e.target){
            dot.forEach((item, i) =>{
                if(e.target == item){
                    hideGovno();
                    dot[i].style.opacity = '1';
                    offset = i * +width.slice(0, width.length -2);
                    slidesField.style.transform = `translate(-${offset}px)`;
                    
                    slideIndex = i + 1;

                    if (slides.length < 10){
                        current.textContent = `0${slideIndex}`;
                    } else {
                        current.textContent = slideIndex;
                    }
                
                }
            });
        }
    })


    //____________________________________________}}}}}}}}}




    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWarapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width;
    });

    btnNext.addEventListener('click', () => {
        if(offset == +width.slice(0, width.length -2) * (slides.length - 1)){
            offset = 0
        } else {
            offset += +width.slice(0, width.length -2);
            
        }

        slidesField.style.transform = `translate(-${offset}px)`;
        
        hideGovno();
        dot[offset / +width.slice(0, width.length -2)].style.opacity = '1';

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        
        
    });

    btnPrev.addEventListener('click', () => {
        if(offset == 0){
            offset = +width.slice(0, width.length -2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length -2);
        }
        
        slidesField.style.transform = `translate(-${offset}px)`;

        hideGovno();
        dot[offset / +width.slice(0, width.length -2)].style.opacity = '1';

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });
    dot[offset].style.opacity = '1';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) =>{
        if(e.target && e.target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if(e.target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/time.js":
/*!********************************!*\
  !*** ./src/js/modules/time.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function time() {
    //TIME
	const deadLine = "2022-06-17";
	function getTimeRemaining(endTime)	{
		const t = Date.parse(endTime) - Date.parse(new Date()),
			  days = Math.floor(t / (1000 * 60 * 60 * 24)),
			  hours = Math.floor(t / (1000 * 60 * 60) % 24),
			  minutes = Math.floor((t / 1000 / 60) % 60),
			  seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(selector, endTime){
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  timeInterval = setInterval(updateClock, 1000);
		
		
		
    	function updateClock () {
			const t = getTimeRemaining(endTime);

			days.innerHTML = t.days;
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds; 

			if(t.total <= 0){
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadLine);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (time);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResoursce": () => (/* binding */ getResoursce),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
async function postData(url, data) {
    const res = await fetch(url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data
    });

    return await res.json();  
};

async function getResoursce (url) {
    const res = await fetch(url);

    return await res.json();
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_time__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/time */ "./src/js/modules/time.js");










window.addEventListener('DOMContentLoaded', () =>{
	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 30000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
	(0,_modules_time__WEBPACK_IMPORTED_MODULE_6__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map