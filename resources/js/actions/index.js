export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
// 카운터의 값을 올린다.

export function increment() {
    return {
        type: INCREMENT
    };
}
// 카운터의 값을 내린다
export function decrement() {
    return {
        type: DECREMENT
    };
}
