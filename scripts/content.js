let ulHeader = document.querySelector("ul.global-nav__primary-items");

let liViewPosts = document.createElement("li");
liViewPosts.classList.add("global-nav__primary-item");

let aViewPosts = document.createElement("a");

aViewPosts.setAttribute("target", "_blank");
aViewPosts.setAttribute(
  "href",
  "https://www.linkedin.com/my-items/saved-posts/"
);
aViewPosts.classList.add("app-aware-link", "global-nav__primary-link");

let divOuter = document.createElement("div");
divOuter.classList.add("ivm-image-view-model", "global-nav__icon-ivm");

let divInner = document.createElement("div");
divInner.classList.add("ivm-view-attr__img-wrapper", "display-flex");

let img = document.createElement("img");
img.setAttribute("src", chrome.runtime.getURL("images/save.png"));
img.setAttribute("id", "imgSaved");

divInner.appendChild(img);
divOuter.appendChild(divInner);
aViewPosts.appendChild(divOuter);

let spanViewPosts = document.createElement("span");
spanViewPosts.classList.add(
  "t-12",
  "break-words",
  "block",
  "t-black--light",
  "t-normalglobal-nav__primary-link-text"
);
spanViewPosts.innerHTML = "Saved Posts";

aViewPosts.appendChild(spanViewPosts);
liViewPosts.appendChild(aViewPosts);
ulHeader.appendChild(liViewPosts);

let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.lang = "en-IN, hi-IN"; // Set language to English and Hindi
speechRecognition.start();

speechRecognition.onresult = (event) => {
  let transcript = event.results[event.resultIndex][0].transcript
    .trim()
    .toLowerCase();

  console.log(event);
  if (transcript.includes("open post")) {
    aViewPosts.click();
  } else if (transcript.includes("go home")) {
    window.location.href = "https://www.linkedin.com/feed/";
  } else if (transcript.includes("open jobs")) {
    window.location.href = "https://www.linkedin.com/jobs/";
  } else if (transcript.includes("open messages")) {
    window.location.href = "https://www.linkedin.com/messaging/";
  } else if (transcript.includes("view profile")) {
    window.location.href = "https://www.linkedin.com/in/me/";
  } else if (transcript.includes("view notifications")) {
    window.location.href = "https://www.linkedin.com/notifications/";
  } else if (transcript.includes("view network")) {
    window.location.href = "https://www.linkedin.com/mynetwork/";
  } else if (transcript.startsWith("search ")) {
    let query = transcript.split("search ")[1];
    window.location.href = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(
      query
    )}`;
  }
};
