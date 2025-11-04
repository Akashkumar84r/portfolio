document.addEventListener("click", (e) => {
  const sparkCount = 12; // A good number for this effect

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement("span");
    spark.classList.add("spark");

    // --- THE FIX ---
    // We use pageY and pageX to get the click position
    // relative to the entire document, not just the visible window.
    spark.style.top = `${e.pageY}px`;
    spark.style.left = `${e.pageX}px`;
    // --- END FIX ---

    // 1. Get a random angle
    const angle = Math.random() * 360; // Random angle from 0 to 360 degrees

    // 2. Get a random distance (Tighter spread)
    const randomDistance = Math.random() * 50 + 40; // 40px to 90px

    // 3. Set the CSS variables
    spark.style.setProperty("--rotation", `${angle}deg`);
    spark.style.setProperty("--distance", `${randomDistance}px`);

    // Set a random size for the line spark
    const randomLength = Math.random() * 10 + 5; // Length between 5px and 15px
    const randomThickness = Math.random() * 2 + 1; // Thickness between 1px and 3px

    spark.style.width = `${randomLength}px`;
    spark.style.height = `${randomThickness}px`;

    document.body.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 700); // 700ms matches animation duration
  }
});

const savedTheme = localStorage.getItem("theme");
const initialBotTheme = savedTheme === "dark-mode" ? "dark" : "light";

let isBotpressReady = false;
let pendingTheme = null;
let isBotOpen = false;

// const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//   let currentTheme = mediaQuery.matches ? 'dark' : 'light';

//   // 3. Add a listener to update the theme if the user changes their system settings
//   mediaQuery.addEventListener('change', (event) => {
//     const newTheme = event.matches ? 'dark' : 'light';

//     // Check if the botpress window exists and send the update event
//     if (window.botpress) {
//       window.botpress.sendEvent({
//         type: 'setConfig',
//         payload: {
//           themeMode: newTheme
//         }
//       });
//     }
//   });

window.botpress.on("webchat:ready", () => {
  //   window.botpress.open();

  isBotpressReady = true; // 1. Set the flag

  // 2. Check if a theme was clicked while loading
  if (pendingTheme) {
    // If yes, send the update now
    window.botpress.sendEvent({
      type: "setConfig",
      payload: { themeMode: pendingTheme },
    });
    pendingTheme = null; // Clear the pending theme
  }
});
window.botpress.init({
  botId: "fb59d5b6-3eff-4d9f-9010-a392c579574e",
  configuration: {
    version: "v2",
    composerPlaceholder: "Type your message here....",
    botName: "Lucifer",
    botAvatar:
      "https://files.bpcontent.cloud/2025/10/22/13/20251022130145-IBSS9KL0.png",
    botDescription: "Akash's Personal Al Chatbot",

    website: {},
    email: {
      title: "parasfworld07@gmail.com",
      link: "parasfworld07@gmail.com",
    },
    phone: {
      title: "",
      link: "",
    },
    termsOfService: {},
    privacyPolicy: {},
    color: "#005eff",
    variant: "solid",
    headerVariant: "solid",
    themeMode: initialBotTheme,
    fontFamily: "inter",
    radius: 4,
    feedbackEnabled: false,
    footer: "[âš¡ by Botpress](https://botpress.com/?from=webchat)",
    additionalStylesheetUrl:
      "https://files.bpcontent.cloud/2025/10/21/13/20251021130811-1TVJPKUP.css",
    allowFileUpload: false,
    soundEnabled: false,
    proactiveMessageEnabled: false,
    proactiveBubbleMessage: "Hi! ðŸ‘‹ Need help?",
    proactiveBubbleTriggerType: "afterDelay",
    proactiveBubbleDelayTime: 10,
  },
  clientId: "b09490bd-f181-44ab-84cc-4f77fd599ff7",
  selector: "#webchat",
});

window.botpress.on("webchat:open", () => {
  isBotOpen = true;
});

window.botpress.on("webchat:close", () => {
  isBotOpen = false;
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Function to update the toggle button's emoji
  function updateThemeIcon() {
    if (body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = "☀️"; // Sun emoji for light mode
    } else {
      themeToggle.innerHTML = "🌙"; // Moon emoji for dark mode
    }
  }

  // Toggle hamburger menu and animate icon
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // This is now inside, so it can see 'navLinks' and 'hamburger'
  document.addEventListener("click", function (event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    // If the menu is active and the click was NOT on the menu or the hamburger, close it
    if (
      navLinks.classList.contains("active") &&
      !isClickInsideNav &&
      !isClickOnHamburger
    ) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });

  // Toggle dark/light mode
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    updateThemeIcon(); // Update the icon on click

    // Save theme preference to localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark-mode");

      //     //start

      //    if (isBotpressReady) {
      //     window.botpress.sendEvent({
      //       type: 'setConfig',
      //       payload: { themeMode: 'dark' }
      //     });
      //   }
      //   //end
    } else {
      localStorage.removeItem("theme");

      //     // --- ADD THIS BLOCK ---
      //   if (isBotpressReady) {
      //     window.botpress.sendEvent({
      //       type: 'setConfig',
      //       payload: { themeMode: 'light' }
      //     });
      //   }
      //   // --- END ADD ---
    }

    // 2. This is the new logic to fix the refresh problem
    if (isBotpressReady) {
      // Bot is ready: Send the command immediately.
      window.botpress.sendEvent({
        type: "setConfig",
        payload: { themeMode: newTheme },
      });
    } else {
      // Bot is NOT ready: Store the theme in our 'pending' variable.
      // The "webchat:ready" function (Change 2) will handle it.
      pendingTheme = newTheme;
    }
  });

  // Check for saved theme preference on page load
  if (localStorage.getItem("theme") === "dark-mode") {
    body.classList.add("dark-mode");
  }

  updateThemeIcon(); // Set the correct icon on initial page load
});

document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".text");

  const phrases = [
    "GET at JSW Steel, Dolvi Works",
    "Mechanical Engineer from VSSUT",
    "GET at JSW Steel, Dolvi Works",
    "Mechanical Engineer from VSSUT",
  ];

  // State variables
  let phraseIndex = 0;
  let charIndex = 0;
  let isTyping = true;

  // --- Updated Speeds ---
  const typeSpeed = 80; // FASTER typing (was 120)
  const deleteSpeed = 40; // FASTER deleting (was 60)
  const pauseEnd = 3000; // LONGER pause after typing (was 2000)
  const pauseStart = 500; // Pause after deleting (same)

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    let timeout = isTyping ? typeSpeed : deleteSpeed;

    if (isTyping) {
      // --- TYPING LOGIC ---
      textElement.textContent = currentPhrase.substring(0, charIndex);
      charIndex++;

      if (charIndex > currentPhrase.length) {
        isTyping = false;
        timeout = pauseEnd; // Use LONGER pause
      }
    } else {
      // --- DELETING LOGIC ---
      textElement.textContent = currentPhrase.substring(0, charIndex);
      charIndex--;

      if (charIndex < 0) {
        isTyping = true;
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeout = pauseStart;
      }
    }

    setTimeout(typeEffect, timeout);
  }

  // Start the effect
  if (textElement) {
    typeEffect();
  }
});

// --- 1. SCROLL-SPY LOGIC ---

const sections = document.querySelectorAll(".scroll-section");
const dockItems = document.querySelectorAll(".dock-item");

function updateActiveSection() {
  let currentActiveId = "";

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150) {
      currentActiveId = section.getAttribute("id");
      break;
    }
  }

  if (!currentActiveId && window.scrollY < 200) {
    currentActiveId = "home";
  }

  dockItems.forEach((item) => {
    const linkId = item.querySelector("a").getAttribute("href").substring(1);
    if (linkId === currentActiveId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", updateActiveSection);
document.addEventListener("DOMContentLoaded", updateActiveSection);

// --- 2. MOBILE MENU TOGGLE LOGIC ---

const mobileToggle = document.getElementById("mobile-menu-toggle");
const mainDock = document.getElementById("main-dock");
const dockLinks = document.querySelectorAll(".dock-item a");

// Toggle the 'menu-open' class on the body
mobileToggle.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

// Close menu when a dock link is clicked
dockLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
  });
});

// --- NEW: CLOSE MENU ON CLICK OUTSIDE ---

// Add a click listener to the whole window
window.addEventListener("click", (event) => {
  // First, check if the mobile menu is open
  if (document.body.classList.contains("menu-open")) {
    // Check if the click was *inside* the dock
    const isClickInsideDock = mainDock.contains(event.target);

    // Check if the click was *on* the toggle button
    const isClickInsideToggle = mobileToggle.contains(event.target);

    // If the click was NOT inside the dock AND NOT on the toggle, close the menu
    if (!isClickInsideDock && !isClickInsideToggle) {
      document.body.classList.remove("menu-open");
    }
  }
});

// Wait for the HTML document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the button element using its ID
  const refreshButton = document.getElementById("theme-toggle");

  // Check if the button actually exists before adding a listener
  if (refreshButton) {
    // Add a click event listener to the button
    refreshButton.addEventListener("click", () => {
      // When the button is clicked, reload the current page
      location.reload();
    });
  }
});

// Skill start here
document.addEventListener("DOMContentLoaded", function () {
  const skills = document.querySelectorAll("li[data-score]");
  skills.forEach((skill) => {
    const score = parseFloat(skill.dataset.score);
    const starContainer = skill.querySelector(".stars");
    const roundedScore = Math.round(score * 2) / 2;
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedScore) {
        starsHTML += "★";
      } else {
        starsHTML += '<span class="star empty">☆</span>';
      }
    }
    starContainer.innerHTML = starsHTML;
  });
});

// Project start here

// --- Store all content in a single place (easy to manage) ---
const modalContent = {
  1: {
    title: "BAJA SAE 2025",
    // description:
    //   "Project Alpha is focused on developing a new framework for AI-driven data analysis. It aims to improve prediction accuracy by 20%.",

    role: "Role: Team Manager & Tech Head",
    description: `-> The eBAJA SAEINDIA 2025 physical round was hosted at BVRIT, Narsapur, Hyderabad from February 20-25.
-> It is a premier engineering competition where student teams design and build a single-seat, all-electric off-road vehicle.
-> The 2025 event celebrated the 10th anniversary of eBAJA, highlighting its role in pioneering electric mobility education in India.
-> The competition features rigorous technical inspections, especially for the high-voltage battery pack and electric powertrain, with an option for 2WD or 4WD.
-> Evaluation includes both Static Events (Design, Cost, Sales) and Dynamic Events (Acceleration, Maneuverability, and a flagship 4-hour Endurance race).
-> It serves as a major industry recruitment hub, with a dedicated HR Meet for companies in the automotive and EV sectors to scout talent.
-> The event saw large-scale participation with over 85 teams from engineering institutions across India.

`,
    keyrespo: `-> Led a 25-member team in the design and fabrication of E-IoKE 3.0, an all-terrain electric vehicle.
-> Directed technical design efforts, emphasizing torque flow optimization and drivetrain efficiency.
-> Coordinated chassis, suspension, and electrical teams to ensure seamless system integration.
-> Performed CAD modeling and FEA analysis in SolidWorks to validate structural strength and performance.
-> Implemented cost-effective and sustainable design solutions using repurposed materials.

`,
    achive: `-> Built the first 4WD ATV from any university in Odisha to compete at the national level.
-> Successfully cleared the Mechanical Technical Inspection at the competition.
`,

    skills:
      "Skills Used: Manufacturing Processes, SolidWorks, CAD/CAM, ANSYS, Lotus, Team Management, Ladership",
    downloadLink: "/source/bajasae2025.jpg",
    certificateLink: "#",
  },
  2: {
    title: "Aravalli Terrain Vehicle Championship (20th–24th March 2024)",
    role: "Role: Technical & Transmission Head",
    description: `-> A major national engineering competition held in Pune in March 2024, where student teams design, build, and race off-road vehicles.
-> Featured two vehicle categories: traditional Combustion Engine and Electric Powered (eATVC), each with a significant prize pool.
-> Attracted large-scale participation with over 80 colleges and 2500+ students competing.
-> Evaluates teams through a comprehensive series of Static Events (Design, Cost, Sales) and Dynamic Events (Acceleration, Maneuverability, Endurance).
-> The final and most demanding test is a multi-hour Endurance Race that rigorously tests vehicle durability and reliability.
-> Serves as a crucial industry bridge, featuring a dedicated Job Expo where automotive and EV companies recruited talented participants.
-> Provides hands-on experience in practical engineering, project management, and sustainable design, mirroring real-world industry challenges.

`,
    keyrespo: `-> Led a 25-member team in designing and fabricating E-IoKE 2.0, an all-terrain electric vehicle.
-> Directed transmission design, focusing on gear ratios, torque flow, and drivetrain efficiency.
-> Coordinated chassis, suspension, and electrical teams for smooth system integration.
-> Conducted CAD modeling and FEA in SolidWorks to ensure strength and performance.
-> Applied cost-effective and sustainable design practices using repurposed materials.

`,
    achive: `-> Secured All India Rank (AIR) 2 in Mega Marketing Round for outstanding project presentation and brand strategy.
-> Achieved AIR 4 in Business Planning, demonstrating technical feasibility and financial sustainability of the vehicle concept.
-> Earned AIR 6 in Cost Presentation and AIR 7 in Design Report, showcasing technical depth and optimization.
-> Ranked AIR 8 Overall, among top national teams, recognizing excellence in innovation, teamwork, and execution.
`,
    skills:
      "Skills Used: Design, Manufacturing, Assembly, CAD/CAM, Team Leadership, SolidWorks",
    downloadLink: "/source/atvc2024.jpg",
    certificateLink:
      "https://drive.google.com/file/d/1ODNS7bO1xY1affOxBb4qqbstBPlzGwRW/view?usp=sharing",
  },
  3: {
    title: "BAJA SAE 2023",
    role: "Role: Design & Transmission Head",
    description: `-> The eBAJA 2023 competition was a dedicated national event for student-designed and built electric all-terrain vehicles, held separately from the combustion engine category for the first time.
-> Its physical dynamic round took place at Chitkara University, Baddi, Himachal Pradesh from April 5-8, 2023.
-> The competition's core technical challenge was the design and integration of a full electric powertrain, including a lithium-ion battery pack and motor.
-> A key rule change for 2023 was a grueling 4-hour endurance race, testing the limits of battery thermal management and vehicle durability.
-> Teams were incentivized with bonus points for developing more complex 4-wheel-drive systems, promoting innovation in electric drivetrain technology.
-> Evaluation was comprehensive, combining static events (design, cost), virtual dynamic simulations, and physical performance tests.
-> It served as a major industry recruitment platform, connecting automotive and EV companies with engineering talent skilled in electric vehicle development.

`,
    keyrespo: `-> Operated power tools to support the fabrication and assembly of the "E-IoKE 1" off-road vehicle.
-> Contributed to the design and development process as a member of a 28-person engineering team.
-> Applied specialized knowledge in the Transmission department, handling the vehicle's powertrain system.

`,
    achive: `-> Successfully built and competed with "E-IoKE 1," a pioneering electric all-terrain vehicle (EV ATV) for BAJA SAEINDIA.
-> Achieved a landmark status as the first team from Odisha to design and fabricate an EV ATV for the national BAJA SAEINDIA competition.

`,
    skills:
      "Skills Used: Manufacturing, Designing, Teamwork, Transmission Technique",
    downloadLink: "/source/bajasae2023.png",
    certificateLink:
      "https://drive.google.com/file/d/1zPThbO-VQXPhFfcrAdgM_xSTaiaOF4IR/view?usp=sharing",
  },
  4: {
    title:
      "Design & Development of a Thermoelectric-Based Instant Beverage Chiller",
    role: "Major & Minor Project at VSSUT",
    description: `-> The thesis details the design, development, and testing of a portable, instant beverage chiller using thermoelectric cooling technology as an alternative to conventional refrigeration.
-> The system is centered around the TEC1-12704 Peltier module, which uses the Peltier effect to create a temperature difference, transferring heat from the beverage to a heat sink.
-> The project was motivated by the need for a fast, portable, and eco-friendly cooling solution for use in domestic, outdoor, and small commercial settings where traditional refrigerators are impractical.
-> A key feature of the design is its emphasis on portability and sustainability, incorporating a 12V battery pack and a 10W solar panel for off-grid operation.
-> The work followed a standard engineering process, including literature review, theoretical principles, conceptual design, feasibility analysis with COP calculation, experimental testing, and cost analysis.

`,
    keyrespo: `-> The team was responsible for the entire product development lifecycle, from conceptualizing the idea and selecting key components to creating CAD models and circuit diagrams.
-> Essential engineering calculations were performed, including thermal resistance network analysis, heat absorption/rejection calculations, and determining the system's theoretical Coefficient of Performance.
-> Responsibilities included physically building the functional prototype by integrating mechanical components, electrical systems, and the solar charging circuit.
-> Performance tests were designed and conducted, measuring temperature drop over time, energy consumption, and battery life using sensors and digital multimeters.
-> The team critically analyzed test results, identified system shortcomings, and proposed data-driven explanations for limitations.

`,
    achive: `-> A working prototype was successfully built that cools a 500 mL beverage from 30°C to 12°C in just 4 minutes, validating the core concept.
-> The project achieved a calculated Coefficient of Performance of 2.19, demonstrating energy efficiency by removing over two units of heat energy per unit of electrical energy consumed.
-> Successful integration of a solar panel made the device self-sustaining and practical for outdoor and off-grid use, aligning with eco-friendly goals.
-> The team delivered a functional prototype at a total material cost of 8,500 INR, demonstrating cost-effective innovation.
-> A thorough feasibility study was conducted, including thermal performance modeling and detailed cost breakdown, adding academic and practical value.
-> Specific, well-reasoned recommendations for future improvements were provided, showing deep engagement with engineering challenges.

`,
    skills:
      "Skills Used: Design, SolidWorks, CAD, Electrials, Thermocouple, Circuit Design, Presentation Skills",
    downloadLink: "/source/thesis.pdf",
    certificateLink: "/source/thesiscertificate.jpg",
  },
  5: {
    title: "Fundamentals of Manufacturing",
    role: "NPTEL Online Certification Course",
    description: `-> A joint initiative by IITs and IISc, funded by the Indian Ministry of Education, to provide high-quality education in STEM and other fields.
-> It operates on a MOOC model, offering free access to course content from top-tier faculty for learners worldwide.
-> Courses are structured in 4, 8, or 12-week formats, with materials like video lectures and assignments available at no cost.
-> Provides an optional, paid certification involving a proctored exam, with successful candidates receiving a certificate from the respective IIT/IISc.
-> The certificates are recognized for credit transfer in many Indian universities through the Academic Bank of Credits (ABC) system.

`,
    keyrespo: `-> Provides a comprehensive overview of core manufacturing processes, including casting, forming, machining, and joining.
-> Covers essential engineering economics, teaching how to select the right process using criteria like break-even analysis.
-> Delves into material science fundamentals, explaining how processes affect material properties and the use of heat treatment.
-> Includes in-depth technical design principles for operations like gating systems in casting and tool life calculation in machining.
-> Serves as a foundational course for selecting, designing, and optimizing manufacturing operations in engineering fields.

`,
    achive:
      "-> Awarded a Silver Medal (77/100) for mastering material properties, manufacturing processes, and production optimization in an advanced engineering curriculum.",
    skills:
      "Skills Used: Manufacturing Technique, Quality Control, Systematic Approach",
    downloadLink: "https://onlinecourses.nptel.ac.in/noc20_me67/preview",
    certificateLink:
      "https://drive.google.com/file/d/1MWkoWUmR3GCIOUW9nvK601JDjQRw0sck/view?usp=sharing",
  },
  6: {
    title: "My Personal Portfolio",
    role: "Made using HTML, CSS & JavaScript",
    description: `-> A portfolio acts as an evidence-based professional profile, providing concrete proof of your skills, projects, and accomplishments.
-> Unlike a resume, which only lists qualifications, a portfolio demonstrates your real-world work and outcomes through tangible examples.
-> It serves as a powerful tool for professionals across all fields—tech, marketing, business, and beyond—by showcasing your best work in a compelling and memorable way.

`,
    keyrespo: "All Mine",
    achive: "The Working",
    skills: "Skills Used: HTML, CSS, JavaScript, Botpress, EmailJS",
    downloadLink: "#",
    certificateLink: "#",
  },
};

// --- Get references to the HTML elements ---
const openModalBtns = document.querySelectorAll(".open-modal-btn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalSkills = document.getElementById("modalSkills"); // New element reference
const modalDownloadLink = document.getElementById("modalDownloadLink");
const modalCertificateLink = document.getElementById("modalCertificateLink"); // New element reference
const modalrole = document.getElementById("modalrole");
const modalkeyrespo = document.getElementById("modalkeyrespo");
const modalachive = document.getElementById("modalachive");

// --- Event Listeners ---

// Loop through all "View Details" buttons and add a click listener
openModalBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the link from navigating

    // 1. Get the unique ID from the button's data attribute
    const contentId = btn.dataset.contentId;

    // 2. Find the correct content from our object
    const content = modalContent[contentId];

    // 3. Update the modal's content
    if (content) {
      modalTitle.textContent = content.title;
      modalrole.textContent = content.role;
      modalText.textContent = content.description;
      modalkeyrespo.textContent = content.keyrespo;
      modalachive.textContent = content.achive;
      modalSkills.textContent = content.skills; // Update skills text
      modalDownloadLink.href = content.downloadLink;
      modalCertificateLink.href = content.certificateLink; // Update certificate link
    }

    // 4. Show the modal
    modalOverlay.classList.add("show");
    document.body.classList.add("modal-open"); // --- NEW: Lock body scroll
  });
});
// metaElement.innerHTML = `<strong>Role:</strong> ${projectData.role}`;
// Function to close the modal
const closeModal = () => {
  modalOverlay.classList.remove("show");
  document.body.classList.remove("modal-open"); // --- NEW: Unlock body scroll
};

// Close the modal when the close button (X) is clicked
closeModalBtn.addEventListener("click", closeModal);

// Close the modal if the user clicks on the overlay
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Safe side
// document.addEventListener('DOMContentLoaded', () => {

//     // --- 1. PROJECT DATA ---
//     const projectDetailsData = {
//         '1': {
//             title: 'Advanced CAD Modeling',
//             description: 'This project focused on the design and analysis of a complex mechanical assembly using modern CAD software. The primary objective was to optimize the structure for weight reduction while maintaining structural integrity under simulated stress conditions. My role involved leading the design phase, performing finite element analysis (FEA), and producing detailed manufacturing blueprints.',
//             thesisUrl: '#',
//             certificateUrl: '#'
//         },
//         '2': {
//             title: 'Robotic Arm Simulation',
//             description: 'A comprehensive simulation of a 6-axis robotic arm to test pathfinding algorithms and controller efficiency. We developed a realistic physics-based model and tested various inverse kinematics solvers. My role was to develop the simulation environment in Python and analyze the performance data from different testing scenarios.',
//             thesisUrl: '#',
//             certificateUrl: '#'
//         },
//         '3': {
//             title: 'Component Optimization',
//             description: 'This project involved the fabrication and assembly of a new prototype. A key part of the process was the optimization of individual components for manufacturability and cost reduction. I was responsible for material selection and refining the assembly workflow.',
//             thesisUrl: '#',
//             certificateUrl: '#'
//         },
//         '4': {
//             title: 'AI Predictive Maintenance',
//             description: 'Developed an AI/ML model to predict equipment failures based on sensor data. Using Python and popular data science libraries, the model was trained on historical data to identify patterns preceding a malfunction, allowing for proactive maintenance.',
//             thesisUrl: '#',
//             certificateUrl: '#'
//         },
//         '5': {
//             title: 'Mobile App UI/UX',
//             description: 'Led the UI/UX design for a new lifestyle mobile application. The process involved user research, creating wireframes and mockups in Figma, and developing interactive prototypes to test with user groups before handing off to the development team.',
//             thesisUrl: '#',
//             certificateUrl: '#'
//         },
//         '6': {
//             title: 'Web App Development',
//             description: 'Full-stack development of a web application using the MERN stack (MongoDB, Express, React, Node.js). I was responsible for building the RESTful API, designing the front-end components in React, and managing the database.',
//             thesisUrl: '#',
//             certificateUrl: '#'
//         },
//     };

//     // --- 2. GET DOM ELEMENTS ---
//     const mainContainer = document.getElementById('main-container');
//     const detailsPanel = document.getElementById('details-panel');
//     const closeDetailsBtn = document.getElementById('close-details-btn');
//     const viewDetailLinks = document.querySelectorAll('.details-link');

//     const detailsTitle = document.getElementById('details-title');
//     const detailsDescription = document.getElementById('details-description');
//     const downloadBtn = document.getElementById('download-thesis-btn');
//     const certificateBtn = document.getElementById('view-certificate-btn');

//     // --- 3. EVENT LISTENERS ---
//     viewDetailLinks.forEach(link => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault();
//             const projectId = link.dataset.id;
//             const projectData = projectDetailsData[projectId];

//             if (projectData) {
//                 detailsTitle.textContent = projectData.title;
//                 detailsDescription.textContent = projectData.description;
//                 downloadBtn.href = projectData.thesisUrl;
//                 certificateBtn.href = projectData.certificateUrl;

//                 mainContainer.classList.add('details-view-active');
//             }
//         });
//     });

//     closeDetailsBtn.addEventListener('click', () => {
//         mainContainer.classList.remove('details-view-active');
//     });

//     modalOverlay.addEventListener('click', (event) => {
//             if (event.target === modalOverlay) {
//                 closeModal();
//             }
//         });

// });

// Education starts here
document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Optional: stop observing once it's visible
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the item is visible
    }
  );

  timelineItems.forEach((item) => {
    observer.observe(item);
  });

  // --- "View More/Less" Button Functionality ---
  const toggleViewBtn = document.getElementById("toggle-view-btn");
  const experienceSection = document.getElementById("experience-section");
  const btnText = toggleViewBtn.querySelector("span");

  toggleViewBtn.addEventListener("click", () => {
    if (experienceSection.classList.contains("section-expanded")) {
      // Collapse
      experienceSection.classList.remove("section-expanded");
      btnText.textContent = "View More";
      // Scroll to top of the section when collapsing
      experienceSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Expand
      experienceSection.classList.add("section-expanded");
      btnText.textContent = "View Less";
    }
  });
});

// contact form

function sendMail() {
  const templateParams = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_qjqyhyo", "template_kjf6fka", templateParams)
    .then(alert("Email Sent!"));
}
