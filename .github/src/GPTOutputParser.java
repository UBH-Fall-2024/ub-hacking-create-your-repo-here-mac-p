import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;


public class GPTOutputParser {
    //reads file from the AI in line by line and sends it to a parser that will interpret the results
    public static void readLine(String filename) throws IOException {
        try(BufferedReader br = new BufferedReader(new FileReader(Path.of(filename).toFile()))) {
            String line = br.readLine();
            while (line != null) {
                //calls the parsing function
                parser(line);
                //skips to the next line
                line = br.readLine();
            }
        }
    }


public static String parser(String line) {

        ArrayList<String> meetingQualities = new ArrayList<>();

        //the final output string that will hold the results
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


//gets the information from the input line passed in by the AI and adds the information to a more readable string
    ArrayList<String> temp = new ArrayList<>(Arrays.asList(line.split(":")));
        String name = temp.get(1).substring(1);
        String output = line.substring(line.lastIndexOf("[") + 1, line.lastIndexOf("]"));
        ArrayList<String> wordList = new ArrayList<>(Arrays.asList(output.split(",")));
        finalOut += "Employee: " + name + '\n';
        finalOut += '\n';
        for (int i = 0; i < meetingQualities.size(); i++) {
            finalOut += meetingQualities.get(i) + ": " + wordList.get(i) + '\n';
        }

        //prints the final output
    System.out.println(finalOut);
        return finalOut;
    }

    public static void main(String[] args) throws IOException {
    try {readLine(".github/src/gptOutputString.txt");} catch (IOException e) {
        throw new RuntimeException(e);
    }

    }
}
