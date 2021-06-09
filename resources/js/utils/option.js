import { formatDigit } from '@/utils/dateFormat';

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

export function difficultyOptions() {
    let options = [
        {
            value: 'beginner',
            text: '초보자'
        },
        {
            value: 'intermediate',
            text: '중급자'
        },
        {
            value: 'advanced',
            text: '숙련자'
        }
    ];

    return options;
}


export function altitudeOptions() {
    let options = [
        {
            value: 'flat',
            text: '평지'
        },
        {
            value: 'uphill',
            text: '업힐'
        },
        {
            value: 'mountain',
            text: '산'
        }
    ];

    return options;
}
