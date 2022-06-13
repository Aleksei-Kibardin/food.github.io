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

export default modal;

export {closeModal};
export {openModal}; 