const { pipeline } = require('@huggingface/transformers');

async function main() {
    try {

        const fs = require('fs');

        const pipe = await pipeline('zero-shot-classification');
        const out = await pipe('This is coming from a business meeting about helping customers: "John: I hate our customers!"', ['business strategy', 'customer service', 'team collaboration', 'technical improvement'])

        const stringRepresentation = JSON.stringify(out);
        fs.appendFile('gptOutputString.txt', stringRepresentation + '\n', (err) => {
            if (err) throw err;
            console.log('File has been written');
        })

        console.log(out);

    } catch (error) {
        console.error("Error occurred:", error);
    }
}

main();