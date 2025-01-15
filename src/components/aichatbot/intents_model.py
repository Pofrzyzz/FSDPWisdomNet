from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
import os
from intents import intents
from data import training_data, validation_data

# Load pre-trained Hugging Face model (fine-tuned if available)
MODEL_PATH = "./fine_tuned_model"  # Path to your fine-tuned model
if os.path.exists(MODEL_PATH):
    print("Loading fine-tuned model...")
    classifier = pipeline("zero-shot-classification", model=MODEL_PATH)
else:
    print("Loading pre-trained model...")
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")



def classify_intent(message):
    labels = list(intents.keys())  # Use your custom intents as labels
    result = classifier(message, labels)

    # Debugging: Print the classification result
    print("Classification Result:", result)

    # Map "entailment" to the most likely intent
    intent = result['labels'][0]  # Most likely label
    confidence = result['scores'][0]

    # Set a confidence threshold
    if confidence > 0.3 and intent in intents:
        response = intents[intent]
    else:
        intent = "default"
        response = intents[intent]

    return intent, response

# Fine-tuning functionality
def fine_tune_model():
    from datasets import Dataset
    from transformers import Trainer, TrainingArguments

    # Create label mappings
    label2id = {label: idx for idx, label in enumerate(intents.keys())}
    id2label = {idx: label for label, idx in label2id.items()}

    # Tokenizer and model
    model_name = "facebook/bart-large-mnli"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(
        model_name,
        num_labels=len(label2id),
        ignore_mismatched_sizes=True
    )

    # Update the model configuration
    # Update model configuration
    model.config.label2id = label2id
    model.config.id2label = id2label
    model.config.num_labels = len(label2id)  # Ensure num_labels is correct

    # Prepare datasets
    train_dataset = Dataset.from_list(
    [{"text": item["text"], "label": label2id[item["label"]]} for item in training_data]
)
    eval_dataset = Dataset.from_list(
        [{"text": item["text"], "label": label2id[item["label"]]} for item in validation_data]
    )

    # Tokenize the dataset
    def preprocess_function(examples):
        return tokenizer(examples["text"], truncation=True, padding=True)

    tokenized_train_dataset = train_dataset.map(preprocess_function, batched=True)
    tokenized_eval_dataset = eval_dataset.map(preprocess_function, batched=True)

    # Training arguments
    training_args = TrainingArguments(
        output_dir="./results",
        evaluation_strategy="epoch",
        learning_rate=2e-5,
        per_device_train_batch_size=8,
        num_train_epochs=3,
        weight_decay=0.01,
        save_steps=10_000,
        save_total_limit=2,
    )

    # Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_train_dataset,
        eval_dataset=tokenized_eval_dataset,
    )

    # Train and save the model
    print("Starting fine-tuning...")
    trainer.train()
    model.save_pretrained(MODEL_PATH)
    tokenizer.save_pretrained(MODEL_PATH)
    print("Fine-tuning complete. Model saved to", MODEL_PATH)

# Example usage
if __name__ == "__main__":
    # Uncomment to fine-tune the model
    fine_tune_model()
