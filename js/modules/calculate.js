function calculate() {
    const result = document.querySelector('.calculating__result span')

    let sex, height, weight, age, ratio

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
    }



    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }

    }

    calcTotal()

    function getStaticInf(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`)
        elements.forEach(elem => {
            elem.classList.remove(activeClass)
        })
        elements.forEach(elem => {

            if (elem.getAttribute('data-ratio') === null) {
                elem.classList.remove(activeClass)
            }
            else if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            } else if (elem.getAttribute('data-ratio') == 1.2) {
                elem.classList.add(activeClass)
            }

            if (elem.getAttribute('id') === localStorage.getItem('sex') || elem.getAttribute('id') == sex) {
                elem.classList.add(activeClass)
            }
        })


        elements.forEach(elem => {
            elem.addEventListener('click', (ev) => {
                if (ev.target.getAttribute('data-ratio')) {
                    ratio = ev.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', ev.target.getAttribute('data-ratio'))
                } else {
                    sex = ev.target.getAttribute('id')
                    localStorage.setItem('sex', ev.target.getAttribute('id'))
                }


                elements.forEach(elem => {
                    elem.classList.remove(activeClass)

                })
                ev.target.classList.add(activeClass)
                calcTotal()

            })
        })
    }

    getStaticInf('#gender', 'calculating__choose-item_active')

    getStaticInf('.calculating__choose_big', 'calculating__choose-item_active')

    function getDynamInf(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {

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
            calcTotal()
        })

    }



    getDynamInf('#height')

    getDynamInf('#weight')

    getDynamInf('#age')
}

export default calculate;