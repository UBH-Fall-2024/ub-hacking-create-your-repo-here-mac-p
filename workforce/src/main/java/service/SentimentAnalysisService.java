package comp.workforce.service;

import org.springframework.stereotype.Service;

@Service
public class SentimentAnalysisService {

    public String analyzeSentiment(String transcript) {
        // Use your fine-tuned model or API to analyze sentiment
        // Example: return some sentiment analysis logic based on the transcript
        return "Positive"; // Placeholder sentiment
    }
}
