const initialState = {
    current_prompt: "",
    wpm: 0,
    keys_pressed: 0,
    accuracy: 0,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_PROMPT":
            return {
                ...state,
                current_prompt: action.payload,
            }

        default:
            return state;
    }
}

export default reducer;