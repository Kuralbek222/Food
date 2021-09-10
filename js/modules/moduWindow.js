



function moduWindow(triggerSelector, modalSelector, modalTimerId) {

    const btn__modal = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        modal__close = document.querySelector('[data-close]');



    btn__modal.forEach(btn => {

        btn.addEventListener('click', () => {

            openModal(modalSelector, modalTimerId)
        })
    })



    modal__close.addEventListener('click', (ev) => {
        closeModal(modalSelector)
    })

    // console.log(modal)

    modal.addEventListener('click', (ev) => {
        if (ev.target == modal) {
            closeModal(modalSelector)
        }
    })

    document.addEventListener('keydown', (ev) => {
        if (ev.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector)
        }
    })




    window.addEventListener('scroll', () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId)
        }
    }, { once: true })


    function showModalbyScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId)
            window.removeEventListener('scroll', showModalbyScroll)
        }
    }
    window.addEventListener('scroll', showModalbyScroll)

}

function openModal(modalSelector, modalTimerId) {
    let modal = document.querySelector(modalSelector)

    modal.classList.add('show')
    modal.classList.remove('hide')

    document.body.style.overflow = 'hidden'
    if (modalTimerId) {
        clearInterval(modalTimerId)
    }
}
function closeModal(modalSelector) {
    let modal = document.querySelector(modalSelector)

    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
}

export default moduWindow;

export { openModal };
export { closeModal };