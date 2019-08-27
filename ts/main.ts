import csv from 'csvtojson';

const input: HTMLInputElement = document.querySelector('input[type="file"]');
const main: HTMLElement = document.querySelector('main');

input.addEventListener('change', handleChange);

function handleChange({ target }: HTMLInputEvent) {
    const file = target.files[0];

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent) => {
        const labels: LabelInformation[] = await csv()
            .fromString(reader.result as string)
            .then((result: LabelInformation[]) => result);

        main.innerHTML = labels.map(getLabelHtml).join('');
    };
    reader.readAsText(file);
}

function getLabelHtml({ name, barcode, price }: LabelInformation): string {
    return `
        <article>
            <span>${barcode}</span>
            <p class="name">${name}</p>
            <p class="price">${formatter.format(parseInt(price, 10))}</p>
        </article>
    `;
}

const formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 2
});

// MODELS
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface LabelInformation {
    name: string;
    barcode: string;
    price: string;
}
