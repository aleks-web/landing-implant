import { setMask } from "./mask.js";
import sender from "./sender.js";

export default class Modal {
    static #modalSelector;
    static beforeOpenModalGlobalCallback = () => {};

    static getOriginalModals() {
        return document.querySelectorAll(Modal.#modalSelector);
    }

    static getFakeModals() {
        return document.querySelectorAll('.modal-wrapper');
    }

    static closeBg() {
        const bg = document.getElementById('modal-bg');
        bg?.fadeOut(500, () => {
            bg.remove();
        });
    }

    static init(modalSelector) {
        this.#modalSelector = modalSelector;
        Modal.getOriginalModals().forEach(e => {
            e.style.display = 'none';
        });

        this.#setCloseListener();
    }

    static #setCloseListener() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-wrapper')) {
                Modal.closeAllModal();
            }
        });
    }

    static #createBg(colorBg = 'black') {
        const bg = document.createElement('div');
        bg.setAttribute('id', 'modal-bg');
        bg.style.width = '100%';
        bg.style.height = '100%';
        bg.style.backgroundColor = colorBg;
        bg.style.position = 'fixed';
        bg.style.justifyContent = 'center';
        bg.style.alignItems = 'center';
        bg.style.top = '0';
        bg.style.left = '0';
        bg.style.display = 'none';
        bg.style.zIndex = Modal.#getMaxZIndex() + 10;
        return bg;
    }

    static openModal({ modalElement, duration = 400, opacityBg = 0.4, colorBg = 'black', beforeOpenCallback = () => {  } }) {
        Modal.openBg(duration, opacityBg, colorBg);

        let modal = modalElement.cloneNode(true);
        modal = Modal.#prepareModal(modal);
        Modal.beforeOpenModalGlobalCallback(modal);
        beforeOpenCallback(modal);
        document.body.appendChild(modal);
        modal.fadeIn(duration, 1, 'flex');

        Modal.#disableScroll();
    }

    static openBg(duration, opacityBg, colorBg) {
        const bg = Modal.#createBg(colorBg);
        document.body.appendChild(bg);
        bg.fadeIn(duration, opacityBg, 'flex');
    }

    static #prepareModal(modal) {
        const bgModal = document.createElement('div');

        bgModal.style.display = 'none';
        bgModal.style.position = 'fixed';
        bgModal.style.justifyContent = 'center';
        bgModal.style.alignItems = 'center';
        bgModal.style.top = '0';
        bgModal.style.left = '0';
        bgModal.style.width = '100%';
        bgModal.style.height = '100%';
        bgModal.style.backgroundColor = 'transparent';
        bgModal.classList.add('modal-wrapper');
        bgModal.style.zIndex = Modal.#getMaxZIndex() + 10;

        modal.style.display = 'flex';
        modal.style.margin = '0 auto';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        bgModal.appendChild(modal);

        return bgModal;
    }

    static closeAllModal() {
        Modal.getFakeModals().forEach(modal => {
            const modalWrapper = modal.closest('.modal-wrapper');
            modalWrapper.fadeOut(300, () => {
                modal.remove();
            });
        });
        Modal.closeBg();
        Modal.#enableScroll();
    }

    static #getMaxZIndex() {
        let maxZIndex = 0;
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            const zIndex = window.getComputedStyle(element).zIndex;
            if (!isNaN(zIndex) && zIndex !== 'auto') {
                maxZIndex = Math.max(maxZIndex, parseInt(zIndex, 10));
            }
        });
        return Number(maxZIndex);
    }

    static #disableScroll() {
        document.body.disableScroll();
    }

    static #enableScroll() {
        document.body.enableScroll();
    }
}

document.addEventListener('DOMContentLoaded', () => {

    Modal.beforeOpenModalGlobalCallback = (modal) => {
        const phoneEl = modal.querySelector('[data-mask-phone]');
        if (phoneEl) {
            setMask(phoneEl);
        }

        modal.querySelectorAll('form').forEach(form => {
            const phone = form.querySelector('[data-mask-phone]');

            form.onsubmit = async (e) => {
                e.preventDefault();

                const result = { phone: clearPhone(phone.value) };

                try {
                    sender(result);
                    modal.classList.add('modal-wrapper--loading');
                } catch (e) {
                    modal.classList.remove('modal-wrapper--loading');
                }
            }
        });
    }

    Modal.init('.modal');

    window.openModal = async (modalSelector) => {
        const Modals = (await import('/src/assets/js/modal.js')).default;
        const modal = document.querySelector(modalSelector);
        Modals.openModal({ modalElement: modal });
    }

    window.closeAllModals = async () => {
        const Modals = (await import('/src/assets/js/modal.js')).default;
        Modals.closeAllModal();
    }
});