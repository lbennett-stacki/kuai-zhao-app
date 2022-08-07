function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Bar {
  static BAR_WIDTH = 16;

  constructor(position, element) {
    const fullWidthDimension = ["left", "right"].includes(position)
      ? "height"
      : "width";
    const thicknessDimension =
      fullWidthDimension === "height" ? "width" : "height";
    const pinPosition = position === "bottom" ? "bottom" : "top";
    element.style[fullWidthDimension] = "100%";
    element.style[thicknessDimension] = `${Bar.BAR_WIDTH}px`;
    element.style.backgroundColor = "#9f4141";
    element.style.position = "absolute";
    element.style[pinPosition] = 0;
    element.style[position] = 0;
    element.style.webkitAppRegion = "drag";

    this.element = element;
  }

  mount(element) {
    element.appendChild(this.element);
  }

  static render(position, parent = document.body) {
    const element = document.createElement("div");
    const bar = new Bar(position, element);
    bar.mount(parent);

    return bar;
  }
}

class CropControl {
  bars = [];

  constructor(bars) {
    this.bars = bars;
  }

  static render() {
    const bars = [
      Bar.render("top"),
      Bar.render("right"),
      Bar.render("bottom"),
      Bar.render("left"),
    ];
    const control = new CropControl(bars);

    return control;
  }
}

class SnipControl {
  buttonElement = null;

  constructor(buttonElement) {
    this.buttonElement = buttonElement;
  }

  register() {
    this.buttonElement.addEventListener("click", () => {
      window.electronAPI.snip();
    });
  }

  static render() {
    const button = document.getElementById("snip");

    const snip = new SnipControl(button);
    snip.register();

    return snip;
  }
}

class Renderer {
  static render() {
    CropControl.render();
    SnipControl.render();
  }
}

Renderer.render();
