// burger

const burger = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.header__nav');
const body = document.querySelector('.body');
burger.addEventListener('click', function(){
    burger.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    body.classList.toggle('lock');
});
// tabs
$(document).ready(function(){
    $('.slider').slick();
});
function tabs(tabsWrapSelector, tabSelector, contentSelector, activeContent, activeTab) {
    const tabs = document.querySelector(tabsWrapSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    function showContent(i = 0) {
        content[i].classList.add(activeContent, 'animated', 'fadeIn');
        tab[i].classList.add(activeTab);
    };

    function hideContent() {
        content.forEach(item => {
            item.classList.remove(activeContent, 'fadeIn');
        });
        tab.forEach(item => {
            item.classList.remove(activeTab);
        })
    };

    hideContent();
    showContent();

    tabs.addEventListener('click', (e) => {
        if (e.target.classList.contains(tabSelector.replace(/\./, ''))){
            tab.forEach((item, i) => {
                if (e.target == item) {
                    hideContent();
                    showContent(i);
                }
            })
        }
    })
};
window.addEventListener('DOMContentLoaded', () => {
    tabs('.tab__wrap', '.tab', '.tab__content', 'active-content', 'active-tab');
});
// popup
const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');
const timeout = 800;

let unlock = true;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if(!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++){
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock')
        }
    }, timeout);
    unlock = false;
    setTimeout(function (){
        unlock = true;
    }, timeout);
}


