package comp.workforce.service;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.data.category.DefaultCategoryDataset;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import javax.imageio.ImageIO;

@Service
public class FeedbackPlotService {

    public String generateFeedbackPlot(List<String> performanceData) {
        // Here we generate a feedback plot using the provided data
        DefaultCategoryDataset dataset = new DefaultCategoryDataset();

        for (int i = 0; i < performanceData.size(); i++) {
            dataset.addValue(Integer.parseInt(performanceData.get(i)), "Efficiency", "Person " + (i + 1));
        }

        JFreeChart chart = ChartFactory.createBarChart(
                "Employee Performance",
                "Employee",
                "Efficiency",
                dataset
        );

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            ImageIO.write(chart.createBufferedImage(500, 300), "png", byteArrayOutputStream);
            byte[] imageBytes = byteArrayOutputStream.toByteArray();
            return "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error generating plot";
        }
    }
}
