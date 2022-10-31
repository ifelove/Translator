let interchange = document.querySelector(".interchange");
let selectBox = document.querySelector(".select-box");
let selectContainers = document.querySelectorAll("select");
let exchangeIcon = document.querySelector(".exchange-icon");
let position1 = document.querySelector(".position1");
let position2 = document.querySelector(".position2");
let from = document.querySelector(".location-from select");
let to = document.querySelector(".location-to select");

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
    this.appendLang(to, position2);
    this.appendLang(from, position1);
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
        this.appendLang(to, position2);
        this.appendLang(from, position1);
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

  appendLang(el, point) {
    var selected_options = el.selectedOptions;

    for (var i = 0; i < selected_options.length; i++) {
      // echoes the text of the option
      let theLang = selected_options[i].text;
      point.innerHTML = `<p>Translate ${theLang}</p>`;
      // echoes the value of the option
      //console.log(selected_options[i]);
      //console.log(theLang);
    }
  }
}

//innstance of the Translator

const translator = new Translator(inputTextArea, resultTextArea);

exchangeIcon.addEventListener("click", (e) => {
  let temp = from.value;
  from.value = to.value;
  to.value = temp;
  translator.loadFlag(to);
  translator.loadFlag(from);
  translator.appendLang(to, position2);
  translator.appendLang(from, position1);
});

//positions.forEach((position, index) => {
//positions[index].innerHTML = `<p>Translate ${country_code[lang]}</p>`;
//console.log(from);
//console.log(to.selectedOptions[options.length - 1].innerText);
//console.log(from.selectedOptions[0].innerText);
//});
//let yes = selectContainer.selectedOptions[0].innerText;
//console.log(yes);
