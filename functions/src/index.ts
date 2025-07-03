import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Initialize the Firebase Admin SDK
initializeApp();

// Define the structure of the data we expect from the client
interface UploadData {
  file: string; // The file will be sent as a base64 encoded string
  fileName: string;
  contentType: string;
  userId: string;
}

// Create the callable function
export const uploadImage = onCall(async (request) => {
  // Check if the user is authenticated (important for security)
  if (!request.auth) {
    throw new https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { file, fileName, contentType, userId }: UploadData = request.data;
  logger.info(`Received upload request for ${fileName} from user ${userId}`);

  try {
    const bucket = getStorage().bucket();
    // Create a path in Firebase Storage: projects/{userId}/{fileName}
    const filePath = `projects/${userId}/${Date.now()}_${fileName}`;
    const fileUpload = bucket.file(filePath);

    // Convert the base64 string back to a buffer
    const buffer = Buffer.from(file, "base64");

    // Upload the file to Firebase Storage
    await fileUpload.save(buffer, {
      metadata: {
        contentType: contentType,
      },
    });

    logger.info(`File ${fileName} uploaded to ${filePath}.`);

    // Make the file public and get its URL
    await fileUpload.makePublic();
    const publicUrl = fileUpload.publicUrl();

    // Return the public URL to the client
    return {
      message: "Image uploaded successfully!",
      imageUrl: publicUrl,
    };
  } catch (error) {
    logger.error("Error uploading image:", error);
    throw new https.HttpsError(
      "internal",
      "An error occurred while uploading the image."
    );
  }
});
