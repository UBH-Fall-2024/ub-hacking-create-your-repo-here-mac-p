const { pipeline } = require('@huggingface/transformers');

async function main() {
    try {
        const pipe = await pipeline('zero-shot-classification');
        const out = await pipe('This is coming from a business meeting about helping customers: "John: we should be nice to customers"', ['business strategy', 'customer service', 'team collaboration', 'technical improvement'])

        console.log(out);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

main();