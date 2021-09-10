"use sticrt"

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabscontent = document.querySelectorAll('.tabcontent'),
        tabsparent = document.querySelector('.tabheader__items');


    function hideTabcontent() {
        tabscontent.forEach(item => {

            item.classList.add('hide',)
            item.classList.remove('show', 'fade')
        });


        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTABContent(i = 0) {
        tabscontent[i].classList.add('show', 'fade')
        tabscontent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')

    }
    hideTabcontent()
    showTABContent()

    tabsparent.addEventListener('click', (ev) => {
        const target = ev.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabcontent()
                    showTABContent(i)
                }
            })
        }
    })



    // Function for Date

    const Deadline = '2021-9-20';




    function getRemainingTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);


        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const t = getRemainingTime(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setClock('.timer', Deadline)


    // Modal

    const btn__modal = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
    // modal__close = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show')
        document.body.style.overflow = 'hidden'
        clearTimeout(modalTimerId)
    }

    btn__modal.forEach(btn => {

        btn.addEventListener('click', () => {

            openModal()
        })
    })

    function closeModal() {
        modal.classList.toggle('show')
        document.body.style.overflow = ''
    }

    // modal__close.addEventListener('click', (ev) => {
    //     closeModal()
    // })


    modal.addEventListener('click', (ev) => {
        if (ev.target == modal || ev.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })

    document.addEventListener('keydown', (ev) => {
        if (ev.code === "Escape" && modal.classList.contains('show')) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 50000);


    window.addEventListener('scroll', () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
        }
    }, { once: true })


    // function showModalbyScroll(){  
    //         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
    //             openModal()
    //             window.removeEventListener('scroll', showModalbyScroll)
    //         }
    // }
    // window.addEventListener('scroll', showModalbyScroll)



    // template function with class




    //    axios.get('http://192.168.43.143:3000/menu')
    //     .then(datases => {
    //                        datases.data.forEach(({altimg, img,title,descr,price}) => {
    //                 new MenuCard(img, altimg,title,descr,price,'.menu .container').render()
    //             })
    //     })

    //############## Another for build tab menu  ##################

    //     getResurses('http://192.168.12.126:3000/menu')
    //     .then(data => createCard(data))
    //     function createCard(data){
    //         data.forEach(({altimg, img,title,descr,price}) => {

    //         const element = document.createElement('div')

    //         element.classList.add('menu__item')

    //         price = price*27

    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //         `
    //         document.querySelector('.menu .container').append(element)
    //     })
    // }






    const forms = document.querySelectorAll('form')

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо мы с вами свяжемся',
        failure: 'Что то пошло не так'
    }

    forms.forEach(item => {
        bindposData(item)
    })


    const posData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        return await res.json()

    }
    function bindposData(form) {
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto
            S`
            form.insertAdjacentElement('afterend', statusMessage)
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            posData('http://192.168.12.126:3000/requests', json)
                .then(data => {
                    console.log(data)

                    showThanksModal(message.success)
                    statusMessage.remove()

                }).catch(() => {
                    showThanksModal(message.failure)
                }).finally(() => {
                    form.reset()
                })
        });

    }


    function showThanksModal(message) {
        const previosModaldialog = document.querySelector('.modal__dialog')


        previosModaldialog.classList.add('hide')
        openModal()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>

        `
        document.querySelector('.modal').append(thanksModal)

        setTimeout(() => {
            thanksModal.remove()
            previosModaldialog.classList.add('show')
            previosModaldialog.classList.remove('hide')
            closeModal()
        }, 4000)
    }




    // ####################### slider #############################




    // ##############SLIDER WITH TEACHER##########################




    const slides = document.querySelectorAll('.offer__slide')

    const slideBtnPrev = document.querySelector('.offer__slider-prev')
    const slideBtnNext = document.querySelector('.offer__slider-next')
    const slideWrapper = document.querySelector('.offer__slider-wrapper')
    const slideField = document.querySelector('.offer__slider-inner')
    const slideWidth = window.getComputedStyle(slideWrapper).width

    const slider = document.querySelector('.offer__slider')
    const indicators = document.createElement('ol')
    indicators.classList.add('carousel-indicators')
    slider.style.position = 'relative'
    slider.append(indicators)

    const Curr = document.getElementById('current')
    const toTal = document.getElementById('total')
    const dots = []

    let slideIndex = 1;
    let offset = 0;

    console.log(slides.length)

    slideField.style.width = 100 * slides.length + '%';
    slideField.style.display = 'flex'
    slideField.style.transition = '0.5s all'

    slideWrapper.style.overflow = 'hidden'
    ///////////////////////////############### for Dot ###############///////////////////////////
    for (let i = 0; i < slides.length; i++) {

        const dot = document.createElement('li')
        dot.setAttribute('data-lide-to', i + 1)
        dot.classList.add('dot')
        indicators.append(dot)

        if (i == 0) {
            dot.style.opacity = 1
        }

        dots.push(dot)
    }
    ///////////////////////////############### for Dot ###############///////////////////////////

    slides.forEach(slide => {
        slide.style.width = slideWidth;
    })

    if (slides.length < 10) {
        toTal.textContent = `0${slides.length}`
        Curr.textContent = `0${slideIndex}`
    } else {
        toTal.textContent = slides.length
        Curr.textContent = slideIndex
    }

    slideBtnNext.addEventListener('click', () => {
        if (offset == +slideWidth.slice(0, slideWidth.length - 2) * (slides.length - 1)) { //'500px'

            offset = 0
        } else {
            offset += +slideWidth.slice(0, slideWidth.length - 2)
        }

        slideField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++;
        }
        if (slides.length < 10) {
            Curr.textContent = `0${slideIndex}`
        } else {
            Curr.textContent = slideIndex
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = '1'

    })

    slideBtnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +slideWidth.slice(0, slideWidth.length - 2) * (slides.length - 1)
        } else {
            offset -= +slideWidth.slice(0, slideWidth.length - 2)
        }

        slideField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--;
        }
        if (slides.length < 10) {
            Curr.textContent = `0${slideIndex}`
        } else {
            Curr.textContent = slideIndex
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = '1'
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (ev) => {
            const slideTo = ev.target.getAttribute('data-lide-to')

            slideIndex = slideTo
            offset = +slideWidth.slice(0, slideWidth.length - 2) * (slideTo - 1)
            slideField.style.transform = `translateX(-${offset}px)`

            if (slides.length < 10) {
                Curr.textContent = `0${slideIndex}`
            } else {
                Curr.textContent = slideIndex
            }

            dots.forEach(dot => dot.style.opacity = '.5')
            dots[slideIndex - 1].style.opacity = '1'

        })
    })



    /////////#############################################////////////////////////////





    // showSlides(slideIndex)

    // if (slides.length < 10){
    //     toTal.textContent = `0${slides.length}`
    // }else {
    //     toTal.textContent = slides.length
    // }

    // function showSlides(n){
    //     if(n > slides.length){
    //         slideIndex = 1 
    //     }

    //     if(n < 1){
    //         slideIndex = slides.length
    //     }

    //     slides.forEach(item => item.style.display = 'none')

    //     slides[slideIndex - 1].style.display ='block';

    //     if (slides.length < 10){
    //         Curr.textContent = `0${slideIndex}`
    //     }else {
    //         Curr.textContent = slideIndex
    //     }


    // }
    //     function plusSlides(n){
    //         showSlides(slideIndex += n)
    //     }

    //    slideBtnPrev.addEventListener('click', () => {
    //         plusSlides(-1)
    //    })

    //    slideBtnNext.addEventListener('click', () => {
    //     plusSlides(+1)
    //    })




    // ####### winodow.load #######



    ///////////////////////////////////////////







    const selectContainer = document.querySelector('[data-container]');
    let arrMenu = [{
        menuTitle_con: `Меню "Фитнес"`,
        menuitemdesc_con: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
    Продукт активных и  здоровых людей. Это абсолютно новый продукт с оптимальной ценой и 
    высоким качеством!`,
        menutotal_con: `<span>229</span> грн/день</div>`,
        menuIMG_src: `img/tabs/vegy.jpg`,
        menuImgAlt: `"vegy"`
    },

    {
        menuTitle_con: `Меню “Премиум”`,
        menuitemdesc_con: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и
     качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню 
      без похода в ресторан!`,
        menutotal_con: `<span>550</span> грн/день</div>`,
        menuIMG_src: `img/tabs/elite.jpg`,
        menuImgAlt: `"elite"`
    },

    {
        menuTitle_con: `Меню "Постное"`,
        menuitemdesc_con:
            `Меню “Постное” - это тщательный подбор ингредиентов: полное
      отсутствие продуктов животного происхождения, молоко из миндаля, овса, 
     кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        menutotal_con: `<span>430</span> грн/день</div>`,
        menuIMG_src: `img/tabs/post.jpg`,
        menuImgAlt: `"post"`
    }]





    class MenuElemcreate {
        constructor(arrMenu, selectContainer) {
            this.arrMenu = arrMenu
            this.selectContainer = selectContainer

        }
        createElforMenu() {

            let arr_name = [1, 2, 3, 4, 5, 6]

            let Arr_El_menu = arr_name.map(function (name) {
                return name = document.createElement('div');
            });
            //   console.log(Arr_El_menu) 
            let [menuItem, menuitemdesc, menuitemdivider, menuprice, menucost, menutotal] = Arr_El_menu
            let menuIMG = document.createElement('img')
            let menuTitle = document.createElement('h3')
            this.menuTitle = menuTitle
            this.menuitemdesc = menuitemdesc
            this.menutotal = menutotal
            this.menuIMG = menuIMG
            // ?////////////////////////
            this.selectContainer.append(menuItem)
            menuItem.append(menuIMG)
            menuItem.append(menuTitle)
            menuItem.append(menuitemdesc)
            menuItem.append(menuitemdivider)
            menuItem.append(menuprice)
            menuprice.append(menucost)
            menuprice.append(menutotal)
            // menutotal.append(menuCostSpan)
            menuTitle.classList.add('menu__item-subtitle')
            menuItem.classList.add('menu__item')
            menuitemdesc.classList.add('menu__item-descr')
            menuitemdivider.classList.add('menu__item-divider')
            menuprice.classList.add('menu__item-price')
            menucost.classList.add('menu__item-cost')
            menutotal.classList.add('menu__item-total')

            menucost.innerHTML = `Цена`
        }

    }

    // //////////////////////////////

    class MenuCreate extends MenuElemcreate {
        constructor() {
            super(arrMenu, selectContainer)


        }

        createDivforMenu() {
            this.arrMenu.forEach(item => {
                this.createElforMenu()
                this.menuTitle.innerHTML = item.menuTitle_con
                this.menuitemdesc.innerHTML = item.menuitemdesc_con
                this.menutotal.innerHTML = item.menutotal_con
                this.menuIMG.setAttribute("alt", item.menuImgAlt)
                this.menuIMG.src = item.menuIMG_src
                //    console.log(this.menuIMG)
            })

        }
    }



    const menuDiv = new MenuCreate(arrMenu, selectContainer)

    menuDiv.createDivforMenu()

});