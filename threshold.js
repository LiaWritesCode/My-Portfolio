// ANIMATION AND TYPING FOR THE CONSOLE COMMAND
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-command");
  const bootSequence = document.getElementById("boot-sequence");

  // TYPEWRITER ANIMATION FOR EACH BOOT SEQUENCE LINE UPON CORRECT INPUT

  function typeBootLine(lineElement, callback) {
    const originalHTML = lineElement.innerHTML;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = originalHTML;

    const fragments = [];
    tempDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const trimmed = node.textContent.replace(/\s+/g, " ").trim();
        if (trimmed.length > 0) {
          fragments.push({ type: "text", content: trimmed });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const spanClass = node.className;
        const spanText = node.textContent;

        spanText.split("").forEach((char) => {
          fragments.push({
            type: "element",
            content: `<span class="${spanClass}">${char}</span>`,
          });
        });
      }
    });

    lineElement.innerHTML = "";
    lineElement.classList.remove("hidden");

    let charIndex = 0;
    let fragmentIndex = 0;

    function typeChar() {
      if (fragmentIndex >= fragments.length) {
        callback();
        return;
      }

      const frags = fragments[fragmentIndex];
      if (frags.type === "text") {
        const chars = frags.content.split("");

        if (chars.length === 0) {
          fragmentIndex++;
          typeChar();
          return;
        }

        if (charIndex < chars.length) {
          console.log("Typing:", chars[charIndex]);
          lineElement.innerHTML += chars[charIndex];
          charIndex++;
          setTimeout(typeChar, 30);
        } else {
          fragmentIndex++;
          charIndex = 0;
          typeChar();
        }
      } else if (frags.type === "element") {
        lineElement.innerHTML += frags.content;
        fragmentIndex++;
        charIndex = 0;
        setTimeout(typeChar, 30);
      }
    }
    typeChar();
  }

  function startBootSequence() {
    const bootSequence = document.getElementById("boot-sequence");
    const lines = Array.from(bootSequence.querySelectorAll(".boot-line"));

    let currentLine = 0;

    function typeNextLine() {
      if (currentLine >= lines.length) return;
      typeBootLine(lines[currentLine], () => {
        currentLine++;

        if (currentLine === lines.length) {
          setTimeout(() => {
            startLoadingDots();

            // Wait 3 seconds for dots to shimmer, then trigger threshold dissolve
            setTimeout(initiateThresholdTransition, 3000);
          }, 500);
        } else {
          setTimeout(typeNextLine, 200);
        }
      });
    }
    typeNextLine();
  }

  function startLoadingDots() {
    const dots = document.querySelector(".loading-dots");
    let count = 0;

    setInterval(() => {
      count = (count + 1) % 4;
      dots.textContent = ".".repeat(count);
    }, 750);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = input.innerText.trim();

      if (command === "./initialize threshold --ritual") {
        startBootSequence();
        input.innerText = ""; // to clear the input
      } else {
        alert("Unrecognized threshold key. Please try again.");
      }
    }
  });

  // Transition into slides

  function initiateThresholdTransition() {
    const threshold = document.querySelector(".threshold-container");
    const veil = document.getElementById("veil");
    const redacted = document.querySelector(".redacted-container");
    const cursor = document.getElementById("cursor");

    // Suppress blinking cursor
    if (cursor) cursor.style.display = "none";

    // Pulse the container
    threshold.classList.add("pulsing");

    // After pulse, fade in veil
    setTimeout(() => {
      veil.style.opacity = "1";
      document.body.classList.add("fade-bg"); // fade out background image
    }, 600);

    // Fade out console
    setTimeout(() => {
      threshold.style.opacity = "0";
    }, 1200);

    // Fade in real content
    setTimeout(() => {
      redacted.classList.add("visible");
      redacted.style.pointerEvents = "auto";
    }, 1800);

    setTimeout(() => {
      const firstSlide = document.querySelector(".slide-1");
      firstSlide.classList.remove("hidden");
      firstSlide.classList.add("visible");
    }, 2200);

    setTimeout(() => {
      veil.style.opacity = "0";
      setTimeout(() => {
        veil.remove();
      }, 1000); // wait for fade-out to complete
    }, 2400);
  }

  // FOR THE BLINKING CURSOR POSITION BC I CAN'T FIGURE OUT HOW TO ALIGN IT WITH JUST HTML/CSS
  const userCommand = document.getElementById("user-command");
  const cursor = document.getElementById("cursor");

  userCommand.addEventListener("focus", () => {
    userCommand.classList.add("focused");
  });

  userCommand.addEventListener("blur", () => {
    userCommand.classList.remove("focused");
  });

  userCommand.addEventListener("click", updateCursorVisibility);

  function updateCursorVisibility() {
  const isEmpty = userCommand.textContent.trim() === "";
  cursor.style.display = isEmpty ? "block" : "none";
}

  userCommand.focus();
  updateCursorVisibility();

  const observer = new MutationObserver(updateCursorVisibility);
observer.observe(userCommand, {
  childList: true,
  characterData: true,
  subtree: true,
});

  // THE CLOSE BUTTON FOR THE CONSOLE PAGE TO BRING USER BACK TO THE PORTFOLIO ~
  const closeBtn = document.getElementById("console-close");
  const modal = document.getElementById("close-modal");
  const returnBtn = document.getElementById("return-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  returnBtn.addEventListener("click", () => {
    window.location.href = " / "; // Will add url when site is published entirely.
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    // because i like to use escape to close a lot too
    if (e.key === "Escape") {
      modal.classList.add("hidden");
    }
  });

  // ALL MAIN THRESHOLD CONTENT FOR SLIDES

  const pauseDurations = [
    500, // Slide 1 ((slide with the button))
    5000, // Slide 2
    5500, // Slide 3 (longer pause)
    7000, // Slide 4 (longer pause)
    5000, // Slide 5
    4200, // Slide 6 ((shorter duration, only few words))
    4200, // Slide 7 ((shorter duration, only few words))
    6000, // Slide 8
    5000, // Slide 9
  ];

  // ALL BUTTONS
  const replayBtn = document.getElementById("replay-btn"); // bc the replay btn kept rendering, disappearing, and THEN appearing after its proper delay
  replayBtn.style.opacity = "0";
  replayBtn.style.pointerEvents = "none";

  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  let slideshowStarted = false;

  // SLIDESHOW START BUTTON
  const triggerBtn = document.querySelector(".redacted-btn");
  triggerBtn.addEventListener("click", () => {
    if (!slideshowStarted) {
      slideshowStarted = true;

      slides[currentSlide].classList.remove("hidden");
      slides[currentSlide].classList.add("visible");

      const pauseDuration = pauseDurations[currentSlide] || 5000;

      setTimeout(() => {
        slides[currentSlide].classList.add("dissolving");

        setTimeout(() => {
          slides[currentSlide].classList.remove("visible", "dissolving");
          slides[currentSlide].classList.add("hidden");
          currentSlide++;
          showSlide(currentSlide);
        }, 2500);
      }, pauseDuration);
    }
  });

  // THE REPLAY BUTTON
  replayBtn.addEventListener("click", () => {
    const finalSlide = slides[slides.length - 1];
    const finalBtn = finalSlide.querySelector(".back-btn");
    const replayIcon = finalSlide.querySelector("#replay-btn");


    finalBtn.style.opacity = "0";
    finalBtn.style.pointerEvents = "none";
    replayIcon.style.opacity = "0";
    replayIcon.style.pointerEvents = "none";

    setTimeout(() => {
      slides.forEach((slide) => {
        slide.classList.remove("visible", "dissolving");
        slide.classList.add("hidden");
      });

      currentSlide = 1;
      slideshowStarted = true;

      // TRACKER RESET TO SLIDE 2
      const tracker = document.getElementById("constellation-tracker");
      const stars = tracker.querySelectorAll(".star");

      tracker.classList.add("visible");

      stars.forEach((star, i) => {
        star.classList.remove("active", "past", "future");

        if (i < currentSlide) {
          star.classList.add("past");
        } else if (i === currentSlide) {
          star.classList.add("active");
        } else {
          star.classList.add("future");
        }
      });

      const pauseDuration = pauseDurations[currentSlide] || 5000;

      slides[currentSlide].classList.remove("hidden");
      slides[currentSlide].classList.add("visible");

      setTimeout(() => {
        slides[currentSlide].classList.add("dissolving");

        setTimeout(() => {
          slides[currentSlide].classList.remove("visible", "dissolving");
          slides[currentSlide].classList.add("hidden");
          currentSlide++;
          showSlide(currentSlide);
        }, 2500);
      }, pauseDuration);
    }, 1000);
  });

  // ACTUAL FUNCTION OF SLIDE SHOW

  function showSlide(index) {
    const slide = slides[index];
    slide.classList.remove("hidden");
    slide.classList.add("visible");

    // TRACKER SHIT

    const tracker = document.getElementById("constellation-tracker");
    const stars = tracker.querySelectorAll(".star");

    if (index >= 1) {
      tracker.classList.add("visible");
    } else {
      tracker.classList.remove("visible");
    }

    stars.forEach((star, i) => {
      star.classList.remove("active", "past", "future");

      if (i < index) {
        star.classList.add("past");
      } else if (i === index) {
        star.classList.add("active");
      } else {
        star.classList.add("future");
      }
    });

    if (index === slides.length - 1) {
      // both buttons with delayed visibility
      const finalBtn = slide.querySelector(".back-btn");
      const replayBtn = slide.querySelector("#replay-btn");

      finalBtn.style.opacity = "0";
      finalBtn.style.pointerEvents = "none";
      replayBtn.style.opacity = "0";
      replayBtn.style.pointerEvents = "none";

      // fade in to visibility
      setTimeout(() => {
        finalBtn.classList.add("visible");
        replayBtn.classList.add("visible");

        finalBtn.style.opacity = "1";
        finalBtn.style.pointerEvents = "auto";
        replayBtn.style.opacity = "1";
        replayBtn.style.pointerEvents = "auto";
      }, 4000);

      return;
    }

    setTimeout(() => {
      slide.classList.add("dissolving");

      setTimeout(() => {
        slide.classList.remove("visible", "dissolving");
        slide.classList.add("hidden");
        currentSlide++;
        showSlide(currentSlide);
      }, 2500);
    }, pauseDurations[currentSlide] || 5000);
  }
}); // this right here is the end of the DOMContentLoaded for my own records
