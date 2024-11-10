import java.io.*;
import java.net.*;
import com.sun.net.httpserver.*;

public class FileUploadServer {
    // Variable to store the contents of the uploaded text file
    private static String uploadedTextContent;

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/upload", new FileUploadHandler());
        server.setExecutor(null); // Use default executor
        server.start();
    }

    static class FileUploadHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equals(exchange.getRequestMethod())) {
                InputStream inputStream = exchange.getRequestBody();
                StringBuilder textContent = new StringBuilder();

                // Read the text file content
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        textContent.append(line).append("\n");
                    }
                }

                // Store the text content in a variable
                uploadedTextContent = textContent.toString();

                // Optionally, save the text content to a file
                String filename = "uploaded_file.txt";
                try (FileWriter writer = new FileWriter(filename)) {
                    writer.write(uploadedTextContent);
                }

                // Send a response back to the client
                String response = "Text file uploaded and stored successfully.";
                exchange.sendResponseHeaders(200, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
            }
        }
    }

    // Method to retrieve the uploaded text content (for use elsewhere in your program)
    public static String getUploadedTextContent() {
        return uploadedTextContent;
    }
}
