const { pipeline } = require('@huggingface/transformers');

async function main() {
    try {
        const pipe = await pipeline('summarization', 'Xenova/t5-small');
        const out = await pipe('this meeting is useless because we are talking about nonsense');

        console.log(out);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

main();