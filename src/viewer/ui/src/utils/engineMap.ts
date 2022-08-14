import { TranslationEngine, RecognitionEngine } from "../stores/snaps";

export const recognitionEngineMap = {
  [RecognitionEngine.TESSERACT]: "Tesseract",
  [RecognitionEngine.GCLOUD]: "Google",
};

export const translationEngineMap = {
  [TranslationEngine.GCLOUD]: "Google",
};
