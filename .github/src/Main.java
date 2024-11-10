import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            // Call the read method from TextFileParser with the correct filename
            TextFileParser.read(".github/src/transcripts/transcript.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
