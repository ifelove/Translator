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

      selectContainer.addEventListener("change", (e) => {
        this.loadFlag(e.target);
      });
    });
  }

  loadFlag(element) {
    for (const lang in country_code) {
      let langSub = lang.slice(-2);
      if (lang == element.value) {
        let imagTag = element.parentElement.querySelector("img");
        imagTag.src = `https://flagsapi.com/${langSub}/flat/64.png`;
      }
    }
  }
}

//innstance of the Translator

const translator = new Translator(inputTextArea, resultTextArea);
