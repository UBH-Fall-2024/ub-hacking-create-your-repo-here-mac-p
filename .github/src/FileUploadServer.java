import java.io.*;
import java.net.*;
import com.sun.net.httpserver.*;


public class FileUploadServer {
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
                String filename = "uploaded_file.pdf";

                // Write the uploaded file to the local filesystem
                try (FileOutputStream fileOutputStream = new FileOutputStream(filename)) {
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = inputStream.read(buffer)) != -1) {
                        fileOutputStream.write(buffer, 0, bytesRead);
                    }
                }

                // Define the response message
                String response = "File uploaded successfully";

                // Send response headers and response body
                exchange.sendResponseHeaders(200, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                // Handle other HTTP methods if needed
                exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
            }
        }
    }
}