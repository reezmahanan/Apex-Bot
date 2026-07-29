/**
 * College Help Desk Chatbot Data - Sri Lankan Educational Context
 * Contains the decision tree structure and keyword mappings adapted to Sri Lankan
 * higher education terminology (Mahapola, GCE A/L, Z-Score, LKR, BOC, etc.).
 */

const chatbotData = {
  collegeName: "Apex University of Sri Lanka",
  
  // The decision tree nodes
  nodes: {
    "root": {
      title: "Main Menu",
      message: "Ayubowan! 👋 I'm Apex Bot, your University Help Desk. How can I assist you today? Please select a topic below or ask me anything.",
      options: ["course_registration", "campus_map", "it_support", "mahapola_aid", "events_activities"]
    },
    
    // --- COURSE REGISTRATION ---
    "course_registration": {
      title: "Course Registration",
      message: "Registration for the **Year 2026 - Semester 1** is now open. Here are the registration periods:\n\n• **Priority Enrollment:** March 15 – April 10\n• **Late Enrollment (Fine Applies):** April 11 – April 25\n\nHow can I help you with course registration today?",
      options: ["course_catalog", "enrollment_status", "root"]
    },
    "course_catalog": {
      title: "Course Catalog",
      message: "You can view all module descriptions, credits (credits per module), and prerequisites online in our Faculty Directory:\n\n<a href='#' class='chat-link' onclick='window.alert(\"Opening Faculty Course Directory...\")'>Search Semester Modules Directory →</a>",
      options: ["enrollment_status", "course_registration"]
    },
    "enrollment_status": {
      title: "Enrollment Status",
      message: "To view your registered modules, check advisor approvals, or inspect any registrar holds, log into the Student LMS Portal:\n\n<a href='#' class='chat-link' onclick='window.alert(\"Redirecting to LMS Enrollment Dashboard...\")'>Go to Student LMS Dashboard →</a>",
      options: ["course_catalog", "course_registration"]
    },

    // --- CAMPUS MAP & LOCATIONS ---
    "campus_map": {
      title: "Campus Map",
      message: "The Main Library (Lib) is located at the center of the campus. The Student Union Center (STU) is right next to the main canteen! Check out the details below.",
      options: ["map_details", "library_hours", "directions", "root"]
    },
    "map_details": {
      title: "Campus Map Link",
      message: "You can download the campus map PDF or use the interactive Google Map locator for our Malabe premises:\n\n<a href='#' class='chat-link' onclick='window.alert(\"Opening Campus Google Map...\")'>Open Live Interactive Campus Map →</a>",
      options: ["library_hours", "directions", "campus_map"]
    },
    "library_hours": {
      title: "Library Hours",
      message: "Here are the hours for the **Apex Main Library**:\n\n• **Weekdays:** 8:00 AM – 8:00 PM\n• **Saturdays:** 8:30 AM – 5:00 PM\n• **Sundays & Poya Days:** Closed",
      options: ["map_details", "directions", "campus_map"]
    },
    "directions": {
      title: "Directions",
      message: "The campus is located on Kaduwela Road. Visitor parking is available near **Gate 2** (free parking decals are issued to registered student vehicles at the security office).",
      options: ["map_details", "library_hours", "campus_map"]
    },

    // --- IT SUPPORT (LMS & WiFi) ---
    "it_support": {
      title: "IT Support",
      message: "The IT Help Desk can assist you with your Student Email, LMS, and WiFi accounts. What service are you having trouble with?",
      options: ["wifi_setup", "password_reset", "student_email", "root"]
    },
    "wifi_setup": {
      title: "WiFi Setup",
      message: "To connect to the **Apex-Secure** campus WiFi:\n\n1. Select 'Apex-Secure' from your device's WiFi list.\n2. Log in using your student email username (`indexNo@student.apex.edu.lk`) and LMS password.\n3. Accept the security certificate if prompted.\n\n*Note: Guests can connect to 'Apex-Guest' and register via browser OTP.*",
      options: ["password_reset", "it_support"]
    },
    "password_reset": {
      title: "Password Reset",
      message: "If you cannot access your LMS or student email, reset your credentials using the password self-service portal:\n\n<a href='#' class='chat-link' onclick='window.alert(\"Opening Password Reset Tool...\")'>Reset Student Password →</a>",
      options: ["wifi_setup", "it_support"]
    },
    "student_email": {
      title: "Student Email",
      message: "Your official Apex student email is hosted on Office 365. Your address is `indexNo@student.apex.edu.lk`.\n\n<a href='#' class='chat-link' onclick='window.alert(\"Opening student email web login...\")'>Access Student Email Login →</a>",
      options: ["wifi_setup", "it_support"]
    },

    // --- MAHAPOLA & SCHOLARSHIPS (Sri Lankan Aid) ---
    "mahapola_aid": {
      title: "Mahapola & Aid",
      message: "We support multiple financial assistance schemes. Which one would you like to inquire about?",
      options: ["mahapola_scholarship", "student_loan_scheme", "tuition_fees_lkr", "root"]
    },
    "mahapola_scholarship": {
      title: "Mahapola Scholarship",
      message: "The **Mahapola Higher Education Scholarship** payments are disbursed monthly. \n\n• **Stipend amount:** LKR 5,000 per month.\n• **Eligibility:** Based on UGC selection criteria (A/L Z-Score and parental income).\n• **Payout:** Handed over in batches at the Student Services Division on the 10th of every month. Bring your National Identity Card (NIC) and Student ID.",
      options: ["student_loan_scheme", "tuition_fees_lkr", "mahapola_aid"]
    },
    "student_loan_scheme": {
      title: "Interest-Free Student Loans",
      message: "The Ministry of Education offers the **Interest-Free Student Loan Scheme (IFSLS)** for eligible students. Applications open annually after the release of GCE A/L results.\n\nFor details and to check eligibility, visit the Ministry Portal:\n<a href='#' class='chat-link' onclick='window.alert(\"Redirecting to Ministry Student Loan Portal...\")'>Ministry Student Loan Portal →</a>",
      options: ["mahapola_scholarship", "tuition_fees_lkr", "mahapola_aid"]
    },
    "tuition_fees_lkr": {
      title: "Tuition Fees & Payments",
      message: "Semester tuition fees must be paid to the university bank accounts at **Bank of Ceylon (BOC)** or **People's Bank** using the deposit slips provided.\n\n• **BOC Account No:** `8874321` (Apex University Account)\n• **e-Payment:** Credit cards are accepted via the Student Portal online billing system.",
      options: ["mahapola_scholarship", "student_loan_scheme", "mahapola_aid"]
    },

    // --- EVENTS & CAMPUS LIFE ---
    "events_activities": {
      title: "Events & Clubs",
      message: "Get active in campus life! We have several registered student bodies:\n\n• **Student Clubs:** Rotaract, Gavel Club, IEEE Student Branch, Leo Club, Sports Council.\n• **Welcome Festival:** Year 1 orientation and welcome fair on August 26 in the main auditorium.\n• **Recreation Complex:** Free access to badminton courts, gym, and grounds with your Student ID card.",
      options: ["root"]
    }
  },

  // Keyword dictionary mapping query synonyms to node IDs
  keywords: [
    {
      keys: ["register", "registration", "course", "courses", "module", "modules", "enroll", "enrollment", "add module", "drop module", "semester", "time ticket"],
      nodeId: "course_registration"
    },
    {
      keys: ["catalog", "directory", "prerequisites", "course finder", "major", "faculty", "faculties"],
      nodeId: "course_catalog"
    },
    {
      keys: ["holds", "advisor", "holds check", "portal login", "student account", "lms", "lms portal"],
      nodeId: "enrollment_status"
    },
    {
      keys: ["library", "lib", "student center", "stu", "canteen", "auditorium", "lecture hall", "parking", "gate 2"],
      nodeId: "campus_map"
    },
    {
      keys: ["map", "interactive map", "pdf map", "campus layout", "google map", "malabe"],
      nodeId: "map_details"
    },
    {
      keys: ["hours", "library hours", "when does library open", "library closing"],
      nodeId: "library_hours"
    },
    {
      keys: ["directions", "where is", "how to get to", "address", "location", "locate", "kaduwela road"],
      nodeId: "directions"
    },
    {
      keys: ["it", "wifi", "internet", "wireless", "connect", "secure wifi", "guest wifi"],
      nodeId: "wifi_setup"
    },
    {
      keys: ["password", "reset", "forgot", "locked out", "change password", "credential", "reset password"],
      nodeId: "password_reset"
    },
    {
      keys: ["email", "student email", "office 365", "mailbox", "outlook"],
      nodeId: "student_email"
    },
    {
      keys: ["help", "help desk", "it support", "support", "technical", "computer", "login"],
      nodeId: "it_support"
    },
    {
      keys: ["mahapola", "bursary", "stipend", "ugc", "scholarship", "scholarships", "financial aid", "nic"],
      nodeId: "mahapola_scholarship"
    },
    {
      keys: ["loan", "loans", "interest free", "student loan", "ifsls", "ministry of education"],
      nodeId: "student_loan_scheme"
    },
    {
      keys: ["tuition", "cost", "price", "fees", "how much", "payment", "bank", "boc", "peoples bank", "deposit", "bill"],
      nodeId: "tuition_fees_lkr"
    },
    {
      keys: ["aid", "financial aid", "scholarship", "loans"],
      nodeId: "mahapola_aid"
    },
    {
      keys: ["events", "activities", "clubs", "rotaract", "gavel", "ieee", "leo", "sports", "gym", "orientation", "canteen"],
      nodeId: "events_activities"
    },
    {
      keys: ["hello", "hi", "hey", "greetings", "menu", "start", "restart", "clear", "welcome", "ayubowan"],
      nodeId: "root"
    }
  ]
};
