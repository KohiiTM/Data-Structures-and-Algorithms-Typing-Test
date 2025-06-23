import {
  getRandomFallbackTopic,
  getAllFallbackTopics,
  getAllFallbackCategories,
} from "./fallbackData.js";

const API_BASE_URL = "https://dsa-typing-api.onrender.com";

const API_ENDPOINTS = {
  topics: `${API_BASE_URL}/api/topics`,
  randomTopic: `${API_BASE_URL}/api/topics/random`,
  categories: `${API_BASE_URL}/api/categories`,
  health: `${API_BASE_URL}/health`,
};

const textDisplay = document.getElementById("textDisplay");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const newTextButton = document.getElementById("newTextButton");
const repeatButton = document.getElementById("repeatButton");
const shuffleButton = document.getElementById("shuffleButton");
const lowercaseToggle = document.getElementById("lowercaseToggle");
const zenModeToggle = document.getElementById("zenModeToggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const fontButtons = document.querySelectorAll(".font-btn");
const topicTitle = document.getElementById("topicTitle");

let currentText = "";
let startTime = null;
let timer = null;
let correctChars = 0;
let totalChars = 0;
let isLowercase = false;
let isZenMode = false;
let currentIndex = 0;
let typedHistory = [];
let lastTextIndex = -1;
let totalTime = 0;
let lastUpdateTime = null;
let completedWords = 0;
let currentWordStart = 0;
let allTopics = [];
let categories = [];
let isLoading = false;
let isRepeatMode = false;
let isShuffleMode = false;
let currentTopicIndex = -1;
let useLocalData = true;

const modifierKeys = [
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "CapsLock",
  "Tab",
  "Enter",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "Insert",
  "Delete",
  "Escape",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
];

const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("closeMenu");

const topicMenuToggle = document.getElementById("topicMenuToggle");
const topicMenuCollapse = document.getElementById("topicMenuCollapse");
const topicMenu = document.querySelector(".topic-menu");
const dataStructuresList = document.getElementById("dataStructuresList");
const algorithmsList = document.getElementById("algorithmsList");
const systemDesignList = document.getElementById("systemDesignList");
const problemSolvingList = document.getElementById("problemSolvingList");

topicMenuCollapse.addEventListener("click", () => {
  topicMenu.classList.toggle("expanded");
});

topicMenuToggle.addEventListener("click", () => {
  topicMenu.classList.toggle("active");
});

function populateTopicList(listElement, topics) {
  topics.forEach((topic) => {
    const topicItem = document.createElement("div");
    topicItem.className = "topic-item";
    topicItem.textContent = topic.topic;
    topicItem.addEventListener("click", () => {
      document
        .querySelectorAll(".topic-item")
        .forEach((item) => item.classList.remove("active"));
      topicItem.classList.add("active");
      currentText = topic.content;
      topicTitle.textContent = topic.topic;
      displayText();
      resetTest();
    });
    listElement.appendChild(topicItem);
  });
}

function categorizeTopics(topics) {
  const categories = {
    "Data Structures": [],
    Algorithms: [],
    "System Design": [],
    "Problem Solving": [],
  };

  topics.forEach((topic) => {
    if (categories[topic.category]) {
      categories[topic.category].push(topic);
    }
  });

  return categories;
}

document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 1024 &&
    !topicMenu.contains(e.target) &&
    !topicMenuToggle.contains(e.target)
  ) {
    topicMenu.classList.remove("active");
  }
});

const savedTheme = localStorage.getItem("preferred-theme");
if (savedTheme) {
  document.body.setAttribute("data-theme", savedTheme);
  themeButtons.forEach((btn) => {
    if (btn.dataset.theme === savedTheme) {
      btn.classList.add("active");
    }
  });
}

const savedLowercase = localStorage.getItem("lowercase-mode") === "true";
lowercaseToggle.checked = savedLowercase;
isLowercase = savedLowercase;

const savedZenMode = localStorage.getItem("zen-mode") === "true";
zenModeToggle.checked = savedZenMode;
isZenMode = savedZenMode;
if (isZenMode) {
  document.body.classList.add("zen-mode");
}

const savedFont = localStorage.getItem("preferred-font");
if (savedFont) {
  textDisplay.setAttribute("data-font", savedFont);
  fontButtons.forEach((btn) => {
    if (btn.dataset.font === savedFont) {
      btn.classList.add("active");
    }
  });
}

const savedRepeatMode = localStorage.getItem("repeat-mode") === "true";
isRepeatMode = savedRepeatMode;

const savedShuffleMode = localStorage.getItem("shuffle-mode") === "true";
isShuffleMode = savedShuffleMode;

const savedTopicMenuCollapsed =
  localStorage.getItem("topicMenuCollapsed") === "true";
if (savedTopicMenuCollapsed) {
  topicMenu.classList.add("collapsed");
}

topicMenuCollapse.addEventListener("click", () => {
  topicMenu.classList.toggle("collapsed");
  localStorage.setItem(
    "topicMenuCollapsed",
    topicMenu.classList.contains("collapsed")
  );
});

repeatButton.classList.toggle("active", isRepeatMode);
shuffleButton.classList.toggle("active", isShuffleMode);

repeatButton.addEventListener("click", () => {
  isRepeatMode = !isRepeatMode;
  repeatButton.classList.toggle("active", isRepeatMode);
  localStorage.setItem("repeat-mode", isRepeatMode);

  if (isRepeatMode) {
    isShuffleMode = false;
    shuffleButton.classList.remove("active");
    localStorage.setItem("shuffle-mode", false);
  }
});

shuffleButton.addEventListener("click", () => {
  isShuffleMode = !isShuffleMode;
  shuffleButton.classList.toggle("active", isShuffleMode);
  localStorage.setItem("shuffle-mode", isShuffleMode);

  if (isShuffleMode) {
    isRepeatMode = false;
    repeatButton.classList.remove("active");
    localStorage.setItem("repeat-mode", false);
  }
});

menuButton.addEventListener("click", () => {
  menu.classList.add("active");
  menuOverlay.classList.add("active");
});

function closeMenuHandler() {
  menu.classList.remove("active");
  menuOverlay.classList.remove("active");
}

closeMenu.addEventListener("click", closeMenuHandler);
menuOverlay.addEventListener("click", closeMenuHandler);

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("preferred-theme", theme);

    themeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

lowercaseToggle.addEventListener("change", () => {
  isLowercase = lowercaseToggle.checked;
  localStorage.setItem("lowercase-mode", isLowercase);
  loadNewText();
});

zenModeToggle.addEventListener("change", () => {
  isZenMode = zenModeToggle.checked;
  document.body.classList.toggle("zen-mode", isZenMode);
  localStorage.setItem("zen-mode", isZenMode);

  if (!isZenMode || isZenMode) {
    loadNewText();
  }
});

fontButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const font = btn.dataset.font;
    textDisplay.setAttribute("data-font", font);
    localStorage.setItem("preferred-font", font);

    fontButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

async function checkApiHealth() {
  try {
    const response = await fetch(API_ENDPOINTS.health);
    const data = await response.json();
    return data.status === "healthy";
  } catch (error) {
    return false;
  }
}

async function loadCategories() {
  try {
    const response = await fetch(API_ENDPOINTS.categories);
    const data = await response.json();
    categories = data.categories;
    return categories;
  } catch (error) {
    return [];
  }
}

async function testApiResponse() {
  try {
    const response = await fetch(API_ENDPOINTS.topics);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function init() {
  try {
    await loadNewText();
    setupEventListeners();
    textDisplay.focus();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

function highlightCurrentTopic(topicName) {
  document.querySelectorAll(".topic-item").forEach((item) => {
    item.classList.remove("active");
  });

  const topicItems = document.querySelectorAll(".topic-item");
  topicItems.forEach((item) => {
    if (item.textContent === topicName) {
      item.classList.add("active");
    }
  });
}

async function loadNewText() {
  if (isLoading) return;
  isLoading = true;

  try {
    if (useLocalData) {
      await loadLocalData();
    } else {
      const isHealthy = await checkApiHealth();
      if (!isHealthy) {
        useLocalData = true;
        await loadLocalData();
        return;
      }

      if (allTopics.length === 0) {
        const data = await testApiResponse();
        if (!Array.isArray(data)) {
          throw new Error("Invalid API response format: Expected an array.");
        }
        allTopics = data;
        await loadCategories();
        const categorizedTopics = categorizeTopics(allTopics);
        populateTopicLists(categorizedTopics);
      }
    }

    let selectedContent;

    if (isRepeatMode && currentText) {
      selectedContent = {
        topic: topicTitle.textContent,
        content: currentText,
      };
    } else if (isShuffleMode) {
      if (useLocalData) {
        selectedContent = getRandomFallbackTopic();
      } else {
        const response = await fetch(API_ENDPOINTS.randomTopic);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        selectedContent = await response.json();
      }
    } else {
      currentTopicIndex = (currentTopicIndex + 1) % allTopics.length;
      selectedContent = allTopics[currentTopicIndex];
    }

    if (!selectedContent || !selectedContent.content) {
      throw new Error("Invalid topic content received");
    }

    currentText = selectedContent.content;
    topicTitle.textContent = selectedContent.topic;

    highlightCurrentTopic(selectedContent.topic);

    startTime = null;
    lastUpdateTime = null;
    totalTime = 0;
    correctChars = 0;
    totalChars = 0;
    currentIndex = 0;
    typedHistory = [];
    completedWords = 0;
    currentWordStart = 0;

    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";

    displayText();
    resetTest();
  } catch (error) {
    console.error("Error loading new text:", error);
    await loadLocalData();
    const fallbackTopics = getAllFallbackTopics();
    if (!fallbackTopics || fallbackTopics.length === 0) {
      const emergencyFallback = {
        topic: "Data Structures",
        content:
          "A data structure is a specialized format for organizing, processing, retrieving and storing data. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs. Each structure has its own advantages and use cases in different scenarios.",
      };
      currentText = emergencyFallback.content;
      topicTitle.textContent = emergencyFallback.topic;
    } else {
      if (isShuffleMode) {
        const randomFallback =
          fallbackTopics[Math.floor(Math.random() * fallbackTopics.length)];
        currentText = randomFallback.content;
        topicTitle.textContent = randomFallback.topic;
      } else {
        currentTopicIndex = (currentTopicIndex + 1) % fallbackTopics.length;
        const fallbackTopic = fallbackTopics[currentTopicIndex];
        currentText = fallbackTopic.content;
        topicTitle.textContent = fallbackTopic.topic;
      }
    }

    if (!currentText) {
      currentText =
        "A data structure is a specialized format for organizing, processing, retrieving and storing data. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs.";
      topicTitle.textContent = "Data Structures";
    }

    highlightCurrentTopic(topicTitle.textContent);

    startTime = null;
    lastUpdateTime = null;
    totalTime = 0;
    correctChars = 0;
    totalChars = 0;
    currentIndex = 0;
    typedHistory = [];
    completedWords = 0;
    currentWordStart = 0;

    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";

    displayText();
    resetTest();
  } finally {
    isLoading = false;
  }
}

async function loadLocalData() {
  allTopics = getAllFallbackTopics();
  categories = getAllFallbackCategories();
  const categorizedTopics = categorizeTopics(allTopics);
  populateTopicLists(categorizedTopics);
}

function populateTopicLists(categorizedTopics) {
  dataStructuresList.innerHTML = "";
  algorithmsList.innerHTML = "";
  systemDesignList.innerHTML = "";
  problemSolvingList.innerHTML = "";

  populateTopicList(dataStructuresList, categorizedTopics["Data Structures"]);
  populateTopicList(algorithmsList, categorizedTopics["Algorithms"]);
  populateTopicList(systemDesignList, categorizedTopics["System Design"]);
  populateTopicList(problemSolvingList, categorizedTopics["Problem Solving"]);
}

function displayText() {
  const displayText = isLowercase ? currentText.toLowerCase() : currentText;

  textDisplay.innerHTML = "";

  for (let i = 0; i < displayText.length; i++) {
    const charSpan = document.createElement("span");
    charSpan.textContent = displayText[i];
    charSpan.className = `char${i === 0 ? " current" : ""}`;
    textDisplay.appendChild(charSpan);
  }
}

function resetTest() {
  currentIndex = 0;
  correctChars = 0;
  totalChars = 0;
  typedHistory = [];
  completedWords = 0;
  currentWordStart = 0;
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100%";

  const chars = textDisplay.querySelectorAll(".char");
  chars.forEach((char, index) => {
    char.className = index === 0 ? "char current" : "char";
  });
}

function updateWPM() {
  if (!startTime || isZenMode) return;

  const now = Date.now();
  const timeElapsed = (now - startTime) / 1000 / 60;

  if (completedWords === 0 || timeElapsed < 0.05) {
    wpmDisplay.textContent = "0";
    return;
  }

  const wpm = Math.round(completedWords / timeElapsed);
  const displayWpm = Math.min(wpm, 300);
  wpmDisplay.textContent = displayWpm;
}

function updateWPMOnWordComplete() {
  if (!startTime || isZenMode) return;

  const now = Date.now();
  const timeElapsed = (now - startTime) / 1000 / 60;

  if (timeElapsed < 0.05) {
    wpmDisplay.textContent = "0";
    return;
  }

  const wpm = Math.round(completedWords / timeElapsed);
  const displayWpm = Math.min(wpm, 300);
  wpmDisplay.textContent = displayWpm;
}

function updateAccuracy() {
  const finalCorrectChars = typedHistory.filter(
    (state) => state.correct
  ).length;
  const totalTypedChars = typedHistory.length;
  const accuracy =
    totalTypedChars === 0
      ? 100
      : Math.round((finalCorrectChars / totalTypedChars) * 100);
  accuracyDisplay.textContent = `${accuracy}%`;
}

function handleKeyPress(e) {
  if (modifierKeys.includes(e.key)) {
    e.preventDefault();
    return;
  }

  if (e.key === "Backspace") {
    e.preventDefault();

    if (e.ctrlKey) {
      if (currentIndex > 0) {
        const chars = textDisplay.querySelectorAll(".char");
        let wordStart = currentIndex;

        while (wordStart > 0 && chars[wordStart - 1].textContent === " ") {
          wordStart--;
        }
        while (wordStart > 0 && chars[wordStart - 1].textContent !== " ") {
          wordStart--;
        }

        const charsToRemove = currentIndex - wordStart;
        for (let i = 0; i < charsToRemove; i++) {
          typedHistory.pop();
        }

        currentIndex = wordStart;
        chars[currentIndex].className = "char current";

        for (let i = wordStart + 1; i < chars.length; i++) {
          chars[i].className = "char";
        }

        currentWordStart = currentIndex;
        updateAccuracy();
      }
      return;
    }

    if (currentIndex > 0) {
      currentIndex--;
      const chars = textDisplay.querySelectorAll(".char");

      typedHistory.pop();

      chars[currentIndex].className = "char current";
      if (currentIndex < chars.length - 1) {
        chars[currentIndex + 1].className = "char";
      }

      if (currentText[currentIndex] === " ") {
        currentWordStart = currentIndex + 1;
        if (completedWords > 0) {
          completedWords--;
          updateWPMOnWordComplete();
        }
      }

      updateAccuracy();
    }
    return;
  }

  if (!startTime) {
    startTime = Date.now();
    lastUpdateTime = startTime;
    timer = setInterval(updateWPM, 1000);
  }

  const chars = textDisplay.querySelectorAll(".char");
  const expectedChar = isLowercase
    ? currentText[currentIndex].toLowerCase()
    : currentText[currentIndex];

  const isCorrect = e.key === expectedChar;
  typedHistory.push({
    correct: isCorrect,
    index: currentIndex,
  });

  chars[currentIndex].className = isCorrect ? "char correct" : "char incorrect";

  if (expectedChar === " " && isCorrect) {
    completedWords++;
    updateWPMOnWordComplete();
  }

  if (currentIndex === currentText.length - 1 && isCorrect) {
    const lastChar = currentText[currentText.length - 1];
    if (lastChar !== " ") {
      completedWords++;
      updateWPMOnWordComplete();
    }
    loadNewText();
  }

  if (currentIndex < chars.length - 1) {
    chars[currentIndex + 1].className = "char current";
  }

  currentIndex++;
  updateAccuracy();
}

function setupEventListeners() {
  document.addEventListener("keydown", (e) => {
    const isMenuClick = e.target.closest("#menu") !== null;
    const isMenuButtonClick = e.target.closest("#menuButton") !== null;
    const isMenuOverlayClick = e.target.closest("#menuOverlay") !== null;
    const isTopicMenuClick = e.target.closest(".topic-menu") !== null;
    const isTopicMenuToggleClick =
      e.target.closest("#topicMenuToggle") !== null;
    const isTopicMenuCollapseClick =
      e.target.closest("#topicMenuCollapse") !== null;
    const isInputElement =
      e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";
    const isMenuOpen = menu.classList.contains("active");
    const isTopicMenuOpen = topicMenu.classList.contains("active");
    const isTopicMenuExpanded = topicMenu.classList.contains("expanded");

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
      e.preventDefault();
      if (isMenuOpen) {
        menu.classList.remove("active");
        menuOverlay.classList.remove("active");
      } else {
        menu.classList.add("active");
        menuOverlay.classList.add("active");
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
      e.preventDefault();
      if (window.innerWidth <= 1024) {
        topicMenu.classList.toggle("active");
      } else {
        topicMenu.classList.toggle("expanded");
      }
      return;
    }

    if (e.code === "Space") {
      const isTypingTestArea =
        !isMenuOpen &&
        !isTopicMenuOpen &&
        !isMenuClick &&
        !isMenuButtonClick &&
        !isMenuOverlayClick &&
        !isTopicMenuClick &&
        !isTopicMenuToggleClick &&
        !isTopicMenuCollapseClick &&
        !isInputElement;

      e.preventDefault();

      if (isTypingTestArea) {
        handleKeyPress(e);
      }
      return;
    }

    if (
      !isMenuClick &&
      !isMenuButtonClick &&
      !isMenuOverlayClick &&
      !isTopicMenuClick &&
      !isTopicMenuToggleClick &&
      !isTopicMenuCollapseClick &&
      !isInputElement &&
      !isMenuOpen &&
      !isTopicMenuOpen
    ) {
      handleKeyPress(e);
    }
  });

  menuButton.setAttribute("title", "Toggle Settings (Ctrl+P)");
  topicMenuToggle.setAttribute("title", "Toggle Topics (Ctrl+M)");
  topicMenuCollapse.setAttribute("title", "Toggle Topics (Ctrl+M)");
}

init();
