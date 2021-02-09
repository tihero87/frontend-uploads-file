export function upload(selector, options = {}) {
    const input = document.querySelector(selector);
    const preview = document.createElement('div');

    preview.classList.add('preview');

    const open_btn = document.createElement('button');
    open_btn.classList.add('btn');
    open_btn.textContent = 'Открыть';

    if(options.multiple){
        input.setAttribute('multiple', true)
    }
    if(options.accept && Array.isArray(options.accept)){
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement("afterend", preview);
    input.insertAdjacentElement("afterend", open_btn);

    const triggerInput = () => input.click();

    const handleChange = (e) => {
        if(!e.target.files.length){
            return
        }
        const files = Array.from(e.target.files);
        preview.innerHTML = '';
        files.forEach(file => {
            if(!file.type.match('image')){
                return
            }

            const reader = new FileReader();

            reader.onload = ev => {
                const src = ev.target.result;
                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-image"> 
                        <div class="preview-remove">&times;</div>
                        <img src="${src}" alt="${file.name}" />
                    </div>
                `)
            };
            reader.readAsDataURL(file);
        })
    };

    open_btn.addEventListener('click', triggerInput);
    input.addEventListener('change', handleChange)
}