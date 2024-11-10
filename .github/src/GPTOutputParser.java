import java.io.*;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
public class GPTOutputParser {
    public static void writeStringToFile(String content, String filePath) throws IOException {
        // Use try-with-resources to automatically close the writer
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath, true))) {
            writer.write(content);
            writer.newLine();
        }
    }
    //reads in line by line and parses for a more readable string
    public static void readLine(String filename) throws IOException {
        String content = "";
        try(BufferedReader br = new BufferedReader(new FileReader(Path.of(filename).toFile()))) {
            String line = br.readLine();
            while (line != null) {
                content = parser(line);
                writeStringToFile(content,".github/src/Output/output.txt");
                line = br.readLine();
            }
        }
    }


    public static String parser(String line) {

        ArrayList<String> meetingQualities = new ArrayList<>();

        String finalOut = "";
        // Add 2 very bad qualities
        meetingQualities.add("Harassment");
        meetingQualities.add("Disrespectful behavior");

        // Add 8 productive qualities
        meetingQualities.add("Active listening");
        meetingQualities.add("Clear communication");
        meetingQualities.add("Problem solving");
        meetingQualities.add("Respectful of others' opinions");
        meetingQualities.add("Providing constructive feedback");
        meetingQualities.add("Staying focused on the agenda");
        meetingQualities.add("Asking insightful questions");
        meetingQualities.add("Collaborating with others");


        //creates the string that is more readable
        ArrayList<String> temp = new ArrayList<>(Arrays.asList(line.split(":")));
        String name = temp.get(1).substring(1);
        String output = line.substring(line.lastIndexOf("[") + 1, line.lastIndexOf("]"));
        ArrayList<String> wordList = new ArrayList<>(Arrays.asList(output.split(",")));
        finalOut += "Employee: " + name + '\n';
        finalOut += '\n';
        for (int i = 0; i < meetingQualities.size(); i++) {
            finalOut += meetingQualities.get(i) + ": " + wordList.get(i) + '\n';
        }
        System.out.println(finalOut);
        return finalOut;
    }

    public static void main(String[] args) throws IOException {
        try {readLine(".github/src/gptOutputString.txt");} catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}