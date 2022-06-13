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

export default slider;