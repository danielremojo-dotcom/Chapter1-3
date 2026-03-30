
const pagesContent = [

`Hey Zoe

ll skip the formalities and just say hi. I wanted to tell you something because I really value our friendship, and I don’t want to keep it to myself.

Over the past few months I’ve realized that spending time with you has become something I really treasure. Even the little things like our chats on Discord, watching movies or series together, or just walking you home have meant a lot to me.

I guess what I’m trying to say is that I care about you, not just as a friend.`,



`I’m not expecting anything from you, and I don’t want this to make things awkward. I just… wanted you to know how I feel.

I remember you asked me once what attributes I like about you, and now I finally have an answer.

One of the things I admire the most is how you get along with people so easily. Your laugh is contagious, and I love how you notice the little things around you—like waving at kids when they smile at you.`,



`It’s those small moments that make you really special.

Beyond that I love the little moments we’ve shared, even the simple ones: hanging out on Discord for no reason, watching a series together, or just walking and talking.

Those moments made me appreciate not just your company, but you as a person. I feel like I’ve started noticing these things more and more, and it made me realize why I enjoy being around you so much.`,



`I think I first really noticed my feelings last Friday.

At first, I tried to ignore or reject them, but the more I thought about it, the more I realized that I genuinely like you not just as a friend.

I don’t know exactly why I’m writing this now; maybe it’s because I feel it’s important to be honest, even if I end up never sending this.`,



`I don’t want to pressure you or expect anything in return. I just want you to know how I feel.

And Nolan said, “Malalaman mo din naman kahit anong gawin ko,” and honestly, I’m not even sure what he meant by that, but somehow it feels like this is the right moment to say it.

So yeah… this is me saying that I like you.`,



`And no matter what, I hope this doesn’t change our friendship, because that’s something I truly value.`
];

let currentPageIndex = 0;
let typedPages = [];
let typingInProgress = false;

const bgMusic = document.getElementById("bgMusic");
const pageFlipSound = document.getElementById("pageFlip");

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play().catch(err => console.log("Audio blocked:", err));
}

function showLetter() {
  const intro = document.getElementById("introText");
  const btn = document.getElementById("readBtn");

  btn.disabled = true;

  document.body.classList.add("blur-active");

  intro.classList.add("fade-out");
  btn.classList.add("fade-out");

  bgMusic.volume = 0;
  bgMusic.play().then(() => {
    let vol = 0;
    const fadeIn = setInterval(() => {
      if (vol < 0.5) { // max volume
        vol += 0.01;
        bgMusic.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 100);
  }).catch(err => console.log("Audio play blocked:", err));

  setTimeout(() => {
    intro.style.display = "none";
    btn.style.display = "none";
    document.getElementById("controls").style.display = "block";

    renderAllPages();
    showPage(0);
  }, 600);
}

function renderAllPages() {
  const book = document.getElementById("book");
  book.innerHTML = "";

  pagesContent.forEach((content) => {
    const page = document.createElement("div");
    page.className = "page front";
    page.style.opacity = 0;
    page.style.transform = "translateY(50px) scale(0.95)";
    page.innerHTML = `<p class="text"></p>`;
    book.appendChild(page);
  });
}

function showPage(index) {
  const pages = document.querySelectorAll(".page.front");

  pages.forEach((p, i) => {
    p.style.zIndex = pages.length - i;
    if (i !== index) {
      p.style.opacity = 0;
      p.style.transform = "translateY(50px) scale(0.95)";
    }
  });

  const page = pages[index];

  page.style.transition = "none";
  page.style.opacity = 0;
  page.style.transform = "translateY(50px) scale(0.95)";
  page.getBoundingClientRect();

  page.style.transition = "all 0.8s ease";
  page.style.opacity = 1;
  page.style.transform = "translateY(0) scale(1)";

  currentPageIndex = index;
  typePage(index);
}

function typePage(index) {
  const pages = document.querySelectorAll(".page.front");
  const page = pages[index];
  const textEl = page.querySelector(".text");

  if (typedPages[index]) {
    // Replace newlines with <br> so line breaks show correctly
    textEl.innerHTML = pagesContent[index].replace(/\n/g, "<br>");
    return;
  }

  typingInProgress = true;
  const fullText = pagesContent[index].replace(/\n/g, "<br>");
  let i = 0;

  function type() {
    if (i < fullText.length) {
      textEl.innerHTML = fullText.substring(0, i) + '<span class="cursor"></span>';

      let delay = 20;
      if (fullText.substring(i, i+3) === "...") delay = 120;

      i++;
      setTimeout(type, delay);
    } else {
      textEl.innerHTML = fullText;
      typedPages[index] = true;
      typingInProgress = false;
    }
  }

  type();
}

function finishTyping(index) {
  const pages = document.querySelectorAll(".page.front");
  const textEl = pages[index].querySelector(".text");

  textEl.innerHTML = pagesContent[index].replace(/\n/g, "<br>");
  typedPages[index] = true;
  typingInProgress = false;
}
function nextPage() {
  if (currentPageIndex < pagesContent.length - 1) {

    if (typingInProgress) {
      finishTyping(currentPageIndex);
      return;
    }

    flipPage(currentPageIndex + 1, -180);
  }
}

function prevPage() {
  if (currentPageIndex > 0) {

    if (typingInProgress) {
      finishTyping(currentPageIndex);
      return;
    }

    flipPage(currentPageIndex - 1, 180);
  }
}

function flipPage(targetIndex, rotateDeg) {
  const pages = document.querySelectorAll(".page.front");
  const current = pages[currentPageIndex];
  const next = pages[targetIndex];

  playAudio(pageFlipSound);

  current.style.transform = `rotateY(${rotateDeg}deg)`;
  current.style.opacity = 0;

  setTimeout(() => {
    current.style.transform = "rotateY(0deg)";
    showPage(targetIndex);
  }, 400);
}

bgMusic.volume = 0;

function fadeMusic() {
  bgMusic.play();
  let vol = 0;

  const fadeIn = setInterval(() => {
    if (vol < 0.5) {
      vol += 0.01;
      bgMusic.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 100);
}