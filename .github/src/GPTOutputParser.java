import java.util.HashMap;
import java.util.Map;

public class GPTOutputParser {
    public static void main(String[] args) {
        String input = "";
        String output = "";
        HashMap<String, String> emotionList = new HashMap<>();
        for (Map.Entry<String, String> entry: emotionList.entrySet()){
            output += entry.getKey() + ": " + entry.getValue();
        }
    }

}
