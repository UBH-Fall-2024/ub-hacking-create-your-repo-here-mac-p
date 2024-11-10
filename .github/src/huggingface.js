const { pipeline } = require('@huggingface/transformers');
const fs = require('fs');
const readline = require('readline');


async function main() {
    try {
        //resets the file that the AI will be writing into
        await fs.promises.writeFile('gptOutputString.txt', '');

        //general model will be used to analyze the transcript for now, zero shot classification is the type of task
        const pipe = await pipeline('zero-shot-classification');

        // creates a readable stream for the file
        const fileStream = fs.createReadStream('transcripts/transcript.txt', 'utf8');

        // creates a readline interface to read the file line by line
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity //helps with \n
        });

        // Read each line and pass it to the AI
        for await (const line of rl) {

            //the AI generator, the first variable is the prompt (the line from the transcript) and the second is all the things that you want to analyze it on
            const out = await pipe(line, ['Harassment', 'Disrespectful', 'Active listening', 'Clear communication', 'Problem Solving', 'Respectful of others opinions', 'Providing constructive feedback', 'Staying focused on the agenda', 'Asking insightful questions' , 'Collaborating with others']);

            //turns the output from the AI into a string
            const stringRepresentation = JSON.stringify(out);

            // sends the string to the gptOutputString file
            await fs.promises.appendFile('gptOutputString.txt', stringRepresentation + '\n');
            
            console.log('Line written');
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

main();