const fs = require('fs');
const path = require('path');

class GPTOutputParser {

    static async writeStringToFile(content, filePath) {
        try {
            await fs.promises.appendFile(filePath, content + '\n');
        } catch (error) {
            console.error("Error writing to file:", error);
        }
    }

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
                await GPTOutputParser.writeStringToFile(content, '.github/src/Output/output.txt');
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

(async () => {
    try {
        await GPTOutputParser.readLine('.github/src/gptOutputString.txt');
    } catch (error) {
        console.error("Error:", error);
    }
})();
