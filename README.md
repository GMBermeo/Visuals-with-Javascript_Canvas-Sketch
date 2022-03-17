# Domestika: Creative Coding (bruno.imbrizi)
<p align="center">
  <img src="/finalProject%20Renders/Frame1.jpg" width="100%" />
</p>
<p align="center">
  <img src="/finalProject%20Renders/Frame2.jpg" width="100%" />
</p>
<p align="center">
  <img src="/finalProject%20Renders/Frame3.jpg" width="100%" />
</p>
<p align="center">
  <img src="/finalProject%20Renders/Frame4.jpg" width="100%" />
</p>
<p align="center">
  <img src="/finalProject%20Renders/Frame4.jpg" width="100%" />
</p>
<p align="center">
  <img src="/finalProject%20Renders/Frame5.jpg" width="100%" />
</p>
<p align="center">
  <img src="/finalProject%20Renders/Frame6.jpg" width="100%" />
</p>
<p align="center">
  <img src="/finalProject%20Renders/Frame7.jpg" width="100%" />
</p>


| Primeiro cabeçalho  |  Segundo cabeçalho  | Terceiro Cabeçalho |
| ------------------- | ------------------- | ------------------ |
|  Célula de conteúdo |  Célula de conteúdo | Célula de conteúdo |
|  Célula de conteúdo |  Célula de conteúdo | Célula de conteúdo |

[Course of Creative Coding with Javascript by Bruno Imbrizi on Domestika.](https://www.domestika.org/pt/courses/2729-programacao-criativa-produza-pecas-visuais-com-javascript)



### canvas-sketch

`canvas-sketch` is a loose collection of tools, modules and resources for creating generative art in JavaScript and the browser.

<!-- - :sparkles: Website (not yet public) -->

- :closed_book: [Documentation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md)

- :wrench: [Examples](https://github.com/mattdesl/canvas-sketch/blob/master/examples)

#

<p align="center">
  <sub>example of <code>canvas-sketch</code> running in Chrome</sub>
</p>

<p align="center">
  <sub>↓</sub> 
</p>

<p align="center">
  <img src="https://github.com/mattdesl/canvas-sketch/blob/master/docs/assets/images/chrome-example.png" width="50%" />
</p>

### Quick Start with Node.js & npm

To jump directly into `canvas-sketch`, try the following terminal commands with `node@8.x` and `npm@5.x` or newer.

```sh
# Install the CLI tool globally
npm install canvas-sketch-cli -g

# Scaffold a new 'sketch.js' file and open the browser
canvas-sketch sketch.js --new --open

# Start a project
canvas-sketch sketch.js --open
```

Some other commands to try:

```sh
# Start the tool on an existing file and change PNG export folder
canvas-sketch src/foobar.js --output=./tmp/

# Start a new sketch from the Three.js template
canvas-sketch --new --template=three --open

# Build your sketch to a sharable HTML + JS website
canvas-sketch src/foobar.js --build

# Develop with "Hot Reloading" instead of full page reload
canvas-sketch src/foobar.js --hot
```

For more features and details, see the [Documentation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md).

### Code Example

Once you have the CLI tool running, you can try this example of an A4 print artwork.

```js
const canvasSketch = require('canvas-sketch');

// Sketch parameters
const settings = {
  dimensions: 'a4',
  pixelsPerInch: 300,
  units: 'in'
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {
    // Margin in inches
    const margin = 1 / 4;

    // Off-white background
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);

    // Gradient foreground
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, 'cyan');
    fill.addColorStop(1, 'orange');

    // Fill rectangle
    context.fillStyle = fill;
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);
  };
};

// Start the sketch
canvasSketch(sketch, settings);
```

Resulting image looks something like this:
<p align="center">
<img src="https://github.com/mattdesl/canvas-sketch/raw/master/docs/assets/images/gradient.png" width="50%" /><br>
<sup>Note: The above PNG file has been scaled/optimized for web.</sup>
</p>
