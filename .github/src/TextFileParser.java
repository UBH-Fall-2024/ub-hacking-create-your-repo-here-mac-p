import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class TextFileParser {
    public static void read() throws IOException {
        Path startPath = Paths.get(".github/website/backend/uploads");

        Files.walkFileTree(startPath, new SimpleFileVisitor<>() {
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                if (file.toString().endsWith(".pdf")) {
                    copyPdfContentToTextFile(file);
                }
                return FileVisitResult.CONTINUE;
            }
        });
    }

    private static void copyPdfContentToTextFile(Path pdfPath) throws IOException {
        Path textFilePath = Paths.get(pdfPath.toString().replace(".pdf", ".txt"));
        try (BufferedReader reader = new BufferedReader(new FileReader(pdfPath.toFile()));
             BufferedWriter writer = new BufferedWriter(new FileWriter(textFilePath.toFile()))) {

            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();
            }
        }
    }
}
