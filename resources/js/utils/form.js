export function handleChange(e, state, name) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;

    if (name) {
        state.setState(prevState => {
            let data = Object.assign(prevState[name], nextState);
            return { data };
        });
    } else {
        state.setState(nextState);
    }
}
