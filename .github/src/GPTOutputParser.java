import java.util.ArrayList;
import java.util.Arrays;

public class GPTOutputParser {
    public String parser(String input){}
    public static void main(String[] args) {
        ArrayList<String> meetingQualities = new ArrayList<>();
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
        String output = "";
            output = output.substring(output.lastIndexOf("[")+1, output.lastIndexOf("]")-1);
            ArrayList<String> wordList = new ArrayList<>(Arrays.asList(output.split(",")));
            for (int i = 0; i <= meetingQualities.size(); i++){
                finalOut += meetingQualities.get(i) + ":" + wordList.get(i) +"/n";
            }
        }
    }
