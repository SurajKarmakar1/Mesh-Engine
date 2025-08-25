# Mesh Engine

A sleek web application for generating beautiful static mesh gradients and adding customizable text overlays. Built with React and designed with a modern, dark theme.

## Features

*   **Static Mesh Gradient Generation**: Create unique, layered radial gradient backgrounds.
*   **Text Overlay**:
    *   Add custom text to your gradients.
    *   Drag and drop text to position it anywhere on the canvas.
    *   Customize text with adjustable font size, bold, and italic styles.
    *   Choose any text color using the color picker.
*   **Instant Download**: Export your creations as high-resolution PNG images.
*   **Gradient History**: Save and quickly re-apply your favorite generated gradients.
*   **CSS Code Export**: Copy the CSS `background` code for your generated gradients.
*   **Responsive Design**: Works well on various screen sizes.
*   **Vercel-Inspired Dark Theme**: A clean, modern UI with a dark color scheme.

## Technologies Used

*   [React](https://reactjs.org/)
*   [`dom-to-image`](https://github.com/tsayen/dom-to-image) (For PNG export)
*   JavaScript (ES6+)
*   CSS (Potentially Tailwind CSS or similar utility-first framework, based on class names)

## How to Use

1.  **Generate a Gradient**: Click the "Generate New Gradient" button to create a new static mesh gradient background.
2.  **Add Text**:
    *   Type your desired text into the "Text Content" field in the Text Editor panel.
    *   The text will appear on the gradient preview.
3.  **Style Text**:
    *   Adjust the font size using the slider.
    *   Toggle the "Bold" and "Italic" buttons to change the text style.
    *   Click the color box to open the color picker and choose a text color.
4.  **Position Text**:
    *   Click and drag the text directly on the gradient preview to move it to your desired location.
5.  **Download**:
    *   Once you're happy with your gradient and text, click the "Download as PNG" button in the Download panel to save your creation.
6.  **Copy CSS**:
    *   Find the CSS code for the current gradient in the "CSS Output" panel and click the "Copy" button.
7.  **History**:
    *   Previously generated gradients are stored in the History panel. Click on any thumbnail to re-apply that gradient.
8.  **Remove Text**:
    *   Click the "Remove Text" button in the Text Editor panel to remove the text overlay.


