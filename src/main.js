import "./assets/js/utils.js";
import "./assets/js/mask.js";
import "./assets/js/splide.js";
import "./assets/js/quiz.js";
import "./assets/js/modal.js";
import "./scss/index.scss";
import "./assets/js/components/agree.js";

document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('fetchLeadSuccess', async (e) => {
        document.querySelector('.loading')?.remove();
        const modal = document.querySelector('.modal-wrapper--loading');
        if (modal) {
            modal.classList.remove('modal-wrapper--loading');
            await closeAllModals();
            await openModal('.modal-success');
        } else {
            await openModal('.modal-success');
        }

        // setTimeout(() => {
        //     window.location.reload();
        // }, 3000);
    });

});