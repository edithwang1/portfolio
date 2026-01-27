document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatWindow");
  const chatBody = document.getElementById("chatBody");
  const quickReplies = document.getElementById("quickReplies");
  const inputField = document.getElementById("userInput");

  // Prevent errors if elements are missing
  if (!chatBody) return;

  // 1) Toggle Chat Function
  // We attach this to 'window' so the onclick in your HTML still works
  window.toggleChat = () => {
    // NOTE: Ensure your CSS uses '.open' for the visible state. 
    // If your CSS uses '.active', change "open" to "active" below.
    chatWindow?.classList.toggle("open");

    // Greeting Logic: If chat is empty when opened, say Hello
    if (chatBody && chatBody.childElementCount === 0) {
      addBot("Hi, I’m Edith’s AI concierge. You can ask about experience, applied projects, or the AI venture.");
    }
  };

  // 2) Quick Replies Click Listener
  if (quickReplies) {
    quickReplies.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-topic]");
      if (!btn) return;
      const topic = btn.dataset.topic;
      handleTopic(topic);
    });
  }

  // 3) Handle "Enter" key
  window.checkEnter = (event) => {
    if (event.key === "Enter") sendUserMessage();
  };

  // 4) Send Message Logic
  window.sendUserMessage = () => {
    const text = (inputField?.value || "").trim();
    if (!text) return;
    
    addUser(text);
    inputField.value = "";

    const reply = getResponse(text);
    setTimeout(() => addBot(reply), 400); // Slight delay for realism
  };

  function handleTopic(topic) {
    const topicMap = {
      experience: "Tell me about Edith’s experience.",
      projects: "What projects is she working on?",
      skills: "What are her tech skills?",
      venture: "Tell me about her AI venture.",
      joke: "Tell me a joke.",
      contact: "How can I contact her?"
    };
    const userText = topicMap[topic] || "Tell me more.";
    
    addUser(userText);
    const reply = getResponse(userText);
    setTimeout(() => addBot(reply), 350);
  }

  // --- Render Functions ---
  function addUser(text) {
    const div = document.createElement("div");
    div.className = "message user-message";
    div.textContent = text; 
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addBot(text) {
    const div = document.createElement("div");
    div.className = "message bot-message";
    // Using innerHTML allows you to use <b> or links in your responses if you want
    div.innerHTML = text; 
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // --- The Brain (Response Logic) ---
  function getResponse(input) {
    const text = input.toLowerCase();

    // Venture
    if (hasAny(text, ["asktaxly", "tax", "venture", "ai platform"])) {
      return "Edith is building an applied AI platform focused on reducing complexity in cross-border tax compliance. You can view it at <a href='https://asktaxly.com' target='_blank'>asktaxly.com</a>.";
    }

    // Projects
    if (hasAny(text, ["project", "projects", "mayo", "ecolab", "mss", "work"])) {
      return "Edith works on applied initiatives across healthcare operations and finance transformation. You can ask specifically about <b>Mayo Clinic</b>, <b>Ecolab</b>, or <b>Risk Governance</b>.";
    }

    // Mayo
    if (hasAny(text, ["mayo", "hospital", "tote", "logistics"])) {
      return "At <b>Mayo Clinic</b>, Edith is working on a root cause analysis of inventory logistics to fix tote underutilization and improve distribution workflows.";
    }

    // Ecolab
    if (hasAny(text, ["ecolab", "flat fee", "margin", "pricing"])) {
      return "At <b>Ecolab</b>, Edith built models to improve margin visibility, identifying approximately $18M in potential margin improvement.";
    }

    // Risk
    if (hasAny(text, ["risk", "security", "vulnerability", "controls", "governance"])) {
      return "Edith designed a standardized risk assessment framework covering security and operational risk to support governance oversight.";
    }

    // Experience
    if (hasAny(text, ["experience", "background", "citi", "portfolio"])) {
      return "Edith has 10+ years in finance transformation. Most recently, she managed portfolio governance at <b>Citi</b>, overseeing a $65M+ technology portfolio.";
    }

    // Skills
    if (hasAny(text, ["skills", "tech", "python", "sql", "power bi", "azure"])) {
      return "She bridges finance and tech using Python, SQL, Power BI, and Azure. Her credentials include CPA and PMP.";
    }

    // Contact
    if (hasAny(text, ["contact", "email", "linkedin", "calendly"])) {
      return "You can connect with Edith on LinkedIn or use the Calendly link on this site.";
    }

    // Joke
    if (hasAny(text, ["joke", "fun", "laugh"])) {
      return randomJoke();
    }

    // Fallback
    return "You can ask about experience, applied projects, the AI venture, tech skills, or how to connect.";
  }

  function hasAny(text, keywords) {
    return keywords.some((k) => text.includes(k));
  }

  function randomJoke() {
    const jokes = [
      "Why did the scarecrow win an award? Because he was outstanding in his field.",
      "What do you call a fake noodle? An impasta.",
      "Why don’t skeletons fight each other? They don’t have the guts.",
      "I told my computer I needed a break, and now it won’t stop sending me break reminders."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
});
