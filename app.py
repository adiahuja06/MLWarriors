import streamlit as st
import torch
import torch.nn as nn
import torchvision
import torchvision.models as models
import torchvision.transforms as transforms
import numpy as np
import matplotlib.pyplot as plt
import torch.optim as optim
import copy
import pandas as pd
from PIL import Image
import io
from lrp_classfunc import LRPVisualizer
from objdetector import ObjectDetector

device=torch.device("cuda:0")
# Load your model
class VGGModel(nn.Module):
    def __init__(self):
        super(VGGModel, self).__init__()
        self.vgg16 = models.vgg16(pretrained=True)

        # replace output layer according to problem
        in_feats = self.vgg16.classifier[6].in_features
        self.vgg16.classifier[6] = nn.Linear(in_feats, 2)

    def forward(self, x):
        x = self.vgg16(x)
        return x

model = VGGModel()
model_path = "/home/faizah.kureshi@corp.merillife.com/Downloads/hackathon/Alzhimers/best_model_alzhimers.pth"
model.load_state_dict(torch.load(model_path, map_location=device))
model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize((255, 255)),
    transforms.ToTensor(),
])

st.title("Image Prediction Interface")
st.write("Upload an image and get a prediction")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Load the image
    image1 = Image.open(uploaded_file)
    st.image(image1, caption='Uploaded Image.', use_column_width=True)
    
    # Transform the image
    image = transform(image1)
    inputs = image.unsqueeze(0).to(device)
    outputs = model(inputs).max(1).indices.detach().cpu().numpy()
    dict={0:'Dementia', 1:'No Dementia'}
    # Display prediction
    
    st.write(f"Predicted Label: {dict[outputs[0]]}")

    lrp_visualizer = LRPVisualizer(model, device)
    output_path = lrp_visualizer.save_and_display_image(inputs)
    
    st.image(output_path, caption="Processed Image with Relevances", use_column_width=True)

    detector = ObjectDetector()
    output_pathforalzh=detector.process_image(image1)

    st.image(output_pathforalzh, caption="Processed Image with Bounding Box", use_column_width=True)


