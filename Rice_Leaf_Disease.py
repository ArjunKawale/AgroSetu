# run_riceleaf_model_local.py

import torch
from torch import nn
from torchvision import models, transforms
from PIL import Image
import os
import matplotlib.pyplot as plt
import torch.nn.functional as F
import random

# ------------------------------
# Paths
# ------------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"
model_path = r"D:\AgroSetu\vgg16_riceleafs_full.pth"  # full model path
validation_folder = r"D:\AgroSetu\rice-leafs-disease-dataset\RiceLeafsDisease\validation"

# ------------------------------
# Transform for model input
# ------------------------------
input_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# ------------------------------
# Load full model safely
# ------------------------------
import torchvision

with torch.serialization.safe_globals([torchvision.models.vgg.VGG]):
    model = torch.load(model_path, map_location=device,weights_only=False)
    model = model.to(device)
    model.eval()

# ------------------------------
# Function to visualize prediction
# ------------------------------
def show_prediction(img_path, predicted_class, actual_class=None, class_names=None):
    img = Image.open(img_path).convert("RGB")
    plt.imshow(img)
    title = f"{os.path.basename(img_path)}\nPredicted: {class_names[predicted_class]}" if class_names else os.path.basename(img_path)
    if actual_class is not None and class_names:
        title += f", Actual: {class_names[actual_class]}"
    plt.title(title)
    plt.axis("off")
    plt.show()

# ------------------------------
# Predict a single image
# ------------------------------
def predict_single_image(model, img_path, device='cpu', class_names=None):
    img = Image.open(img_path).convert("RGB")
    img_tensor = input_transform(img).unsqueeze(0).to(device)
    with torch.no_grad():
        output = model(img_tensor)
        pred_class = torch.argmax(F.softmax(output, dim=1), 1).item()
    print(f"Image: {os.path.basename(img_path)} -> Predicted class: {class_names[pred_class] if class_names else pred_class}")
    show_prediction(img_path, pred_class, class_names=class_names)

# ------------------------------
# Evaluate validation folder
# ------------------------------
def evaluate_validation_folder(model, folder_path, device='cpu', n_samples=10):
    class_names = sorted(os.listdir(folder_path))
    all_image_paths, all_labels = [], []

    for idx, cls in enumerate(class_names):
        cls_folder = os.path.join(folder_path, cls)
        for img_name in os.listdir(cls_folder):
            if img_name.lower().endswith(('.jpg', '.jpeg', '.png')):
                all_image_paths.append(os.path.join(cls_folder, img_name))
                all_labels.append(idx)

    # Accuracy
    total, correct = 0, 0
    with torch.no_grad():
        for img_path, label in zip(all_image_paths, all_labels):
            img = Image.open(img_path).convert("RGB")
            img_tensor = input_transform(img).unsqueeze(0).to(device)
            output = model(img_tensor)
            pred_class = torch.argmax(F.softmax(output, dim=1), 1).item()
            total += 1
            correct += (pred_class == label)
    print(f"Validation Accuracy: {correct/total*100:.2f}%")

    # Random samples visualization
    sample_indices = random.sample(range(len(all_image_paths)), min(n_samples, len(all_image_paths)))
    for idx in sample_indices:
        img_path = all_image_paths[idx]
        label = all_labels[idx]
        predict_single_image(model, img_path, device, class_names)


# ------------------------------
# Return only predicted class name
# ------------------------------
def get_predicted_class(model, img_path, device='cpu', class_names=None):
    img = Image.open(img_path).convert("RGB")
    img_tensor = input_transform(img).unsqueeze(0).to(device)
    with torch.no_grad():
        output = model(img_tensor)
        pred_class = torch.argmax(F.softmax(output, dim=1), 1).item()
    if class_names:
        return class_names[pred_class]
    return pred_class

class_names = sorted(os.listdir(validation_folder))

# ------------------------------
# Main
# ------------------------------
if __name__ == "__main__":
    # Evaluate validation folder
    # evaluate_validation_folder(model, validation_folder, device, n_samples=5)

    # Predict a single image example
    single_image_path = r"D:\AgroSetu\rice-leafs-disease-dataset\RiceLeafsDisease\validation\bacterial_leaf_blight\bacterial_val (3).JPG"
    # predict_single_image(model, single_image_path, device, class_names=sorted(os.listdir(validation_folder)))
    result = get_predicted_class(model, single_image_path, device, class_names)
    print("Predicted:", result)
