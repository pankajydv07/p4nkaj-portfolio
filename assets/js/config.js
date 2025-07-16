/**
 * Portfolio Configuration
 * Centralized configuration for the portfolio website
 */

const PORTFOLIO_CONFIG = {
  // Personal Information
  personal: {
    name: "Pankaj Yadav",
    title: "Full-stack Developer!",
    email: "pankajyadsv08@gmail.com",
    phone: "8540871410",
    location: "SRM University, Andhra Pradesh",
    university: "SRM University, Andhra Pradesh",
    universityUrl: "https://srmap.edu.in/"
  },

  // Social Media Links
  social: {
    github: "https://github.com/pankajydv07",
    linkedin: "https://linkedin.com/in/pankaj-yadav",
    instagram: "https://www.instagram.com/pankaj/",
    twitter: "https://twitter.com/pankaj",
    telegram: "https://me_pankaj.t.me"
  },

  // Projects Data
  projects: [
    {
      title: "Agri-Connect",
      description: "🌾 AI-Powered Agricultural Marketplace - multilingual digital marketplace connecting farmers with buyers, featuring voice-based intelligent assistant with speech-to-text capabilities.",
      category: "web development",
      url: "https://github.com/pankajydv07/agri-connect",
      icon: "logo-github"
    },
    {
      title: "AI Chatbot",
      description: "🤖 Intelligent Conversational Assistant using React, TypeScript, and OpenAI GPT-4o with automated function calling and IP-based location detection.",
      category: "web development",
      url: "https://alucard-five.vercel.app",
      icon: "logo-github"
    },
    {
      title: "Project WanderLust",
      description: "🏠 Full-Stack Web Application inspired by Airbnb for accommodation booking with user authentication, listing management, and booking functionality.",
      category: "web development",
      url: "https://projectwanderlust-m1x6.onrender.com",
      icon: "logo-github"
    },
    {
      title: "Event Management System",
      description: "📅 Node.js-based event management system with MongoDB integration, RESTful APIs, and dynamic rendering with Express & EJS.",
      category: "web development",
      url: "https://srmhacknhub.vercel.app",
      icon: "logo-github"
    },
    {
      title: "Spam Email Detection Model (MailGuard)",
      description: "🛡️ Built a spam detection system using NLP and Random Forest Classifier, achieving 95% accuracy with 10,000+ email samples.",
      category: "others",
      url: "https://github.com/pankajydv07/MailGuard",
      icon: "logo-github"
    }
  ],

  // Skills Data
  skills: {
    languages: [
      { name: "Python", percentage: 85 },
      { name: "Dart", percentage: 80 },
      { name: "JavaScript", percentage: 75 },
      { name: "Git", percentage: 90 }
    ],
    frameworks: [
      { name: "AI/ML", percentage: 70 },
      { name: "Flask", percentage: 80 },
      { name: "React & Next", percentage: 75 }
    ]
  },

  // About Text
  about: {
    text: "As a versatile developer with a passion for technology, I have a diverse range of skills that I bring to the table. I am a skilled backend developer with expertise in creating frontend applications, websites, and web scraping. My ability to work seamlessly with teams has helped me to develop effective communication and collaboration skills, enabling me to contribute meaningfully to any project. I am also a quick learner, always eager to learn new technologies and improve my skills. In addition to my technical expertise, I am a detail-oriented individual who takes pride in delivering high-quality work. My commitment to excellence is reflected in my portfolio, which showcases my ability to create user-friendly, functional, and visually appealing applications. Whether you need a developer who can handle complex backend processes or create stunning frontend interfaces, I have the skills and expertise to meet your needs. Contact me today to learn more about how I can help bring your project to life."
  },

  // Services
  services: [
    {
      title: "Mobile Apps Development",
      description: "Professional development of applications for iOS and Android.",
      animation: "/assets/images/mobileappdev.json"
    },
    {
      title: "Back-end Development",
      description: "High-quality development of backend and APIs at the professional level.",
      animation: "/assets/images/backend.json"
    },
    {
      title: "Web Apps Development",
      description: "Professional development of applications for web.",
      animation: "./assets/images/webapps.json"
    },
    {
      title: "Web Scraping",
      description: "Scraping and data analysis of the web.",
      animation: "/assets/images/webscrape.json"
    }
  ],

  // Preloader Settings
  preloader: {
    duration: 1500,
    taglines: [
      // Funny
      "I'm running faster than your internet.",
      "I'm not ratty, I'm just loading.",
      "Don't rat me out, I'm almost done.",
      "I'm not a snitch, I'm just fetching your data.",
      "I'm not playing cat and mouse, I'm just loading.",
      "I'm not a pest, I'm a helper.",
      "Don't worry, I'm not contagious.",
      "I'm not running away, I'm running towards your content.",
      "I'm not a lab rat, I'm a web rat.",
      "I'm not lazy, I'm just taking a break.",
      "Hang in there, the rat race is almost over.",
      "Don't be cheesy, I'm loading as fast as I can.",
      "This rat is on a mission, please wait a bit.",

      // Official
      "Please wait while I prepare your content.",
      "Loading... Thank you for your patience.",
      "Your request is being processed, please stand by.",
      "Please wait while I fetch your data.",
      "Loading... Your satisfaction is our priority.",
      "Please wait while I optimize your experience.",
      "Loading... We value your time and feedback.",
      "Please wait while I connect you to our server.",
      "Loading... We are working hard to deliver your content.",
      "Please wait while I verify your request.",
      "Loading... We are committed to quality and service.",
      "Please wait while I update our system.",

      // Gen Z
      "Loading... I'm fire, no lie.",
      "I'm highkey grinding, just vibe for a bit.",
      "Loading... I'm savage, not basic.",
      "I'm flexing, just hang on for a hot sec.",
      "Loading... I'm goals, trust.",
      "I'm slaying, just chillax for a moment.",
      "Loading... I'm dope, facts.",
      "I'm woke, just sit tight for a while.",
      "Loading... I'm sick, in a good way.",
      "I'm legit, just hold up for a minute.",
      "BRB, I'm zooming.",
      "Loading... no cap, I'm lit.",
      "I'm lowkey hustling, just chill for a sec.",
      "Loading... Ganpati bappa morya!",
      "I'm not a rat, I'm a devotee of Ganesha.",
      "Please wait while I remove your obstacles.",
      "Loading... May Ganesha bless you with wisdom and success.",
      "I'm not running away, I'm running towards Ganesha.",
      "Please wait while I bring you good luck and prosperity.",
      "Loading... Jai Ganesh, Jai Ganesh, Jai Ganesh Deva."
    ]
  },

  // Animation Settings
  animations: {
    typewriterSpeed: 50,
    skillAnimationDelay: 100
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_CONFIG;
} 