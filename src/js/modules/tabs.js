function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClaas) {
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClaas);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClaas);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) =>{
        if(e.target && e.target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) =>{
                if(e.target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;