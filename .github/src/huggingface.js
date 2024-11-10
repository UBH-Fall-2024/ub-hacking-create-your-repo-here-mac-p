const { pipeline } = require('@huggingface/transformers');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

class GPTOutputParser {

    static async writeStringToFile(content, filePath) {
        try {
            await fs.promises.appendFile(filePath, content + '\n');
        } catch (error) {
            console.error("Error writing to file:", error);
        }
    }
//note
    static async readLine(filename) {
        try {
            const filePath = path.resolve(filename);
            const fileStream = fs.createReadStream(filePath, 'utf-8');

            const rl = require('readline').createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            for await (const line of rl) {
                const content = GPTOutputParser.parser(line);
                await GPTOutputParser.writeStringToFile(content, '/Users/olivervarney/IdeaProjects/MeetingMetric2/website/backend/uploads/output.txt');
            }
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }

    static parser(line) {
        const meetingQualities = [
            "Harassment",
            "Disrespectful behavior",
            "Active listening",
            "Clear communication",
            "Problem solving",
            "Respectful of others' opinions",
            "Providing constructive feedback",
            "Staying focused on the agenda",
            "Asking insightful questions",
            "Collaborating with others"
        ];

        const temp = line.split(":");
        const name = temp[1].trim();
        const output = line.substring(line.lastIndexOf("[") + 1, line.lastIndexOf("]"));
        const wordList = output.split(",");

        let finalOut = `Employee: ${name}\n\n`;
        for (let i = 0; i < meetingQualities.length; i++) {
            finalOut += `${meetingQualities[i]}: ${wordList[i]}\n`;
        }

        console.log(finalOut);
        return finalOut;
    }
}

async function main(filepath) {
    try {
        // Reset the file that the AI will be writing into
        await fs.promises.writeFile('gptOutputString.txt', '');

        // General model will be used to analyze the transcript for now, zero-shot classification is the type of task
        const pipe = await pipeline('zero-shot-classification');

        // Create a readable stream for the file
        const fileStream = fs.createReadStream(filepath, 'utf8');

        // Create a readline interface to read the file line by line
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Helps with \n
        });

        // Read each line and pass it to the AI
        for await (const line of rl) {
            // The AI generator, the first variable is the prompt (the line from the transcript) and the second is all the things that you want to analyze it on
            const out = await pipe(line, ['Harassment', 'Disrespectful', 'Active listening', 'Clear communication', 'Problem Solving', 'Respectful of others opinions', 'Providing constructive feedback', 'Staying focused on the agenda', 'Asking insightful questions', 'Collaborating with others']);

            // Turn the output from the AI into a string
            const stringRepresentation = JSON.stringify(out);

            // Send the string to the gptOutputString file
            await fs.promises.appendFile('gptOutputString.txt', stringRepresentation + '\n');

            console.log('Line written');
        }

        // After processing, start parsing the output
        await GPTOutputParser.readLine('gptOutputString.txt');

    } catch (error) {
        console.error("Error occurred:", error);
    }
}

module.exports = main;