let interchange = document.querySelector(".interchange");
let selectBox = document.querySelector(".select-box");
let selectContainers = document.querySelectorAll("select");
let exchangeIcon = document.querySelector(".exchange-icon");
let position1 = document.querySelector(".position1");
let position2 = document.querySelector(".position2");
let inputContainer = document.querySelector(".input-text");
let resultContainer = document.querySelector(".result-text");
let inputTextArea = document.querySelector(".from-text");
let resultTextArea = document.querySelector(".to-text");
let copyLogo = document.querySelector("#copy");
let audioLogo = document.querySelector(".audio");

//Using Class object
class Translator {
  constructor(inputTextArea, resultTextArea) {
    this.inputTextArea = inputTextArea;
    this.resultTextArea = resultTextArea;
    this.selectLang();
  }

  selectLang() {
    selectContainers.forEach((selectContainer, index) => {
      for (const lang in country_code) {
        let selected;
        if (index == 0) {
          selected = lang == "en-US" ? "selected" : "";
        } else if (index == 1) {
          selected = lang == "fr-FR" ? "selected" : "";
        }

        let langTag = `  <option value=${lang} ${selected}>${country_code[lang]}</option>`;
        selectContainer.innerHTML += langTag;
        //console.log(langTag);
      }

      this.loadFlag();
    });
  }

  loadFlag() {
    for (const lang in country_code) {
      console.log(lang);
    }
  }
}

//innstance of the Translator

const translator = new Translator(inputTextArea, resultTextArea);
