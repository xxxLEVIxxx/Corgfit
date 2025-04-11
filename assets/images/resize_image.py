from PIL import Image
import os

# Define your directories
input_dir = "C:/repos/corgfit-frontend/assets/images/List-Images"   # Directory containing your original images
output_dir = "C:/repos/corgfit-frontend/assets/images/Resized" # Directory where resized images will be saved

print(input_dir)
# Create the output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Set the target size
target_size = (200, 200)

# Loop through all files in the input directory
for filename in os.listdir(input_dir):
    # Process only files with valid image extensions
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename)
        
        # Open the image and resize it
        with Image.open(input_path) as img:
            resized_img = img.resize(target_size, Image.Resampling.LANCZOS)
            resized_img.save(output_path)
            print(f"Resized {filename} and saved to {output_path}")
