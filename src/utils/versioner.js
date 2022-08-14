exports.Versioner = class Versioner {
  register() {
    window.addEventListener("DOMContentLoaded", () => {
      const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
      };

      for (const dependency of ["chrome", "node", "electron"]) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
      }
    });
  }

  static create() {
    const versioner = new Versioner();
    versioner.register();

    return versioner;
  }
};
