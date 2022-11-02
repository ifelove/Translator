let interchange = document.querySelector(".interchange");
let selectBox = document.querySelector(".select-box");
let selectContainers = document.querySelectorAll("select");
let exchangeIcon = document.querySelector(".exchange-icon");
let position1 = document.querySelector(".position1");
let position2 = document.querySelector(".position2");
let from = document.querySelector(".location-from select");
let to = document.querySelector(".location-to select");
let liList = document.querySelectorAll("ul .list");
let icons = document.querySelectorAll(".material-icons");
let inputContainer = document.querySelector(".input-text");
let resultContainer = document.querySelector(".result-text");
let inputTextArea = document.querySelector(".from-text");
let resultTextArea = document.querySelector(".to-text");
let copyLogo = document.querySelector("#copy");
let audioLogo = document.querySelector(".audio");
let ulTag = document.querySelectorAll("ul");

//Using Class object
class Translator {
  constructor() {
    this.selectLang();
    this.appendLang(to, position2, "to");
    this.appendLang(from, position1, "from");
  }
  //selecting languages
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
      }
      //loading files as the position changed
      selectContainer.addEventListener("change", (e) => {
        this.loadFlag(e.target);
        this.appendLang(to, position2, "to");
        this.appendLang(from, position1, "from");
      });
    });
  }
  // function to load flag
  loadFlag(element) {
    for (const lang in country_code) {
      let langSub = lang.slice(-2);
      if (lang == element.value) {
        let imagTag = element.parentElement.querySelector("img");
        imagTag.src = `https://flagsapi.com/${langSub}/flat/64.png`;
      }
    }
  }
  //function to append language depend on the position
  appendLang(el, point, in_point) {
    var selected_options = el.selectedOptions;

    for (var i = 0; i < selected_options.length; i++) {
      // echoes the text of the option
      let theLang = selected_options[i].text;
      point.innerHTML = `<p>Translate ${in_point} ${theLang}</p>`;
      // echoes the value of the option
      //console.log(selected_options[i]);
      //console.log(theLang);
    }
  }
}

//innstance of the Translator

const translator = new Translator();

exchangeIcon.addEventListener("click", (e) => {
  let temp = from.value;
  from.value = to.value;
  to.value = temp;
  let temptext = inputTextArea.value;
  inputTextArea.value = resultTextArea.value;
  resultTextArea.value = temptext;
  translator.loadFlag(to);
  translator.loadFlag(from);
  translator.appendLang(to, position2);
  translator.appendLang(from, position1);
});
//activating translating button
let getBtn = document.querySelector(".material");
getBtn.addEventListener("click", () => {
  getLang();
});

//updating input letter count
inputTextArea.addEventListener("keyup", () => {
  countChar(inputTextArea, "0");
});

//funtion to fetch and update
function getLang() {
  let fromLang = selectContainers[0].value;
  let toLang = selectContainers[1].value;
  text = inputTextArea.value;
  resultTextArea.setAttribute("placeholder", "Translating");
  if (!text) return;
  let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`;

  fetch(url)
    .then((data) => data.json())
    .then((res) => {
      resultTextArea.value = res.responseData.translatedText;
      //console.log(res.responseData.translatedText);
      resultTextArea.setAttribute("placeholder", "Translation Done");
      countChar(resultTextArea, "1");
    })
    .catch((err) => console.log(err));
}

//eventlistener on copy and audio functionality
icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.target.innerText == "content_copy") {
      if (e.target.id == "from") {
        navigator.clipboard.writeText(inputTextArea.value);
      } else {
        navigator.clipboard.writeText(resultTextArea.value);
      }
    } else {
      let utterance;
      if (e.target.id == "from") {
        //calling text to speech object
        utterance = new SpeechSynthesisUtterance(inputTextArea.value);
        utterance.lang = selectContainers[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(resultTextArea.value);
        utterance.lang = selectContainers[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
// function for updating textarea letter count
function countChar(theText, ind) {
  let text = theText.value;
  //replacing white space with "" and finding the length
  let textCount = text.replace(/ /g, "").length;
  textCount;
  ulTag.forEach((ul, index) => {
    if (index == ind) {
      ul.firstElementChild.innerHTML = `<li class="list">${textCount}/3000</li>`;
    }
  });
}
