import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
public class GPTOutputParser {
    public static void readLine(String filename) throws IOException {
        try(BufferedReader br = new BufferedReader(new FileReader(Path.of(filename).toFile()))) {
            String line = br.readLine();
            while (line != null) {
                String result = parser(line);
                line = br.readLine();
            }
        }
    }


public static String parser(String line) {

        ArrayList<String> meetingQualities = new ArrayList<>();

//       Gson gson = new Gson();
//        JsonObject jsonObject = gson.fromJson(line, JsonObject.class);
//        String input = jsonObject.toString();
        String finalOut = "";
        // Add 2 very bad qualities
        meetingQualities.add("Harassment");
        meetingQualities.add("Disrespectful behavior");

        // Add 8 productive qualities
        meetingQualities.add("Active listening");
        meetingQualities.add("Clear communication");
        meetingQualities.add("Being punctual");
        meetingQualities.add("Respectful of others' opinions");
        meetingQualities.add("Providing constructive feedback");
        meetingQualities.add("Staying focused on the agenda");
        meetingQualities.add("Asking insightful questions");
        meetingQualities.add("Collaborating with others");



    ArrayList<String> temp = new ArrayList<>(Arrays.asList(line.split(":")));
        String name = temp.get(2).substring(3);
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
