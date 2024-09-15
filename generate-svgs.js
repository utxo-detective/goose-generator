const fs = require('fs');
const path = require('path');

// Function to read the template SVG
function readTemplateSVG() {
  const templatePath = path.join(__dirname, 'index.svg');
  return fs.readFileSync(templatePath, 'utf8');
}

// Function to generate a random SVG based on the template
function generateRandomSVG(template) {
  // Generate random colors
  const backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
  const neonBlue = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
  const electricPurple = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
  const neonPink = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
  const cyberYellow = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;

  // Replace colors in the template
  let randomizedSVG = template
    .replace(/#000000/g, backgroundColor)
    .replace(/#1A1A2E/g, backgroundColor)
    .replace(/#16F4D0/g, neonBlue)
    .replace(/#B721FF/g, electricPurple)
    .replace(/#FF36AB/g, neonPink)
    .replace(/#FEE715/g, cyberYellow);

  // Update the seed and rendering time
  const seed = Math.floor(Math.random() * 1000000);
  const currentTime = new Date().toString();
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