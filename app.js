/**
 * College Help Desk Chatbot Logic - Sri Lankan Educational Context
 * Implements deterministic routing, keyword parsing, view switching, 
 * theme toggling, speech synthesis, FAQ accordions, and dynamic student dashboards.
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- Mock Student Profiles Database (Sri Lankan Names & Academic Data) ---
    const studentProfiles = {
        "kasun": {
            name: "Kasun Jayasundara",
            firstName: "Kasun",
            details: "BSc in Software Engineering • Index: 2026/SE/048",
            email: "kasun.j@student.apex.edu.lk",
            avatar: "K",
            gpa: "3.82",
            credits: "64 / 120",
            holds: "No Holds",
            holdsClass: "hold-alert", // green text styling
            checklistHtml: `
                <li>
                    <span class="checklist-status pass">✓</span>
                    <span class="checklist-text">Mahapola Stipend Eligibility Verified</span>
                </li>
                <li>
                    <span class="checklist-status pass">✓</span>
                    <span class="checklist-text">Faculty Advisor Consent Received</span>
                </li>
                <li>
                    <span class="checklist-status alert">⚠</span>
                    <span class="checklist-text">Pending Semester Registration Window (August 1st)</span>
                </li>
            `,
            tickets: [
                {
                    id: "#T-9843",
                    title: "Mahapola Scholarship payment pending for June",
                    status: "open",
                    date: "Created on July 28, 2026 • Welfare Division"
                },
                {
                    id: "#T-9182",
                    title: "LMS portal login credentials reset",
                    status: "resolved",
                    date: "Resolved on July 20, 2026 • IT Support"
                }
            ]
        },
        "sanduni": {
            name: "Sanduni Perera",
            firstName: "Sanduni",
            details: "BBA in Marketing • Index: 2026/BM/102",
            email: "sanduni.p@student.apex.edu.lk",
            avatar: "S",
            gpa: "3.94",
            credits: "28 / 36",
            holds: "1 Active Hold",
            holdsClass: "hold-active", // red alert styling
            checklistHtml: `
                <li>
                    <span class="checklist-status pass">✓</span>
                    <span class="checklist-text">UGC Registration Verified</span>
                </li>
                <li>
                    <span class="checklist-status alert">✗</span>
                    <span class="checklist-text">Library Hold: Book replacement fee pending (LKR 1,500)</span>
                </li>
            `,
            tickets: [
                {
                    id: "#T-4091",
                    title: "Requesting exam deferment due to medical leave",
                    status: "open",
                    date: "Created on July 29, 2026 • Faculty of Business"
                },
                {
                    id: "#T-3810",
                    title: "Library book return fine waiver request",
                    status: "resolved",
                    date: "Resolved on July 22, 2026 • Library Admin"
                }
            ]
        },
        "nimal": {
            name: "Nimal Silva",
            firstName: "Nimal",
            details: "BSc in Biotechnology • Index: 2026/HS/991",
            email: "nimal.s@student.apex.edu.lk",
            avatar: "N",
            gpa: "3.15",
            credits: "12 / 120",
            holds: "No Holds",
            holdsClass: "hold-alert",
            checklistHtml: `
                <li>
                    <span class="checklist-status pass">✓</span>
                    <span class="checklist-text">Hostel Room Deposited</span>
                </li>
                <li>
                    <span class="checklist-status pass">✓</span>
                    <span class="checklist-text">Medical Records Approved</span>
                </li>
                <li>
                    <span class="checklist-status pass">✓</span>
                    <span class="checklist-text">Semester 1 Registration Completed</span>
                </li>
            `,
            tickets: [
                {
                    id: "#T-1029",
                    title: "Student ID Card barcode issue fixed",
                    status: "resolved",
                    date: "Resolved on July 29, 2026 • Security Office"
                }
            ]
        }
    };

    // --- DOM Elements ---
    const chatFeed = document.getElementById("chat-feed");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const themeToggle = document.getElementById("theme-toggle");
    
    // View panels
    const chatView = document.getElementById("view-chat");
    const dashboardView = document.getElementById("view-dashboard");
    const noticesView = document.getElementById("view-notices");
    const faqsView = document.getElementById("view-faqs");
    const servicesView = document.getElementById("view-services");
    const contactView = document.getElementById("view-contact");
    
    // Sidebar nav links
    const navChat = document.getElementById("nav-chat");
    const navDashboard = document.getElementById("nav-dashboard");
    const navNotices = document.getElementById("nav-notices");
    const navFaqs = document.getElementById("nav-faqs");
    const navServices = document.getElementById("nav-services");
    const navContact = document.getElementById("nav-contact");
    const navResetChatSidebar = document.getElementById("nav-reset-chat-sidebar");
    
    // Dashboard dynamic items
    const profileSelect = document.getElementById("profile-select");
    const dashAvatar = document.getElementById("dash-avatar");
    const dashName = document.getElementById("dash-name");
    const dashDetails = document.getElementById("dash-details");
    const dashEmail = document.getElementById("dash-email");
    const dashGpa = document.getElementById("dash-gpa");
    const dashCredits = document.getElementById("dash-credits");
    const dashHolds = document.getElementById("dash-holds");
    const dashChecklist = document.querySelector(".checklist-items");

    // Contact & Tickets elements
    const ticketListContainer = document.getElementById("ticket-list-container");
    const ticketsProfileName = document.getElementById("tickets-profile-name");

    // --- State ---
    let currentActiveNode = "root";
    let currentProfileKey = "kasun"; // default active profile is Kasun

    // --- Core Functions: Profile Switcher ---

    function loadProfile(profileKey) {
        const profile = studentProfiles[profileKey];
        if (!profile) return;

        currentProfileKey = profileKey;

        // 1. Update Student Profile elements in Dashboard
        if (dashAvatar) dashAvatar.innerText = profile.avatar;
        if (dashName) dashName.innerText = profile.name;
        if (dashDetails) dashDetails.innerText = profile.details;
        if (dashEmail) dashEmail.innerText = profile.email;

        // 2. Update stats cards
        if (dashGpa) dashGpa.innerText = profile.gpa;
        if (dashCredits) dashCredits.innerText = profile.credits;
        if (dashHolds) {
            dashHolds.innerText = profile.holds;
            dashHolds.className = "metric-val " + profile.holdsClass; // swap color class
        }

        // 3. Update FAFSA / holds checklist
        if (dashChecklist) {
            dashChecklist.innerHTML = profile.checklistHtml;
        }

        // 4. Update dropdown selector value
        if (profileSelect && profileSelect.value !== profileKey) {
            profileSelect.value = profileKey;
        }

        // 5. Update tickets list & header in Contact View
        if (ticketsProfileName) {
            ticketsProfileName.innerText = profile.name;
        }
        renderProfileTickets(profile.tickets);

        // 6. Reset chatbot greeting with new student's name
        resetChat();
    }

    function renderProfileTickets(ticketsArray) {
        if (!ticketListContainer) return;

        if (!ticketsArray || ticketsArray.length === 0) {
            ticketListContainer.innerHTML = `
                <div style="text-align: center; color: var(--theme-text-muted); padding: 20px;">
                    No recent support tickets.
                </div>
            `;
            return;
        }

        let html = "";
        ticketsArray.forEach(t => {
            const statusClass = t.status === "open" ? "status-open" : "status-resolved";
            const badgeClass = t.status === "open" ? "badge-open" : "badge-resolved";
            const labelText = t.status === "open" ? "Open" : "Resolved";

            html += `
                <div class="ticket-item ${statusClass}">
                    <div class="ticket-meta">
                        <span class="ticket-id">${t.id}</span>
                        <span class="badge ${badgeClass}">${labelText}</span>
                    </div>
                    <h4>${t.title}</h4>
                    <p class="ticket-date">${t.date}</p>
                </div>
            `;
        });
        ticketListContainer.innerHTML = html;
    }

    // --- Core Functions: View Switcher Routing ---

    function switchView(targetViewId, activeNavLinkElement) {
        // 1. Hide all panels
        [chatView, dashboardView, noticesView, faqsView, servicesView, contactView].forEach(view => {
            if (view) view.classList.remove("active-view");
        });
        
        // 2. Display selected panel
        const targetView = document.getElementById(targetViewId);
        if (targetView) {
            targetView.classList.add("active-view");
        }
        
        // 3. Highlight navigation active links
        const navItems = document.querySelectorAll(".sidebar-nav .nav-item, .sidebar-footer .footer-link-item");
        navItems.forEach(item => {
            item.classList.remove("active");
        });
        
        if (activeNavLinkElement) {
            const parentLi = activeNavLinkElement.closest(".nav-item");
            if (parentLi) {
                parentLi.classList.add("active");
            } else {
                activeNavLinkElement.classList.add("active");
            }
        }
    }

    // --- Core Functions: Theme Toggle ---

    function toggleTheme() {
        if (themeToggle.checked) {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
            localStorage.setItem("apex-theme", "dark");
        } else {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
            localStorage.setItem("apex-theme", "light");
        }
    }

    // Load persisted theme preference
    const savedTheme = localStorage.getItem("apex-theme");
    if (savedTheme === "light") {
        themeToggle.checked = false;
        toggleTheme();
    }

    // --- Core Functions: Speech Synthesis (Text-to-Speech) ---

    function speakBotResponse(text) {
        const ttsSetting = document.getElementById("setting-tts");
        if (!ttsSetting || !ttsSetting.checked) return;
        
        window.speechSynthesis.cancel();
        
        const plainText = text
            .replace(/\*\*|`|•/g, "")
            .replace(/<[^>]*>/g, "")
            .trim();
            
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }

    // --- Core Functions: Formatting text ---

    function formatMessageText(text) {
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    function scrollToBottom() {
        chatFeed.scrollTo({
            top: chatFeed.scrollHeight,
            behavior: 'smooth'
        });
    }

    // --- Core Functions: Message Feeding ---

    function appendMessage(sender, htmlContent) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageRow = document.createElement("div");
        messageRow.classList.add("message-row", sender);

        const wrapper = document.createElement("div");
        wrapper.classList.add("message-wrapper");

        const bubble = document.createElement("div");
        bubble.classList.add("message-bubble");
        bubble.innerHTML = htmlContent;

        const meta = document.createElement("div");
        meta.classList.add("message-meta");
        meta.innerText = sender === "bot" ? `Apex Bot • ${time}` : `You • ${time}`;

        wrapper.appendChild(bubble);
        wrapper.appendChild(meta);
        messageRow.appendChild(wrapper);
        chatFeed.appendChild(messageRow);
        
        scrollToBottom();
        return messageRow;
    }

    function appendTypingIndicator() {
        const indicatorRow = document.createElement("div");
        indicatorRow.classList.add("message-row", "bot", "typing-row");

        const wrapper = document.createElement("div");
        wrapper.classList.add("message-wrapper");

        const bubble = document.createElement("div");
        bubble.classList.add("message-bubble");
        
        const indicator = document.createElement("div");
        indicator.classList.add("typing-indicator");
        indicator.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;

        bubble.appendChild(indicator);
        wrapper.appendChild(bubble);
        indicatorRow.appendChild(wrapper);
        chatFeed.appendChild(indicatorRow);
        
        scrollToBottom();
        return indicatorRow;
    }

    function appendOptions(optionsArray) {
        if (!optionsArray || optionsArray.length === 0) return;

        const optionsRow = document.createElement("div");
        optionsRow.classList.add("options-container");

        optionsArray.forEach(optionId => {
            const node = chatbotData.nodes[optionId];
            if (!node) return;

            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            if (optionId === "root" || node.title === "Back") {
                btn.classList.add("back-btn");
            }
            
            btn.innerText = optionId === "root" ? "↩ Main Menu" : node.title;
            btn.addEventListener("click", () => handleOptionSelection(optionId, btn.innerText));
            optionsRow.appendChild(btn);
        });

        chatFeed.appendChild(optionsRow);
        scrollToBottom();
    }

    function triggerBotResponse(nodeId) {
        const node = chatbotData.nodes[nodeId];
        if (!node) return;

        currentActiveNode = nodeId;
        
        // Dynamically replace default "Alex" greeting name with active student's first name
        let messageText = node.message;
        if (nodeId === "root") {
            const profile = studentProfiles[currentProfileKey];
            messageText = messageText.replace("Alex", profile.firstName);
        }
        
        const typingSetting = document.getElementById("setting-typing");
        const isTypingEnabled = typingSetting ? typingSetting.checked : true;
        const delayMs = isTypingEnabled ? 900 : 0;

        if (delayMs > 0) {
            const typingIndicator = appendTypingIndicator();
            setTimeout(() => {
                typingIndicator.remove();
                appendMessage("bot", formatMessageText(messageText));
                appendOptions(node.options);
                speakBotResponse(messageText);
            }, delayMs);
        } else {
            appendMessage("bot", formatMessageText(messageText));
            appendOptions(node.options);
            speakBotResponse(messageText);
        }
    }

    function handleOptionSelection(nodeId, optionText) {
        appendMessage("user", optionText);
        
        const allOptionContainers = document.querySelectorAll(".options-container");
        allOptionContainers.forEach(container => container.remove());

        triggerBotResponse(nodeId);
    }

    // --- Non-AI Parsing Logic ---

    function parseInputKeywords(userInput) {
        const cleanInput = userInput.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
            .trim();
        
        if (cleanInput.length === 0) return null;
        
        const inputWords = cleanInput.split(/\s+/);
        
        let bestNodeId = null;
        let highestScore = 0;

        for (const rule of chatbotData.keywords) {
            let ruleScore = 0;
            
            for (const key of rule.keys) {
                if (cleanInput.includes(key)) {
                    ruleScore += (key.split(" ").length * 5);
                }
                
                const keyWords = key.split(" ");
                keyWords.forEach(keyWord => {
                    if (inputWords.includes(keyWord) && keyWord.length > 2) {
                        ruleScore += 1;
                    }
                });
            }

            if (ruleScore > highestScore) {
                highestScore = ruleScore;
                bestNodeId = rule.nodeId;
            }
        }

        return highestScore > 0 ? bestNodeId : null;
    }

    function handleUserTextSubmit(text) {
        const query = text.trim();
        if (!query) return;

        appendMessage("user", query);

        const allOptionContainers = document.querySelectorAll(".options-container");
        allOptionContainers.forEach(container => container.remove());

        const matchedNodeId = parseInputKeywords(query);

        if (matchedNodeId) {
            triggerBotResponse(matchedNodeId);
        } else {
            const typingSetting = document.getElementById("setting-typing");
            const isTypingEnabled = typingSetting ? typingSetting.checked : true;
            const delayMs = isTypingEnabled ? 900 : 0;
            
            if (delayMs > 0) {
                const typingIndicator = appendTypingIndicator();
                setTimeout(() => {
                    typingIndicator.remove();
                    triggerFallbackResponse(query);
                }, delayMs);
            } else {
                triggerFallbackResponse(query);
            }
        }
    }

    function triggerFallbackResponse(query) {
        const fallbackText = `I couldn't quite find details matching "${escapeHtml(query)}". Please pick a shortcut below or try rephrasing (e.g., using terms like "registration", "WiFi", or "Mahapola").`;
        
        appendMessage("bot", fallbackText);
        appendOptions(["course_registration", "campus_map", "it_support", "mahapola_aid", "events_activities"]);
        speakBotResponse(fallbackText);
    }

    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    function resetChat() {
        chatFeed.innerHTML = "";
        currentActiveNode = "root";
        triggerBotResponse("root");
    }

    // --- FAQ Accordion Toggler ---

    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const faqItem = trigger.closest(".faq-item");
            if (!faqItem) return;
            
            faqItem.classList.toggle("active");
            
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove("active");
                }
            });
        });
    });

    // --- Event Listeners: Navigation ---

    navChat.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("view-chat", navChat);
    });

    navDashboard.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("view-dashboard", navDashboard);
    });

    navNotices.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("view-notices", navNotices);
    });

    navFaqs.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("view-faqs", navFaqs);
    });

    navServices.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("view-services", navServices);
    });

    navContact.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("view-contact", navContact);
    });

    navResetChatSidebar.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("view-chat", navChat);
        if (confirm("Reset current help session?")) {
            resetChat();
        }
    });

    // Theme toggle switch change
    themeToggle.addEventListener("change", toggleTheme);

    // Profile selector change in dashboard
    if (profileSelect) {
        profileSelect.addEventListener("change", () => {
            loadProfile(profileSelect.value);
        });
    }

    // Form submit typed question
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatInput.value;
        chatInput.value = "";
        handleUserTextSubmit(text);
    });

    // Quick action attach menu simulator
    const quickAttachBtn = document.getElementById("btn-quick-attach");
    if (quickAttachBtn) {
        quickAttachBtn.addEventListener("click", () => {
            const actions = [
                "Submit IT Ticket",
                "View Library Hours",
                "Show Mahapola Stipend Info"
            ];
            const choice = prompt(`Quick Actions:\n\n1. ${actions[0]}\n2. ${actions[1]}\n3. ${actions[2]}\n\nEnter number (1-3):`);
            if (choice === "1") {
                switchView("view-contact", navContact);
            } else if (choice === "2") {
                switchView("view-chat", navChat);
                handleOptionSelection("library_hours", "Quick Action: Library Hours");
            } else if (choice === "3") {
                switchView("view-chat", navChat);
                handleOptionSelection("mahapola_scholarship", "Quick Action: Mahapola Payout");
            }
        });
    }

    // --- Init ---
    loadProfile("kasun"); // Load Kasun as the default student profile
});
