import JsBarcode from 'jsbarcode';

function csvJSON(csv: string) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return result;
}

const input: HTMLInputElement = document.querySelector('input[type="file"]');
const main: HTMLElement = document.querySelector('main');

input.addEventListener('change', handleChange);

function handleChange({ target }: HTMLInputEvent) {
    const file = target.files[0];

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent) => {
        const labels: LabelInformation[] = csvJSON(reader.result as string);

        main.innerHTML = labels.map(getLabelHtml).join('');
        JsBarcode('.barcode').init();;
    };
    reader.readAsText(file);
}

function getLabelHtml({ name, barcode, price }: LabelInformation): string {
    const priceNumber = parseInt(price, 10);
    return `
        <article>
            ${
                barcode
                    ? `
                    <svg class="barcode"
                        jsbarcode-background="transparent"
                        jsbarcode-height="60"
                        jsbarcode-value="${barcode}"
                        jsbarcode-textmargin="0"
                        jsbarcode-fontoptions="bold">
                    </svg>
                    `
                    : ''
            }
            <p class="name">${name}</p>
            <p class="price">${formatter.format(priceNumber)}</p>
        </article>
    `;
}

const formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0
});

// MODELS
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface LabelInformation {
    name: string;
    barcode?: string;
    price: string;
}
