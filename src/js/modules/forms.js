import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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
 
			postData('http://localhost:3000/requests', json )
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
		openModal('.modal', modalTimerId);

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
			closeModal('.modal');
		}, 4000);
	}
}

export default forms;