function slider({ container, slideCon, slideBtnNextCon, slideBtnPrevCon, toTalCon, CurrCon, dotsSlider, slideFieldCon }) {

    const slides = slideCon,
        slideWrapper = container,
        slideField = slideFieldCon,
        slideWidth = window.getComputedStyle(slideWrapper).width,
        toTal = toTalCon,
        Curr = CurrCon,
        slideBtnNext = slideBtnNextCon,
        slideBtnPrev = slideBtnPrevCon

    ///// dots

    const slider = dotsSlider
    const indicators = document.createElement('ol')
    indicators.classList.add('carousel-indicators')
    slider.style.position = 'relative'
    slider.append(indicators)


    const dots = []

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




    slides.forEach(slide => {
        slide.style.width = slideWidth



    })

    slideField.style.width = 100 * slides.length + '%'
    slideField.style.display = 'flex'
    slideField.style.transition = '0.5s all'


    slideWrapper.style.overflow = 'hidden'

    let offset = 0
    let slideIndex = 1


    if (slides.length < 10) {
        toTal.textContent = `0${slides.length}`
        Curr.textContent = `0${slideIndex}`
    } else {
        toTal.textContent = slides.length
        Curr.textContent = slideIndex
    }

    function replaceForDigital(int) {
        return +int.replace(/\D/g, '')
    }



    slideBtnNext.addEventListener('click', (ev) => {

        if (offset == +replaceForDigital(slideWidth) * (slides.length - 1)) {
            offset = 0
            slideIndex = 1;
        } else {
            offset += +replaceForDigital(slideWidth)
            slideIndex++;
        }
        slideField.style.transform = `translateX(-${offset}px)`
        console.log(slides.length)
        if (slides.length < 10) {
            toTal.textContent = `0${slides.length}`
            Curr.textContent = `0${slideIndex}`
        } else {
            toTal.textContent = slides.length
            Curr.textContent = slideIndex
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = '1'

    })




    slideBtnPrev.addEventListener('click', (ev) => {
        if (offset == 0) {
            offset += +replaceForDigital(slideWidth) * (slides.length - 1)
            slideIndex = slides.length
        } else {
            offset -= +replaceForDigital(slideWidth)
            slideIndex--;
            //  console.log()
        }
        slideField.style.transform = `translateX(-${offset}px)`
        if (slides.length < 10) {
            toTal.textContent = `0${slides.length}`
            Curr.textContent = `0${slideIndex}`
        } else {
            toTal.textContent = slides.length
            Curr.textContent = slideIndex
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = '1'

    })
    dots.forEach(dot => {
        dot.addEventListener('click', (ev) => {
            const dotsTo = ev.target.getAttribute('data-lide-to')
            offset = +replaceForDigital(slideWidth) * (dotsTo - 1)
            slideIndex = dotsTo
            slideField.style.transform = `translateX(-${offset}px)`

            dots.forEach(dot => dot.style.opacity = '.5')
            dots[slideIndex - 1].style.opacity = '1'

        })
    })

}

export default slider;