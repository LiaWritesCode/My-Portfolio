document.addEventListener("DOMContentLoaded", () => {
  // -------------- SECRET SIGIL --------------

  const sigil = document.querySelector(".sigil-link");
  const batCursor = 'url("/assets/bat.cur"), auto';

  document.addEventListener("mousemove", (e) => {
    const sigilRect = sigil.getBoundingClientRect();
    const sigilCenterX = sigilRect.left + sigilRect.width / 2;
    const sigilCenterY = sigilRect.top + sigilRect.height / 2;

    const dx = e.clientX - sigilCenterX;
    const dy = e.clientY - sigilCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Distance for hot and cold game with the cursor :)

    if (distance < 400) {
      document.body.style.cursor = batCursor;
    } else {
      document.body.style.cursor = "auto";
    }
  });

  // --------------  CONSTELLATION ANIMATIONS || ABOUT PAGE  --------------

  if (
  document.body.classList.contains("about-page") ||
  document.body.classList.contains("project-page") ||
  document.body.classList.contains("landing-page")
){
    const modal = document.getElementById("contact-modal");
    const closeButton = document.querySelector(".close-button");
    const triggers = document.querySelectorAll(".contact-trigger");
    const form = document.getElementById("modal");

    if (!modal || !closeButton || !form || triggers.length === 0) {
      console.warn("Modal elements missing on this page.");
      return;
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });

    closeButton.addEventListener("click", () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
      form.reset();
    });

    let modalJustOpened = false;

    function openModal() {
      modal.classList.remove("hidden");
      modalJustOpened = true;
      setTimeout(() => (modalJustOpened = false), 100);
    }

    window.addEventListener("click", function (event) {
      const isVisible = !modal.classList.contains("hidden");
      const clickedOutsideForm = !modal
        .querySelector(".form-content")
        .contains(event.target);
      const clickedTrigger = event.target.closest(".contact-trigger");

      if (isVisible && clickedOutsideForm && !modalJustOpened && !clickedTrigger) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
        form.reset();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
        form.reset();
      }
    });

    window.addEventListener("load", () => {
      form.reset();
    });
  }

  if (document.body.classList.contains("about-page")) {
    const inputs = document.querySelectorAll(".input-group input, .input-group textarea");
    const formElement = document.getElementById("modal");

    if (!formElement || inputs.length === 0) {
      console.warn("Form or inputs missing on About page.");
      return;
    }

    inputs.forEach((input) => {
      const label = input.previousElementSibling;

      input.addEventListener("input", () => {
        const hasValue = input.value.trim() !== "";
        label.style.display = hasValue ? "none" : "inline";
      });
    });

    formElement.addEventListener("reset", () => {
      inputs.forEach((input) => {
        const label = input.previousElementSibling;
        label.style.display = "inline";
      });

      const titles = [
        "Software Developer",
        "Code Cartographer",
        "Digital Mystic",
        "Ritual Architect",
        "Interface Alchemist",
        "Chaos-Coded Developer",
        "Debug Strategist",
      ];
      let current = 0;
      const switchTitle = document.getElementById("nameTitle");

      if (switchTitle) {
        switchTitle.textContent = titles[current];

        let previous = current;

        setInterval(() => {
          switchTitle.style.opacity = 0;

          setTimeout(() => {
            let next;
            do {
              next = Math.floor(Math.random() * titles.length);
            } while (next === previous);

            current = next;
            previous = current;

            switchTitle.textContent = titles[current];
            switchTitle.style.opacity = 1;
          }, 500);
        }, 3000);
      } else {
        console.warn("Title element not found.");
      }
    });
  }

  // PROJECT CARDS THAT HAVE EVENT LISTENERS FOR README TYPE INFORMATION
  if (document.body.classList.contains("project-page")) {
    const overlay = document.getElementById("project-overlay");
    const detailsContainer = overlay.querySelector(".project-details");
    const closeOverlayBtn = overlay.querySelector(".close-overlay");

    function getProjectDetails(id) {
      if (id === "discord-bot-humphrey") {
        return `
          <h2 class="card-header">Humphrey: Pomodoro Bot <img src="assets/images/github.png" class="github-project"></h2> 
          <div class="card-divider"></div>
          <div class="readme-container">
          <div class="readme-row"><p class="code-details">JavaScript / Discord.js / Node.js</p>
          <div class="status-block"><div class="readme-status"><p><span class="readme-highlight">Status:</span> Work in progress</p>
          </div></div></div></div>
          <p class="main-readme-text">Humphrey is the first Discord bot I coded in an effort to bring some variety to the pomodoro world within Discord communities. 
          Dedicated to my squirrel son, also Humphrey, I created this with love; a piece of me missing after having to release him to the wild (for his own good).</p>
          <h2 class="readme-header">{Features}</h2>
          <p class="main-readme-text"><ul class="readme-list"><li>To-do list tracking</li>
          <li>Reminders during active timers</li>
          <li>Track total pomodoros and time</li>
          <li>Custom pomodoro timers for focus AND breaks</li>
          <li>Notifications for focus and break starting and end times.</li>
          <li>Sassy words of wisdom</li></ul></p>
          <h2 class="readme-header">{Bot Commands}</h2>
          <p class="main-readme-text"><ul class="readme-list"><li>/start # #: if you want 30 minute focus and 5 minute breaks it would be /start 30 5</li>
          <li>/beginbreak to give you full control over when you actually take your break  if you're too deep in focus.</li>
          <li>/stats to get your pomodoro stats</li>
          <li>/reminder in case you need any reminders during the active timer</li>
          <li>/focus for when you are ready to start the focus timer after the initial timing set up</li>
          <li>/sass because my squirrel son was a fluffball of sass, of course his bot twin will be the same!</li>
          <li> /add, /todo, /remove to show you, add to, remove a task off your to-do list</li></ul>
          `;
      }

      if (id === "discord-bot-penumbra") {
        return `
            <h2 class="card-header">Penumbra: Emotional Support Bot</h2>
          <div class="card-divider"></div>
          <div class="readme-container">
          <div class="readme-row"><p class="code-details">JavaScript / Discord.js / Node.js</p>
          <div class="status-block"><div class="status-text"><p><span class="readme-highlight">Status:</span> Work in progress</p>
          </div></div></div></div>
          <p>Insert README information here</p>
          `;
      }
      return `
      <p>No details available for this project quite yet!</p>
      `;
    }

    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => {
        const projectId = card.dataset.project;
        const content = getProjectDetails(projectId);
        detailsContainer.innerHTML = content;

        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeOverlay() {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      detailsContainer.innerHTML = "";
    }

    closeOverlayBtn.addEventListener("click", closeOverlay);

    // escape key event listener!

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        closeOverlay();
      }
    });

    // clicking outside box to close!

    overlay.addEventListener("click", (e) => {
      if (!e.target.closest(".overlay-content")) {
        closeOverlay();
      }
    });
  }

  // -------------- SVG ORION STAR INFORMATION AND BEHAVIOR --------------
  if (document.body.classList.contains("about-page")) {
    const hoverBox = document.getElementById("hover-box");
    const hoverTitle = document.getElementById("star-title");
    const hoverSummary = document.getElementById("star-summary");
    const container = document.querySelector(".constellation-container");

    const hoverInfo = {
      rigel: { title: "rigel", summary: "Programming Languages" },
      bellatrix: { title: "bellatrix", summary: "Frameworks and Libraries" },
      saiph: { title: "saiph", summary: "Databases, Tools, and Platforms" },
      betelgeuse: { title: "betelgeuse", summary: "Soft Skills" },
      alnilam: { title: "alnilam", summary: "Curiosity and Learning" },
      mintaka: { title: "mintaka", summary: "Quirks and Curiosities" },
      alnitak: { title: "alnitak", summary: "Personal Crafts" },
    };

    document
      .querySelectorAll("g.star > circle, g.betelgeuse > circle, g.rigel > circle")
      .forEach((star) => {
        star.addEventListener("mousemove", (event) => {
          const id = star.id;
          const info = hoverInfo[id];

          if (!info) return;

          const rect = container.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          hoverTitle.textContent = info.title;
          hoverSummary.textContent = info.summary;
          hoverBox.style.display = "block";
          hoverBox.style.left = x + 10 + "px";
          hoverBox.style.top = y + 10 + "px";
        });

        star.addEventListener("mouseleave", () => {
          hoverBox.style.display = "none";
        });
      });

    /*
**4 surrounding stars in Orion:** 
- Programming languages 
- Frameworks & Libraries 
- Databases, tools, & platforms 
- Soft Skills 

**3 stars for Orion's Belt:** 
- Love of learning, going into philosophy, psychology, recently tested IQ 
- Random facts 
- Creative endeavors and learning 
(how i learn, creative dreams/endeavors that i want to work on or may be working on) */

    const starInfo = {
      rigel: `<h2 class="info-head"> >> Programming Languages</h2>
  <p class="info-text">Rigel is Orion's brightest star, the blue supergiant that burns with force. Its presence anchors the constellation at its foot, much like programming languages anchor every system, thus became the marker of all my language knowledge.</p>
  <ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>Python (currently learning)</li>
  </ul>
  `,

      bellatrix: `<h2 class="info-head"> >> Frameworks and Libraries</h2>
  <p class="info-text">Bellatrix is known as the female warrior and sits on Orion's left shoulder right where his tools can be wielded. Much like any tool, frameworks and libraries can be considered the weapons and armor of software.</p>
  <ul>
  <li>React</li>
  </ul>
   `,

      saiph: `<h2 class="info-head"> >> Databases, Tools, and Platforms</h2>
  <p class="info-text">Saiph is Orion's other foot and balances Rigel's burning with its dimmer light. Saiph reflects the silent logic that represents the databases and platforms that help stabilize and manage the languages of Rigel within its unseen infrastructure.</p>
  <ul>
  <li>Git & GitHub</li>
  <li>VS Code</li>
  <li>Atom</li>
  <li>Postman</li>
  </ul>
  `,

      betelgeuse: `<h2 class="info-head"> >> Soft Skills</h2>
  <div class="info-scroll-content">
<p class="info-text">Betelgeuse is the most known of this constellation as it should be because it is the heart of Orion. It is massive, unstable, red (green because of color palettes here), and nearing collapse, but it reflects the volatile power of soft skills when its done with jurisdiction like a flare.</p>
  <ul>
  <li>Problem solving & critical thinking</li>
  <li>Attention to detail</li>
  <li>Pattern recognition & strategic foresight</li>
  <li>Curiosity paired with self-learning</li>
  <li>Emotional Regulation</li>
  <li>Active listening & direct communication</li>
  <li>Adaptability & resilience under stress</li>
  <li>Self-awareness and patience</li>
  <li>Peacemaker & Empathetic feedback</li>
  <li>Time management and prioritization</li>
  <li>Taking accountability and initiative</li>
  </ul>
  </div>
  `,

      alnilam: `<h2 class="info-head"> >> An Inquisitive Mind</h2>
  <div class="info-scroll-content">
<p class="info-text">Alnilam, the central star of Orion's famous belt. It is pure and radiant as ever and perfectly reflects my intellectual luminosity.</p>
  <ul class="justified-info">
  <li>Gloat moment: 125 IQ with a recent test done in July of 2025</li>
  <li>With the above said, I'm aware the IQ is not the only fragment of true intelligence</li>
  <li>An unending love for learning anything and everything that catches my eye or pertains to my specialties</li>
  <li>Favorite subjects are Psychology and Philosophy (of course Computer Science too)</li>
  <li>Love doing deep dives or as some say, go down the rabbit hole</li>
  <li>Self taught in software engineering and the architecture of the digital world</li>
  <li>Easily switches between abstract theories and practical implementation when solving problems</li>
  <li>No relying on credentials, prefer to prove through results... something tangible</li>
  <li>Learning for me is constant with no goal in mind except to learn. It's the best way to process the world</li>
  <li>I tend to process information bottoms-up, starting with the details and working outward</li>
  </ul>
  </div>
  `,

      mintaka: `<h2 class="info-head"> >> Quirks and Curiosities</h2>
  <div class="info-scroll-content">
<p class="info-text">Mintaka is considered the gateway of where light meets shadow which highlights the duality that I personally live by. Consider it a ritual sparkle!</p>
  <ul>
  <li>Avid coffee addict</li>
  <li>I am the proud mother of a squirrel son even though I had to release him for his own good</li>
  <li>I once read 3 books that all had around 500-800 pages in a single day because I had nothing else going on</li>
  <li>I used to run a "professional" book review blog where I got free books. I coded the blogs by manipulating existing HTML and CSS</li>
  <li>I have a deep love for the occult</li>
  <li>i prefer to type in lowercase in personal spaces</li>
  <li>My favorite philosophies are a mixture of Nietzsche, Socrates, and Freud</li>
  <li>I am an avid learner in Carl Jung's shadow theory and archetypes in Psychology</li>
  <li>HUGE PC gamer; current favorite game? Hunt: Showdown</li>
  <li>I've written 5 YA Fantasy books, some self-published under a pseudonym</li>
  <li>My book collection? 3 filled bookcases and packing containers full of them</li>
  <li>I learned how to train dogs :)</li>
  <li>I know <b>a lot</b> about herbs and poisons because I used to roleplay on Red Dead RP servers as a character who was a toxicologist</li>
  </ul>
  </div>
  `,

      alnitak: `<h2 class="info-head"> >> Personal Craft</h2>
  <p class="info-text">Alnitak is the closest to the Horsehead Nebula which is a region where stars are birthed. It was the perfect pick to depict my personal projects, writing, and anything else creative.</p>
  <ul>
  <li>Currently working on a personal app project that may or may not be hinted at in some way on this website</li>
  <li>Have plans to write another book!</li>
  <li>Creating a separate website as an archive to all my writing except for the novels I wrote</li>
  <li>Pursuing cybersecurity knowledge to strengthen privacy architecture and protect future projects</li>
  </ul>
  `,
    };

    const mainText = document.getElementById("main-info-text");
    const starText = document.getElementById("star-info");
    const closeButton = document.getElementById("close-btn");

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        starText.style.display = "none";
        mainText.style.display = "block";
        document.querySelector(".info-text").style.display = "block";
        document.getElementById("star-header").innerHTML = "";
        closeButton.style.display = "none";
        document.getElementById("info-box").scrollTop = 0;
      });
    }

    document
      .querySelectorAll("g.star > circle, g.betelgeuse > circle, g.rigel > circle")
      .forEach((star) => {
        star.addEventListener("click", () => {
          const id = star.id;
          const message = starInfo[id];

          if (message) {
            mainText.style.display = "none";
            document.querySelector(".info-text").style.display = "none";
            starText.style.display = "block";
            if (closeButton) closeButton.style.display = "block";

            // Extract header and inject body
            const ghostDiv = document.createElement("div");
            ghostDiv.innerHTML = message;

            const header = ghostDiv.querySelector("h2");
            const dynamicTitle = document.getElementById("star-header");

            if (header && dynamicTitle) {
              dynamicTitle.innerHTML = "";
              dynamicTitle.appendChild(header);
            }

            ghostDiv.querySelector("h2")?.remove();

            starText.innerHTML = `<div class="star-info-wrapper">${ghostDiv.innerHTML}</div>`;
          }
        });
      });

    // -------------- SVG ANIMATED TWINKLING STARS --------------

    const stars = Array.from(document.querySelectorAll(".star, .betelgeuse, .rigel"));
    let twinkledStars = new Set();

    function twinkleStar(star) {
      star.style.opacity = "0.3";
      star.style.filter = "brightness(1.8) drop-shadow(0 0 12px #fff)";

      return new Promise((resolve) => {
        setTimeout(() => {
          star.style.opacity = "1";
          star.style.filter = "brightness(3.5) drop-shadow(0 0 20px #fff)";
        }, 600);

        setTimeout(() => {
          star.style.filter = "brightness(1) drop-shadow(0 0 4px #fff)";
          resolve();
        }, 1200);
      });
    }

    function twinkleBetelgeuse(star) {
      star.style.opacity = "0.3";
      star.style.filter = "drop-shadow(0 0 12px #c5ff47)";

      return new Promise((resolve) => {
        setTimeout(() => {
          star.style.opacity = "1";
          star.style.filter = "drop-shadow(0 0 20px #c5ff47)";
        }, 600);

        setTimeout(() => {
          star.style.filter = "drop-shadow(0 0 4px #c5ff47)";
          resolve();
        }, 1200);
      });
    }

    function twinkleRigel(star) {
      star.style.opacity = "0.3";
      star.style.filter = "drop-shadow(0 0 12px #b6a8e9)";

      return new Promise((resolve) => {
        setTimeout(() => {
          star.style.opacity = "1";
          star.style.filter = "drop-shadow(0 0 20px #b6a8e9)";
        }, 600);

        setTimeout(() => {
          star.style.filter = "drop-shadow(0 0 4px #b6a8e9)";
          resolve();
        }, 1200);
      });
    }

    let shuffledStars = [];
    let starIndex = 0;

    function shuffleStars() {
      shuffledStars = [...stars].sort(() => Math.random() - 0.5);
      starIndex = 0;
    }

    function rippleConstellation() {
      stars.forEach((star, i) => {
        setTimeout(() => {
          star.classList.add("ripple");
          setTimeout(() => {
            star.classList.remove("ripple");
          }, 1000);
        }, i * 100);
      });
    }

    async function beginTwinkling() {
      if (starIndex >= shuffledStars.length) {
        rippleConstellation();
        shuffleStars();
      }

      const star = shuffledStars[starIndex];
      if (star.classList.contains("betelgeuse")) {
        await twinkleBetelgeuse(star);
      } else if (star.classList.contains("rigel")) {
        await twinkleRigel(star);
      } else {
        await twinkleStar(star);
      }

      starIndex++;

      const delay = Math.random() * 2000 + 1000;
      setTimeout(beginTwinkling, delay);
    }

    shuffleStars();
    beginTwinkling();
  }
  // --------------  IMAGE CAROUSEL ANIMATION  --------------
  if (document.body.classList.contains("landing-page")) {
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    let currentIndex = 0;

    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    });

    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    });

    updateCarousel();

    setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }, 5000);
  }
});
