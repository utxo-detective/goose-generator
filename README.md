# Goose SVG Generator

This script generates randomized goose SVG files based on a template. It allows you to create multiple unique goose images with varying colors and metadata.

## Prerequisites

- Node.js installed on your system

## Setup

1. Clone this repository or download the files to your local machine.
2. Ensure you have the following files in your project directory:
   - `generate-svgs.js`
   - `index.svg` (your goose template SVG file)

## Usage

To generate your goose images, follow these steps:

1. Open a terminal or command prompt.
2. Navigate to the directory containing the `generate-svgs.js` file.
3. Run the script using Node.js, specifying the number of goose images you want to generate:

```
node generate-svgs.js <number_of_svgs>
```

Replace `<number_of_svgs>` with the desired number of SVG files you want to create.

For example, to generate 10 SVG files:

```
node generate-svgs.js 10
```

If you don't specify a number, the script will default to generating 5 SVG files.

## Output

The script will create a `build/` directory (if it doesn't already exist) and save the generated SVG files there. Each file will be named `random_svg_1.svg`, `random_svg_2.svg`, and so on.

The console will display the