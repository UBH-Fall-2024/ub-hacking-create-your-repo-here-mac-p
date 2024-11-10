package comp.workforce.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class GCSService {

    private final Storage storage = StorageOptions.getDefaultInstance().getService();
    private final String bucketName = "your-gcs-bucket-name"; // Your GCS bucket name

    public String uploadPdfToGCS(byte[] file) {
        String fileName = "file-" + System.currentTimeMillis() + ".pdf";
        Bucket bucket = storage.get(bucketName);
        Blob blob = bucket.create(fileName, file);
        return blob.getMediaLink();
    }
}
