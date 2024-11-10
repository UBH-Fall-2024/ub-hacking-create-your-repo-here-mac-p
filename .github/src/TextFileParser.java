import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class TextFileParser {
    public static void read(String filename) throws IOException {
        try(BufferedReader br = new BufferedReader(new FileReader(Path.of(filename).toFile()))) {
            String line = br.readLine(); // Read the first line
            String nextLine = br.readLine();
            while (nextLine != null) {
                //call the AI on it
                System.out.println(line);
                line = nextLine;
                nextLine = br.readLine();
                }
            }
        }
    }




