var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.arrow-next',
        prevEl: '.arrow-prev',
    },
    breakpoints: {
        1120: {
            slidesPerView: 3,
        },
        769: {
            slidesPerView: 2,
        }
    },
})

$(document).ready(function () {
    $('.questions-block__title').click(function (event) {
        if ($('.questions-block').hasClass('onlyOneOp')) {
            $('.questions-block__title').not($(this)).removeClass('active')
            $('.questions-block__text').not($(this).next()).slideUp(300)
        }
        $(this).toggleClass('active').next().slideToggle(300)
    })
    $("#menu").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 800);
    });

})

ymaps.ready(function () {
    if (typeof ymaps === 'undefined') {
        return
    }

    var myMap = new ymaps.Map('ymap', {
            center: [55.991042, 37.217238],
            zoom: 17
        }, {
            searchControlProvider: 'yandex#search'
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            balloonContent: 'Савёлкинский пр., 4, Зеленоград'
        }, {
            iconLayout: 'default#image',
            iconImageSize: [35, 45],
            iconImageOffset: [-5, -38]
        });

    myMap.geoObjects.add(myPlacemark)
});


function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        goTopBtn.classList.add('active-top');
    }
    if (scrolled < coords) {
        goTopBtn.classList.remove('active-top');
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -30);
        setTimeout(backToTop, 0);
    }
}

var goTopBtn = document.querySelector('.to-top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);




const popupMenu = document.querySelector('.popup-menu'),
    body = document.querySelector('body')


let closestItemByClass = function (item, className) {
    let node = item
    while (node) {
        if (node.classList.contains(className)) {
            return node
        }
        node = node.parentElement
    }
    return null
}

let closestAttr = function (item, attr) {
    let node = item
    while (node) {
        let attrValue = node.getAttribute(attr)
        if (attrValue) {
            return attrValue
        }
        node = node.parentElement
    }
    return null
}

const showPopup = target => {
    target.classList.add('popup-active')
}

const closePopup = target => {
    target.classList.remove('popup-active')
}

let toggleScroll = () => {
    body.classList.toggle('no-scroll')
}

body.addEventListener('click', event => {
    const target = event.target
    const popupClass = closestAttr(target, 'data-popup')
    if (popupClass === null) {
        return
    }
    event.preventDefault()
    let popup = document.querySelector('.' + popupClass)
    if (popup) {
        showPopup(popup)
        toggleScroll()
    }
})

body.addEventListener('click', event => {
    let target = event.target
    if (target.classList.contains('popup-close') ||
        target.classList.contains('popup-inner')) {
        let popup = closestItemByClass(target, 'popup')
        closePopup(popup)
        toggleScroll()
    }
})

body.addEventListener('keydown', event => {
    if (event.keyCode !== 27) {
        return
    }

    let popup = document.querySelector('.popup-active')
    if (popup) {
        closePopup(popup)
        toggleScroll()
    }
})

let scroll = target => {
    let targetTop = target.getBoundingClientRect().top
    let scrollTop = window.pageYOffset
    let targetOffsetTop = targetTop + scrollTop
    let headerOffset = document.querySelector('.header').clientHeight
    window.scrollTo(0, targetOffsetTop - headerOffset)
}

body.addEventListener('click', event => {
    let target = event.target
    let scrollToItemClass = closestAttr(target, 'data-scroll-to')
    if (scrollToItemClass === null) {
        return
    }
    event.preventDefault()
    let scrollToItem = document.querySelector('.' + scrollToItemClass)
    if (scrollToItem) {
        scroll(scrollToItem)
    }
})

