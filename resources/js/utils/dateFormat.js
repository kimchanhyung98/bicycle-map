export function formatYMD(date) {

}

export function formatKR(date) {
    date = date.split(' ');
    let splitDate = date[0].split('-');
    let splitTime = date[1].split(':');

    return `${splitDate[0]}년 ${splitDate[1]}월 ${splitDate[2]}일 ${splitTime[0]}시 ${splitTime[1]}분`;
}

export function formatDate(date, time) {
    if (!date) return null;

    let year = date.getFullYear();
    let month = formatDigit(date.getMonth() + 1);
    let day = formatDigit(date.getDate());

    return `${year}-${month}-${day} ${time}:00`;
}

export function formatNaturalDate(date) {
    if (!date) return new Date();

    date = date.split(' ');
    let splitDate = date[0].split('-');
    let splitTime = date[1].split(':');

    return new Date(splitDate[0], splitDate[1] - 1, splitDate[2], splitTime[0], splitTime[1], 0);
}

export function getTime(date) {
    if (!date) return '00:00';

    date = date.split(' ');
    let splitTime = date[1].split(':');

    return `${splitTime[0]}:${splitTime[1]}`;
}

export function formatDigit(date) {
    return date < 10 ? `0${date}` : date;
}
