export function handleChange(e, state) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    state.setState(nextState);
}
