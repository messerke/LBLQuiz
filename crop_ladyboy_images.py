from PIL import Image
import os
import glob

# Directory containing the ladyboy images
image_dir = r"D:\Dev\repos\LBLQuiz\public\images\lbs"

# Get all PNG files
png_files = sorted(glob.glob(os.path.join(image_dir, "IMG_*.PNG")))

print(f"Found {len(png_files)} ladyboy images to process\n")

# Process each image
for idx, img_path in enumerate(png_files, start=1):
    try:
        # Open image
        img = Image.open(img_path)
        width, height = img.size

        print(f"Processing {os.path.basename(img_path)}: {width}x{height}")

        # Define crop area (remove top ~12% and bottom ~30%)
        top_crop = int(height * 0.12)  # Remove top 12%
        bottom_crop = int(height * 0.70)  # Keep up to 70% from top

        # Crop: (left, top, right, bottom)
        cropped = img.crop((0, top_crop, width, bottom_crop))

        # Save with new name in the lbs folder
        new_name = f"ladyboy-{idx}.png"
        new_path = os.path.join(image_dir, new_name)
        cropped.save(new_path, "PNG")

        print(f"  -> Saved as {new_name} ({cropped.size[0]}x{cropped.size[1]})\n")

    except Exception as e:
        print(f"  X Error processing {os.path.basename(img_path)}: {e}\n")

print(f"Processing complete! Created {len(png_files)} cropped ladyboy images.")
print(f"\nImages saved in: {image_dir}")
print(f"Move all ladyboy-*.png files to the main images folder when ready.")
