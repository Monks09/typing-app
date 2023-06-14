export const createPrompt = () => {
    const chars = ["a", "s", "d", "f", "j", "k", "l", ";"];

    let prompt = "";

    for (let i = 0; i < 5; i++) {
        let word = "";
        for (let j = 0; j < 4; j++) {
            let x = Math.floor(Math.random() * 8);
            word = word + chars[x];
        }

        prompt = prompt + word + " ";
    }

    prompt = prompt.trim();
    return prompt;
}