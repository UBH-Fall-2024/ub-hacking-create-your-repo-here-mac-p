package comp.workforce.model;

public class ChatbotResponse {

    private String message;

    public ChatbotResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
