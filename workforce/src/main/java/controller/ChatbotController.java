package comp.workforce.controller;

import comp.workforce.service.SentimentAnalysisService;
import comp.workforce.service.TextSummarizationService;
import comp.workforce.service.FeedbackPlotService;
import comp.workforce.service.GCSService;
import comp.workforce.model.ChatbotResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Autowired
    private SentimentAnalysisService sentimentAnalysisService;

    @Autowired
    private TextSummarizationService textSummarizationService;

    @Autowired
    private FeedbackPlotService feedbackPlotService;

    @Autowired
    private GCSService gcsService;

    // Endpoint for sentiment analysis
    @PostMapping("/sentiment")
    public ChatbotResponse analyzeSentiment(@RequestBody String transcript) {
        String sentiment = sentimentAnalysisService.analyzeSentiment(transcript);
        return new ChatbotResponse(sentiment);
    }

    // Endpoint for text summarization
    @PostMapping("/summarize")
    public ChatbotResponse summarizeText(@RequestBody String transcript) throws IOException {
        String summary = textSummarizationService.summarizeText(transcript);
        return new ChatbotResponse(summary);
    }

    // Endpoint for generating feedback plot
    @PostMapping("/feedback-plot")
    public ChatbotResponse generateFeedbackPlot(@RequestBody List<String> performanceData) {
        String plotImage = feedbackPlotService.generateFeedbackPlot(performanceData);
        return new ChatbotResponse(plotImage);
    }

// En
