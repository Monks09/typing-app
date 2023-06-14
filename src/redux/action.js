import { createPrompt } from "../utils"

export const generatePromptThunkActionCreator = () => {
    return (dispatch, getState) => {

        let prompt = createPrompt();
        dispatch({
            type: "SET_CURRENT_PROMPT",
            payload: prompt,
        });
    }
}