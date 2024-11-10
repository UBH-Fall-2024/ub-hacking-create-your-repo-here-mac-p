const { pipeline } = require('@huggingface/transformers');
const fs = require('fs');
const readline = require('readline');


async function main() {
    try {
        await fs.promises.writeFile('gptOutputString.txt', '');


        const pipe = await pipeline('zero-shot-classification');

        // Create a readable stream for the file
        const fileStream = fs.createReadStream('transcripts/transcript.txt', 'utf8');

        // Create a readline interface to read the file line by line
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        // Read each line
        for await (const line of rl) {
            const out = await pipe(line, ['business strategy', 'customer service', 'team collaboration', 'technical improvement']);
            const stringRepresentation = JSON.stringify(out);

            // Append the result to the output file
            await fs.promises.appendFile('gptOutputString.txt', stringRepresentation + '\n');
            console.log('File has been written');
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

main();