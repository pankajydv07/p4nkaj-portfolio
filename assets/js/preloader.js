/**
 * Preloader Management
 * Handles the loading screen and random taglines
 */

class Preloader {
  constructor() {
    this.preloader = document.querySelector('.preloader');
    this.loadingText = document.querySelector('.loading-text');
    this.taglines = [
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
      "Loading... Jai Ganesh, Jai Ganesh, Jai Ganesh Deva.",
    ];
    
    this.init();
  }

  init() {
    this.setRandomTagline();
    this.handlePageLoad();
  }

  setRandomTagline() {
    if (this.loadingText) {
      const randomIndex = Math.floor(Math.random() * this.taglines.length);
      this.loadingText.textContent = this.taglines[randomIndex];
    }
  }

  handlePageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hide();
      }, 1500);
    });
  }

  hide() {
    if (this.preloader) {
      this.preloader.classList.remove('active');
    }
  }

  show() {
    if (this.preloader) {
      this.preloader.classList.add('active');
    }
  }
}

// Initialize preloader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Preloader();
}); 