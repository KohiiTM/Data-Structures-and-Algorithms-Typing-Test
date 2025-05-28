// Import fallback data
import {
  getRandomFallbackTopic,
  getAllFallbackTopics,
  getAllFallbackCategories,
} from "./fallbackData.js";

// API endpoint
const API_BASE_URL = "https://dsa-typing-api.onrender.com";

// API endpoints
const API_ENDPOINTS = {
  topics: `${API_BASE_URL}/api/topics`,
  randomTopic: `${API_BASE_URL}/api/topics/random`,
  categories: `${API_BASE_URL}/api/categories`,
  health: `${API_BASE_URL}/health`,
};

// DOM Elements
const textDisplay = document.getElementById("textDisplay");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const newTextButton = document.getElementById("newTextButton");
const lowercaseToggle = document.getElementById("lowercaseToggle");
const zenModeToggle = document.getElementById("zenModeToggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const fontButtons = document.querySelectorAll(".font-btn");
const topicTitle = document.getElementById("topicTitle");

// State variables
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

// Don't count as input
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

// Menu functionality
const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("closeMenu");

// Topic menu functionality
const topicMenuToggle = document.getElementById("topicMenuToggle");
const topicMenuCollapse = document.getElementById("topicMenuCollapse");
const topicMenu = document.querySelector(".topic-menu");
const dataStructuresList = document.getElementById("dataStructuresList");
const algorithmsList = document.getElementById("algorithmsList");
const systemDesignList = document.getElementById("systemDesignList");
const problemSolvingList = document.getElementById("problemSolvingList");

// Toggle topic menu collapse
topicMenuCollapse.addEventListener("click", () => {
  topicMenu.classList.toggle("expanded");
});

// Toggle topic menu on mobile
topicMenuToggle.addEventListener("click", () => {
  topicMenu.classList.toggle("active");
});

// Populate topic lists
function populateTopicList(listElement, topics) {
  topics.forEach((topic) => {
    const topicItem = document.createElement("div");
    topicItem.className = "topic-item";
    topicItem.textContent = topic.topic;
    topicItem.addEventListener("click", () => {
      // Remove active class from all items
      document
        .querySelectorAll(".topic-item")
        .forEach((item) => item.classList.remove("active"));
      // Add active class to clicked item
      topicItem.classList.add("active");
      // Update the current text
      currentText = topic.content;
      topicTitle.textContent = topic.topic;
      displayText();
      resetTest();
    });
    listElement.appendChild(topicItem);
  });
}

// Categorize topics from API data
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

// Close topic menu when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 1024 &&
    !topicMenu.contains(e.target) &&
    !topicMenuToggle.contains(e.target)
  ) {
    topicMenu.classList.remove("active");
  }
});

// Load saved theme
const savedTheme = localStorage.getItem("preferred-theme");
if (savedTheme) {
  document.body.setAttribute("data-theme", savedTheme);
  themeButtons.forEach((btn) => {
    if (btn.dataset.theme === savedTheme) {
      btn.classList.add("active");
    }
  });
}

// Load saved lowercase preference
const savedLowercase = localStorage.getItem("lowercase-mode") === "true";
lowercaseToggle.checked = savedLowercase;
isLowercase = savedLowercase;

// Load saved zen mode preference
const savedZenMode = localStorage.getItem("zen-mode") === "true";
zenModeToggle.checked = savedZenMode;
isZenMode = savedZenMode;
if (isZenMode) {
  document.body.classList.add("zen-mode");
}

// Load saved font
const savedFont = localStorage.getItem("preferred-font");
if (savedFont) {
  textDisplay.setAttribute("data-font", savedFont);
  fontButtons.forEach((btn) => {
    if (btn.dataset.font === savedFont) {
      btn.classList.add("active");
    }
  });
}

// Menu open/close
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

// Theme switching
themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("preferred-theme", theme);

    themeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Lowercase toggle
lowercaseToggle.addEventListener("change", () => {
  isLowercase = lowercaseToggle.checked;
  localStorage.setItem("lowercase-mode", isLowercase);
  loadNewText();
});

// Zen Mode toggle
zenModeToggle.addEventListener("change", () => {
  isZenMode = zenModeToggle.checked;
  document.body.classList.toggle("zen-mode", isZenMode);
  localStorage.setItem("zen-mode", isZenMode);

  // Refresh text when toiggling zen mode
  if (!isZenMode || isZenMode) {
    loadNewText();
  }
});

// Font switching
fontButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const font = btn.dataset.font;
    textDisplay.setAttribute("data-font", font);
    localStorage.setItem("preferred-font", font);

    fontButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Load saved menu state
const savedMenuState = localStorage.getItem("topicMenuCollapsed") === "true";
if (savedMenuState) {
  topicMenu.classList.add("collapsed");
}

// Toggle topic menu collapse
topicMenuCollapse.addEventListener("click", () => {
  topicMenu.classList.toggle("collapsed");
  localStorage.setItem(
    "topicMenuCollapsed",
    topicMenu.classList.contains("collapsed")
  );
});

// Check API health
async function checkApiHealth() {
  try {
    console.log("Making API health check request to:", API_ENDPOINTS.health);
    const response = await fetch(API_ENDPOINTS.health);
    console.log("API health check response status:", response.status);
    const data = await response.json();
    console.log("API health check response data:", data);
    return data.status === "healthy";
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
}

// Load categories from API
async function loadCategories() {
  try {
    const response = await fetch(API_ENDPOINTS.categories);
    const data = await response.json();
    categories = data.categories;
    return categories;
  } catch (error) {
    console.error("Error loading categories:", error);
    return [];
  }
}

// Test API response
async function testApiResponse() {
  try {
    console.log("Making API test request to:", API_ENDPOINTS.topics);
    const response = await fetch(API_ENDPOINTS.topics);
    console.log("API test response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API test response data:", data);
    return data;
  } catch (error) {
    console.error("API Test Error:", error);
    throw error;
  }
}

// Initialize the typing test
async function init() {
  console.log("Initializing typing test...");
  try {
    await loadNewText();
    console.log("Initial text loaded successfully");
    setupEventListeners();
    textDisplay.focus();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

// Function to highlight current topic in menu
function highlightCurrentTopic(topicName) {
  // Remove active class from all topic items
  document.querySelectorAll(".topic-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Find and highlight the current topic
  const topicItems = document.querySelectorAll(".topic-item");
  topicItems.forEach((item) => {
    if (item.textContent === topicName) {
      item.classList.add("active");
    }
  });
}

// Load a new random text
async function loadNewText() {
  if (isLoading) return;
  isLoading = true;

  try {
    const isHealthy = await checkApiHealth();

    if (!isHealthy) {
      throw new Error("API is not healthy");
    }

    if (allTopics.length === 0) {
      const data = await testApiResponse();

      if (!Array.isArray(data)) {
        throw new Error("Invalid API response format: Expected an array.");
      }

      allTopics = data;
      await loadCategories();
      const categorizedTopics = categorizeTopics(allTopics);

      dataStructuresList.innerHTML = "";
      algorithmsList.innerHTML = "";
      systemDesignList.innerHTML = "";
      problemSolvingList.innerHTML = "";

      populateTopicList(
        dataStructuresList,
        categorizedTopics["Data Structures"]
      );
      populateTopicList(algorithmsList, categorizedTopics["Algorithms"]);
      populateTopicList(systemDesignList, categorizedTopics["System Design"]);
      populateTopicList(
        problemSolvingList,
        categorizedTopics["Problem Solving"]
      );
    }

    const response = await fetch(API_ENDPOINTS.randomTopic);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const selectedContent = await response.json();

    if (!selectedContent || !selectedContent.content) {
      throw new Error("Invalid topic content received from API");
    }

    currentText = selectedContent.content;
    topicTitle.textContent = selectedContent.topic;

    // Highlight the current topic in the menu
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
      const randomFallback =
        fallbackTopics[Math.floor(Math.random() * fallbackTopics.length)];
      currentText = randomFallback.content;
      topicTitle.textContent = randomFallback.topic;
    }

    if (!currentText) {
      currentText =
        "A data structure is a specialized format for organizing, processing, retrieving and storing data. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs.";
      topicTitle.textContent = "Data Structures";
    }

    // Highlight the current topic in the menu for fallback cases
    highlightCurrentTopic(topicTitle.textContent);

    displayText();
    resetTest();
  } finally {
    isLoading = false;
  }
}

// Display the text with proper formatting
function displayText() {
  console.log("Displaying text:", currentText); // Debug log
  const displayText = isLowercase ? currentText.toLowerCase() : currentText;

  // Clear previous text
  textDisplay.innerHTML = "";

  // Create and append span elements for each character
  for (let i = 0; i < displayText.length; i++) {
    const charSpan = document.createElement("span");
    charSpan.textContent = displayText[i];
    charSpan.className = `char${i === 0 ? " current" : ""}`;
    textDisplay.appendChild(charSpan);
  }
}

// Reset the test state
function resetTest() {
  currentIndex = 0;
  correctChars = 0;
  totalChars = 0;
  typedHistory = [];
  completedWords = 0;
  currentWordStart = 0;
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100%";

  // Reset all characters and set first character as current
  const chars = textDisplay.querySelectorAll(".char");
  chars.forEach((char, index) => {
    char.className = index === 0 ? "char current" : "char";
  });
}

// Calculate and update WPM
function updateWPM() {
  if (!startTime || isZenMode) return;

  const now = Date.now();
  const timeElapsed = (now - startTime) / 1000 / 60; // in minutes

  // Only update if we have completed at least one word and some time has passed
  if (completedWords === 0 || timeElapsed < 0.05) {
    // 3 seconds minimum
    wpmDisplay.textContent = "0";
    return;
  }

  const wpm = Math.round(completedWords / timeElapsed);
  const displayWpm = Math.min(wpm, 300);
  wpmDisplay.textContent = displayWpm;
}

// Update WPM only when words are completed (smoother updates)
function updateWPMOnWordComplete() {
  if (!startTime || isZenMode) return;

  const now = Date.now();
  const timeElapsed = (now - startTime) / 1000 / 60; // in minutes

  if (timeElapsed < 0.05) {
    wpmDisplay.textContent = "0";
    return;
  }

  const wpm = Math.round(completedWords / timeElapsed);
  const displayWpm = Math.min(wpm, 300);
  wpmDisplay.textContent = displayWpm;
}

// Calculate and update accuracy
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

// Handle keyboard input
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
    timer = setInterval(updateWPM, 3000);
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

// Setup event listeners
function setupEventListeners() {
  // Add keydown listener to document instead of textDisplay
  document.addEventListener("keydown", (e) => {
    // Check if we're interacting with menu or UI elements
    const isMenuClick = e.target.closest("#menu") !== null;
    const isMenuButtonClick = e.target.closest("#menuButton") !== null;
    const isNewTextButtonClick = e.target.closest("#newTextButton") !== null;
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

    // Handle Ctrl+P / Cmd+P to toggle settings menu
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

    // Handle Ctrl+M / Cmd+M to toggle topics menu
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
      e.preventDefault();
      if (window.innerWidth <= 1024) {
        topicMenu.classList.toggle("active");
      } else {
        topicMenu.classList.toggle("expanded");
      }
      return;
    }

    // Handle space bar
    if (e.code === "Space") {
      // Only allow space in typing test area when no menus are open
      const isTypingTestArea =
        !isMenuOpen &&
        !isTopicMenuOpen &&
        !isMenuClick &&
        !isMenuButtonClick &&
        !isNewTextButtonClick &&
        !isMenuOverlayClick &&
        !isTopicMenuClick &&
        !isTopicMenuToggleClick &&
        !isTopicMenuCollapseClick &&
        !isInputElement;

      // Always prevent default space behavior (scrolling, etc.)
      e.preventDefault();

      // Only allow space to be typed in the typing test area
      if (isTypingTestArea) {
        handleKeyPress(e);
      }
      return;
    }

    // Only handle typing if not interacting with menu/UI and menu is closed
    if (
      !isMenuClick &&
      !isMenuButtonClick &&
      !isNewTextButtonClick &&
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

  // Add keyboard shortcut hints
  menuButton.setAttribute("title", "Toggle Settings (Ctrl+P)");
  topicMenuToggle.setAttribute("title", "Toggle Topics (Ctrl+M)");
  topicMenuCollapse.setAttribute("title", "Toggle Topics (Ctrl+M)");

  newTextButton.addEventListener("click", loadNewText);

  // Theme switching
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("preferred-theme", theme);
      themeButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

// Start the application
init();
