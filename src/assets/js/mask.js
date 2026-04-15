import IMask from 'imask';

export const maskOptions = {
    mask: '+{7} (000) 000-00-00',
    prepare: (str, masked) => {
        const ch = String(str);
        if (!masked.value && ch === "8") return "7";
        return ch;
    }
};

export const setMask = (element, options = maskOptions) => {
    for (let mask of window.imasks) {
        if (mask.phoneEl === element) {
            return mask.mask;
        }
    }

    const mask = IMask(element, options);
    window.imasks.push({ element, mask });

    return mask;
}

document.addEventListener('DOMContentLoaded', (e) => {
    const phoneElements = document.querySelectorAll('[data-mask-phone]');
    window.imasks = [];
    phoneElements.forEach(phoneEl => {
        const mask = setMask(phoneEl);
        window.imasks.push({ phoneEl, mask });
    });
});