const { pipeline } = require('@huggingface/transformers');

async function main() {
    try {
        const textGenerator = await pipeline('text-generation', model='warrencain/Business_Consulting_Finetune_Llama_3.1_8b');
        const output = await textGenerator("Prompt: Write a blog post about the benefits of using AI in business.");
        console.log(output[0].generated_text);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

main();