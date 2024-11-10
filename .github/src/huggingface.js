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
            const out = await pipe(line, ['Harassment', 'Disrespectful', 'Active listening', 'Clear communication', 'Problem Solving', 'Respectful of others opinions', 'Providing constructive feedback', 'Staying focused on the agenda', 'Asking insightful questions' , 'Collaborating with others']);
            const stringRepresentation = JSON.stringify(out);

            // Append the result to the output file
            await fs.promises.appendFile('gptOutputString.txt', stringRepresentation + '\n');
            console.log('Line written');
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

main();