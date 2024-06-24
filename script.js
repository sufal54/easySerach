// times setup

const hourEle = document.getElementById("hour");
const minEle = document.getElementById("min");
const secEle = document.getElementById("sec");

function setTimes() {
  const time = new Date();
  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();

  hourEle.innerText = hour > 9 ? setHours(hour) : hour === 0 ? 12 : "0" + hour;
  minEle.innerText = setMinSec(min);
  secEle.innerText = setMinSec(sec);

  const hourDots1 = document.querySelectorAll(".dotFrontH .dot");
  hourDots1.forEach((div, i) => {
    if (24 - hour <= i) {
      div.style.backgroundColor = "red";
    } else {
      div.style.backgroundColor = "rgb(19, 19, 21)";
    }
  });
  const hourDots2 = document.querySelectorAll(".dotBackH .dot");
  hourDots2.forEach((div, i) => {
    if (hour > i) {
      div.style.backgroundColor = "red";
    } else {
      div.style.backgroundColor = "rgb(19, 19, 21)";
    }
  });

  const minDots1 = document.querySelectorAll(".dotFrontM .dot");
  minDots1.forEach((div, i) => {
    if (60 - min <= i) {
      div.style.backgroundColor = "Yellow";
    } else {
      div.style.backgroundColor = "rgb(19, 19, 21)";
    }
  });
  const minDots2 = document.querySelectorAll(".dotBackM .dot");
  minDots2.forEach((div, i) => {
    if (min > i) {
      div.style.backgroundColor = "Yellow";
    } else {
      div.style.backgroundColor = "rgb(19, 19, 21)";
    }
  });

  const secDots1 = document.querySelectorAll(".dotFrontS .dot");
  secDots1.forEach((div, i) => {
    if (60 - sec <= i) {
      div.style.backgroundColor = "limegreen";
    } else {
      div.style.backgroundColor = "rgb(19, 19, 21)";
    }
  });
  const secDots2 = document.querySelectorAll(".dotBackS .dot");
  secDots2.forEach((div, i) => {
    if (sec > i) {
      div.style.backgroundColor = "limegreen";
    } else {
      div.style.backgroundColor = "rgb(19, 19, 21)";
    }
  });
}

function setMinSec(num) {
  return num > 9 ? num : "0" + num;
}

function setHours(hour) {
  if (hour > 12) {
    const newHour = hour - 12;
    return newHour > 9 ? newHour : "0" + newHour;
  } else {
    return hour;
  }
}

// setDots

function hourDot() {
  const hourDotsRight = document.querySelector(".dotBackH");
  const hourDotsLeft = document.querySelector(".dotFrontH");
  for (let i = 0; i < 24; i++) {
    let hourDotLeft = document.createElement("div");
    let hourDotRight = document.createElement("div");
    hourDotLeft.classList.add("dot");
    hourDotRight.classList.add("dot");
    hourDotsLeft.appendChild(hourDotLeft);
    hourDotsRight.appendChild(hourDotRight);
  }
}
hourDot();
function mintSec() {
  const minDotsRight = document.querySelector(".dotBackM");
  const minDotsLeft = document.querySelector(".dotFrontM");
  const secDotsRight = document.querySelector(".dotBackS");
  const secDotsLeft = document.querySelector(".dotFrontS");
  for (let i = 0; i < 60; i++) {
    let minDotLeft = document.createElement("div");
    let minDotRight = document.createElement("div");
    let secDotLeft = document.createElement("div");
    let secDotRight = document.createElement("div");
    minDotLeft.classList.add("dot");
    minDotRight.classList.add("dot");
    secDotLeft.classList.add("dot");
    secDotRight.classList.add("dot");

    minDotsLeft.appendChild(minDotLeft);
    minDotsRight.appendChild(minDotRight);
    secDotsLeft.appendChild(secDotLeft);
    secDotsRight.appendChild(secDotRight);
  }
}
mintSec();

// slide up
const clockCon = document.querySelector(".clockContaner");
const input = document.querySelector("input");
const suggest = document.getElementById("suggestBox");
let isOn = false;
document.body.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    isOn = !isOn;

    if (isOn) {
      clockCon.classList.toggle("slideUp");
      setTimeout(() => {
        input.classList.remove("hidden");
        suggest.classList.remove("hidden");
        suggest.innerHTML = "";
        input.value = "";
        input.focus();
      }, 300);
    } else {
      input.value = "";
      suggest.innerHTML = "";
      suggest.classList.add("hidden");
      input.classList.add("hidden");
      clockCon.classList.toggle("slideUp");
      input.blur();
    }
  }
});

// autoType

const texts = [
  "ArrowUp for Searching",
  "g for Google",
  "y for Youtube",
  "h for Github",
];
let currIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeAndEraseText() {
  const currText = texts[currIdx];
  const displayText = currText.substring(0, charIdx);
  document.getElementById("autoType").innerHTML = displayText;

  if (isDeleting) {
    if (charIdx > 0) {
      charIdx--;
      setTimeout(typeAndEraseText, 50);
    } else {
      isDeleting = false;
      currIdx = (currIdx + 1) % texts.length;
      setTimeout(typeAndEraseText, 100);
    }
  } else {
    if (charIdx < currText.length) {
      charIdx++;
      setTimeout(typeAndEraseText, 100);
    } else {
      isDeleting = true;
      setTimeout(typeAndEraseText, 2000);
    }
  }
}

//inputs

function handleSuggestions(data) {
  const suggestions = data[1];
  const suggestionsList = document.getElementById("suggestBox");
  const inputBox = document.querySelector("input");
  suggestionsList.innerHTML = "";

  const site = input.value[0];
  suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    li.addEventListener("click", () => {
      if (site) {
        inputBox.value = site + " " + suggestion;
      } else {
        inputBox.value = "";
      }
      inputBox.focus();
      suggestionsList.innerHTML = "";
    });
    suggestionsList.appendChild(li);
  });
}

function gitSuggestions(data) {
  const suggestions = data;
  const suggestionsList = document.getElementById("suggestBox");
  const inputBox = document.querySelector("input");
  suggestionsList.innerHTML = "";

  const site = input.value[0];
  suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    li.addEventListener("click", () => {
      if (site) {
        inputBox.value = site + " " + suggestion;
      } else {
        inputBox.value = "";
      }
      inputBox.focus();
      suggestionsList.innerHTML = "";
    });
    suggestionsList.appendChild(li);
  });
}

document.getElementById("schIn").addEventListener("keypress", function (event) {
  let query = event.target.value;
  if (query.startsWith("g ")) {
    query = query.substring(2);
    if (query.length > 0) {
      const script = document.createElement("script");
      const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}&jsonp=handleSuggestions`;
      script.src = url;
      document.body.appendChild(script);
      if (event.key === "Enter") {
        event.target.value = "";
        document.getElementById("suggestBox").innerHTML = "";
        window.open(
          "https://www.google.com/search?q=" + encodeURIComponent(query),
          "_blank"
        );
      }
    }
  } else if (query.startsWith("y ")) {
//for YouTube suggestions we need api key because this code is public I used Google's suggestions 
    query = query.substring(2);
    if (query.length > 0) {
      const script = document.createElement("script");
      const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}&jsonp=handleSuggestions`;
      script.src = url;
      document.body.appendChild(script);
      if (event.key === "Enter") {
        document.getElementById("suggestBox").innerHTML = "";
        event.target.value = "";
        window.open(
          "https://www.youtube.com/search?q=" + encodeURIComponent(query),
          "_blank"
        );
      }
    }
  } else if (query.startsWith("h ")) {
    query = query.substring(2);
    if (query.length > 0) {
      const data = fetch(
        `https://api.github.com/search/repositories?q=${query}&per_page=5`
      )
        .then((data) => (data = data.json()))
        .then((data) => {
          const newData = data.items.map((item) => item.full_name);
          gitSuggestions(newData);
        });

      if (event.key === "Enter") {
        document.getElementById("suggestBox").innerHTML = "";
        event.target.value = "";
        window.open("https://github.com/search?q=" + query, "_blank");
      }
    }
  } else {
    document.getElementById("suggestBox").innerHTML = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(typeAndEraseText, 100);
  setInterval(setTimes, 1000);
});
