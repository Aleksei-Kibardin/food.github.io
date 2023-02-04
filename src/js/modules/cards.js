import{getResoursce} from '../services/services'

function cards() {
    
	

	getResoursce("https://my-json-server.typicode.com/Aleksei-Kibardin/food.github.io/menu", {mode: 'cors'})
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

export default cards;