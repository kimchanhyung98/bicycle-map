import { formatDigit } from '@/helpers/dateFormat';

export function timeOptions() {
    let options = [];

    for (let i = 0; i < 24; i++) {
        for (let s = 0; s < 60; s = s + 5) {
            let value = `${formatDigit(i)}:${formatDigit(s)}`;
            let option = {
                value: value,
                text: value
            };

            options.push(option);
        }
    }

    return options;
}
