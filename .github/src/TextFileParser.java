import java.io.*;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class TextFileParser {

    public static void read() throws IOException {
        // Set the starting path to the directory containing the text files (.github/website/backend/uploads)
        Path startPath = Paths.get("/Users/shubham_sharma/IdeaProjects/ub-hacking-create-your-repo-here-mac-p/website/backend/uploads/1731227608855-Untitled.txt");

        // Walk through the files in the directory
        Files.walkFileTree(startPath, new SimpleFileVisitor<>() {
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                // Check if the file is a .txt file
                if (file.toString().endsWith(".txt")) {
                    // Copy the content from the source text file to the new text file in the GitHub/src directory
                    copyTextContentToTextFile(file);
                }
                return FileVisitResult.CONTINUE;
            }
        });
    }

    private static void copyTextContentToTextFile(Path sourceTextFile) throws IOException {
        // Define the destination directory (GitHub/src) and the destination file name
        // This will create the copied text file in the GitHub/src directory
        Path destinationDirectory = Paths.get(".github/src");
        if (!Files.exists(destinationDirectory)) {
            // Create the directory if it doesn't exist
            Files.createDirectories(destinationDirectory);
        }

        // Set the destination file path
        Path destinationTextFile = destinationDirectory.resolve("combined_output.txt");

        // Open the source file for reading and the destination file for writing
        try (BufferedReader reader = new BufferedReader(new FileReader(sourceTextFile.toFile()));
             BufferedWriter writer = new BufferedWriter(new FileWriter(destinationTextFile.toFile()))) {

            String line;
            // Read each line from the source file and write it to the destination file
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();
            }
        }
    }

    public static void huggingface(String[] args) {
        try {
            Process process = new ProcessBuilder("/Users/shubham_sharma/Library/Application Support/JetBrains/IntelliJIdea2024.2/node/versions/22.11.0/bin/node", "huggingface.js")
                    .start();
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("Error executing Hugging Face Node.js script. Exit code: " + exitCode);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }


    public static void main(String[] args) {
        try {
            // Start the file processing
            read();
            huggingface(args);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
