document.addEventListener('DOMContentLoaded', (e) => {
    document.addEventListener('click', (e) => {
        const ag = e.target.closest('.agree');
        const input = ag?.querySelector('[type="checkbox"]');

        if (!ag) { return }
        if (e.target.closest('a')) { return; }

        if (input.checked) {
            input.checked = false;
            ag.classList.remove('active');
        } else {
            input.checked = true;
            ag.classList.add('active');
        }

        input.dispatchEvent(new Event('input'));
    });
});