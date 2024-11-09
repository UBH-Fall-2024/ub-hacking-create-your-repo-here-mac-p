const { pipeline } = require('@huggingface/transformers');

async function main() {
    try {
        const summarizer = await pipeline('summarization', 't5-base');
        const summary = await summarizer("This is the input text");
        console.log(summary[0].summary_text);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

main();