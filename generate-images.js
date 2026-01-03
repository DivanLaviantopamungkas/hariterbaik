// generate-images.js
import { catalogData } from "./src/data/catalog.js";
import fs from "fs";
import path from "path";

// Warna untuk placeholder berdasarkan kategori
const categoryColors = {
  "motion-art": "#4F46E5",
  "motion-adat": "#7C3AED",
  exclusive: "#F59E0B",
  floral: "#10B981",
  "flower-art": "#EC4899",
  vintage: "#8B5CF6",
  "tanpa-foto": "#6B7280",
};

// Buat folder images jika belum ada
const imageDir = "./src/assets/images/catalog";
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Generate placeholder images
catalogData.forEach((item) => {
  const fileName = `${item.id}.jpg`;
  const filePath = path.join(imageDir, fileName);

  // Untuk development, kita buat file teks dulu
  // Di production, Anda bisa ganti dengan gambar asli
  if (!fs.existsSync(filePath)) {
    const svgContent = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="${
          categoryColors[item.category] || "#3B82F6"
        }"/>
        <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial" font-size="24">${
          item.title
        }</text>
        <text x="50%" y="55%" text-anchor="middle" fill="white" font-family="Arial" font-size="16">${
          item.category
        }</text>
        <text x="50%" y="70%" text-anchor="middle" fill="white" font-family="Arial" font-size="14">Placeholder Image</text>
      </svg>
    `;

    fs.writeFileSync(filePath, svgContent);
    console.log(`Created placeholder: ${fileName}`);
  }
});

console.log("Placeholder images created successfully!");
