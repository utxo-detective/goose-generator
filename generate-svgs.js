const fs = require('fs');
const path = require('path');

// Function to read the template SVG
function readTemplateSVG() {
  const templatePath = path.join(__dirname, 'index.svg');
  return fs.readFileSync(templatePath, 'utf8');
}

// Function to generate a random color
function randomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
}

// Function to generate a random SVG based on the template
function generateRandomSVG(template) {
  const colorMap = {
    backgroundColor: ['#000000', '#1A1A2E'],
    primaryColor: ['#16F4D0', '#00FFFF'],
    secondaryColor: ['#B721FF', '#FF00FF'],
    accentColor1: ['#FF36AB', '#FF69B4'],
    accentColor2: ['#FEE715', '#FFFF00'],
    accentColor3: ['#FF0000', '#FF4500'],
    accentColor4: ['#00FF00', '#32CD32'],
    accentColor5: ['#1E90FF', '#4169E1'],
    accentColor6: ['#FFA500', '#FFD700'],
    accentColor7: ['#8A2BE2', '#9400D3'],
    accentColor8: ['#20B2AA', '#48D1CC']
  };

  // Generate random colors
  const colors = Object.fromEntries(
    Object.entries(colorMap).map(([key, values]) => [key, randomColor()])
  );

  // Replace colors in the template
  let randomizedSVG = template;
  Object.entries(colorMap).forEach(([key, values]) => {
    values.forEach(color => {
      randomizedSVG = randomizedSVG.replace(new RegExp(color, 'g'), colors[key]);
    });
  });

  // Update the seed and rendering time
  const seed = Math.floor(Math.random() * 1000000);
  const currentTime = new Date().toISOString();
  randomizedSVG = randomizedSVG
    .replace(/seed=\d+/, `seed=${seed}`)
    .replace(/Rendered at.*/, `Rendered at ${currentTime}`);

  return randomizedSVG;
}

// Function to save SVG to file
function saveSVG(svg, index) {
  const buildDir = path.join(__dirname, 'build');
  
  // Create build directory if it doesn't exist
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  
  const filePath = path.join(buildDir, `random_svg_${index}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Generated: ${filePath}`);
}

// Main function to generate SVGs
function generateSVGs(count) {
  const template = readTemplateSVG();
  for (let i = 0; i < count; i++) {
    const svg = generateRandomSVG(template);
    saveSVG(svg, i + 1);
  }
  console.log(`Generated ${count} SVG files in the build/ directory.`);
}

// Get the number of SVGs to generate from command line argument
const count = parseInt(process.argv[2]) || 5; // Default to 5 if no argument is provided

// Generate SVGs
generateSVGs(count);