import csv from 'csvtojson';

const input: HTMLInputElement = document.querySelector('input[type="file"]');

input.addEventListener('change', handleChange);

function handleChange({ target }: HTMLInputEvent) {
    const file = target.files[0];

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
        csv()
            .fromString(reader.result as string)
            .then((result: LabelInformation[]) => {
                console.log(result);
            });
    };
    reader.readAsText(file);
}

// MODELS
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface LabelInformation {
    name: string;
    barcode: string;
    price: string;
}