import { closeModal, openModal } from './moduWindow'
import { posData } from './Services'

function forms(formSelecotor, modalTimerId, modalSelector) {


    const forms = document.querySelectorAll(formSelecotor)

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо мы с вами свяжемся',
        failure: 'Что то пошло не так'
    }

    forms.forEach(item => {
        bindposData(item)
    })



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
        openModal(modalSelector, modalTimerId)

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `
        document.querySelector('.modal').append(thanksModal)
        const modal__close = document.querySelector('[data-close]');
        modal__close.addEventListener('click', (ev) => {
            closeModal(modalSelector)
        })

        setTimeout(() => {

            thanksModal.remove()
            previosModaldialog.classList.add('show')
            previosModaldialog.classList.remove('hide')
            closeModal(modalSelector)
        }, 4000)
    }

}

export default forms;