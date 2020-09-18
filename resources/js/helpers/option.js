import { formatDigit } from '@/helpers/dateFormat';

export function timeOptions() {
    let options = [];

    for (let i = 0; i < 24; i++) {
        for (let s = 0; s < 60; s = s + 5) {
            let option = `${formatDigit(i)}:${formatDigit(s)}`;

            options.push(option);
        }
    }

    return options;
}
