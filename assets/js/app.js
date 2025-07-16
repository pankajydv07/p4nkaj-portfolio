/**
 * Portfolio Application
 * Main application logic for the portfolio website
 */

class PortfolioApp {
  constructor() {
    this.currentPage = 'about';
    this.init();
  }

  init() {
    this.initializeComponents();
    this.bindEvents();
    this.handleInitialRoute();
  }

  initializeComponents() {
    // Initialize all components
    this.sidebar = new Sidebar();
    this.navigation = new Navigation();
    this.projects = new Projects();
    this.contact = new Contact();
    this.animations = new Animations();
  }

  bindEvents() {
    // Handle browser back/forward buttons and hash changes
    window.addEventListener('popstate', (event) => {
      this.handleRouteChange();
    });
    
    // Handle hash changes
    window.addEventListener('hashchange', (event) => {
      this.handleRouteChange();
    });
  }

  handleInitialRoute() {
    const hash = window.location.hash.slice(1) || 'about';
    this.navigateTo(hash);
  }

  handleRouteChange() {
    const hash = window.location.hash.slice(1) || 'about';
    this.navigateTo(hash);
  }

  navigateTo(page) {
    // Handle root path and empty path
    if (page === '' || page === '/' || page === 'index') {
      page = 'about';
    }
    
    this.navigation.setActivePage(page);
    this.currentPage = page;
  }
}

/**
 * Sidebar Component
 */
class Sidebar {
  constructor() {
    this.sidebar = document.querySelector('[data-sidebar]');
    this.sidebarBtn = document.querySelector('[data-sidebar-btn]');
    this.bindEvents();
  }

  bindEvents() {
    if (this.sidebarBtn) {
      this.sidebarBtn.addEventListener('click', () => {
        this.toggle();
      });
    }
  }

  toggle() {
    this.sidebar?.classList.toggle('active');
  }
}

/**
 * Navigation Component
 */
class Navigation {
  constructor() {
    this.navigationLinks = document.querySelectorAll('[data-nav-link]');
    this.pages = document.querySelectorAll('[data-page]');
    this.bindEvents();
  }

  bindEvents() {
    this.navigationLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        let page = link.getAttribute('data-nav-link');
        
        // Handle the "Pankaj" button (home/about page)
        if (!page && link.textContent.trim() === 'Pankaj') {
          page = 'about';
        } else if (!page) {
          page = link.textContent.toLowerCase();
        }
        
        this.setActivePage(page);
        this.updateURL(page);
      });
    });
  }

  setActivePage(pageName) {
    // Remove active class from all pages and links
    this.pages.forEach(page => page.classList.remove('active'));
    this.navigationLinks.forEach(link => link.classList.remove('active'));

    // Add active class to current page and link
    const targetPage = document.querySelector(`[data-page="${pageName}"]`);
    
    // Handle the Pankaj button specifically
    let targetLink;
    if (pageName === 'about') {
      targetLink = document.querySelector('.navbar-link[data-nav-link="about"]');
      if (!targetLink) {
        // Fallback: find button with "Pankaj" text
        targetLink = Array.from(this.navigationLinks).find(link => 
          link.textContent.trim() === 'Pankaj'
        );
      }
    } else {
      targetLink = document.querySelector(`[data-nav-link="${pageName}"]`);
    }

    if (targetPage) {
      targetPage.classList.add('active');
    }
    if (targetLink) {
      targetLink.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  updateURL(pageName) {
    const hash = pageName === 'about' ? '' : `#${pageName}`;
    window.location.hash = hash;
  }
}

/**
 * Projects Component
 */
class Projects {
  constructor() {
    this.filterButtons = document.querySelectorAll('[data-filter-btn]');
    this.selectItems = document.querySelectorAll('[data-select-item]');
    this.filterItems = document.querySelectorAll('[data-filter-item]');
    this.select = document.querySelector('[data-select]');
    this.selectValue = document.querySelector('[data-selecct-value]');
    this.bindEvents();
  }

  bindEvents() {
    // Filter buttons
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleFilter(btn.textContent.toLowerCase());
        this.updateActiveButton(btn);
      });
    });

    // Select dropdown
    if (this.select) {
      this.select.addEventListener('click', () => {
        this.select.classList.toggle('active');
      });
    }

    // Select items
    this.selectItems.forEach(item => {
      item.addEventListener('click', () => {
        const value = item.textContent.toLowerCase();
        this.handleFilter(value);
        this.updateSelectValue(item.textContent);
        this.select?.classList.remove('active');
      });
    });
  }

  handleFilter(category) {
    this.filterItems.forEach(item => {
      const itemCategory = item.dataset.category;
      if (category === 'all' || category === itemCategory) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  updateActiveButton(activeBtn) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  updateSelectValue(value) {
    if (this.selectValue) {
      this.selectValue.textContent = value;
    }
  }
}

/**
 * Contact Component
 */
class Contact {
  constructor() {
    this.form = document.querySelector('[data-form]');
    this.formInputs = document.querySelectorAll('[data-form-input]');
    this.formBtn = document.querySelector('[data-form-btn]');
    this.bindEvents();
  }

  bindEvents() {
    this.formInputs.forEach(input => {
      input.addEventListener('input', () => {
        this.validateForm();
      });
    });

    if (this.formBtn) {
      this.formBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  validateForm() {
    if (this.form?.checkValidity()) {
      this.formBtn?.removeAttribute('disabled');
    } else {
      this.formBtn?.setAttribute('disabled', '');
    }
  }

  async handleSubmit() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    try {
      // Here you would typically send the data to your backend
      console.log('Form data:', data);
      this.showSnackbar('Message sent successfully!', 'success');
      this.form?.reset();
      this.validateForm();
    } catch (error) {
      console.error('Error sending message:', error);
      this.showSnackbar('Failed to send message. Please try again.', 'error');
    }
  }

  showSnackbar(message, type = 'info') {
    const snackbar = document.getElementById('snackbar');
    if (snackbar) {
      snackbar.textContent = message;
      snackbar.className = `show ${type}`;
      setTimeout(() => {
        snackbar.classList.remove('show');
      }, 3000);
    }
  }
}

/**
 * Animations Component
 */
class Animations {
  constructor() {
    this.init();
  }

  init() {
    this.initializeSkillAnimations();
    this.initializeTypewriterEffect();
  }

  initializeSkillAnimations() {
    const skillElements = document.querySelectorAll('.skill-progress-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const percentage = element.id;
          this.animateSkill(element, percentage);
          observer.unobserve(element);
        }
      });
    });

    skillElements.forEach(element => {
      observer.observe(element);
    });
  }

  animateSkill(element, skillName) {
    const percentages = {
      'python': 85,
      'dart': 80,
      'javascript': 75,
      'git': 90,
      'aiml': 70,
      'flask': 80,
      'react': 75
    };

    const percentage = percentages[skillName] || 0;
    element.style.width = `${percentage}%`;
  }

  initializeTypewriterEffect() {
    const fullText = PORTFOLIO_CONFIG.about.text;
    
    const element = document.getElementById('intro-text');
    if (element) {
      this.typewriter(element, fullText, 30);
    }
  }

  typewriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }
}

/**
 * Utility Functions
 */
class Utils {
  static elementToggle(element) {
    element?.classList.toggle('active');
  }

  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  
  // Ensure about page is shown by default if no specific page is active
  setTimeout(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || hash === 'about') {
      app.navigation.setActivePage('about');
    } else {
      app.navigation.setActivePage(hash);
    }
  }, 100);

  // Initialize enhanced features
  initializeSkillsAnimation();
  initializeTypingEffect();
  initializeSmoothScrolling();
});

// Skills Animation with proper timing
function initializeSkillsAnimation() {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.skill-progress-fill');
        skillBars.forEach(bar => {
          const skill = bar.id;
          const widths = {
            'python': '90%',
            'dart': '85%',
            'javascript': '88%',
            'git': '85%',
            'aiml': '70%',
            'flask': '75%',
            'react': '85%'
          };
          
          setTimeout(() => {
            bar.style.width = widths[skill] || '70%';
          }, 200);
        });
      }
    });
  });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
}

// Typing Effect for Main Title
function initializeTypingEffect() {
  const titleElement = document.getElementById('title');
  if (titleElement) {
    const titles = [
      'Full-stack Developer!',
      'Mobile App Developer!',
      'AI Enthusiast!',
      'Open Source Contributor!',
      'Problem Solver!'
    ];
    
    let currentIndex = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentTitle = titles[currentIndex];
      
      if (isDeleting) {
        titleElement.textContent = currentTitle.substring(0, currentChar - 1);
        currentChar--;
        
        if (currentChar === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % titles.length;
          setTimeout(typeEffect, 500);
          return;
        }
      } else {
        titleElement.textContent = currentTitle.substring(0, currentChar + 1);
        currentChar++;
        
        if (currentChar === currentTitle.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
          return;
        }
      }
      
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    
    typeEffect();
  }
}

// Smooth Scrolling Enhancement
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add smooth transition effect
      document.querySelector('.main-content').style.transform = 'translateY(10px)';
      document.querySelector('.main-content').style.opacity = '0.8';
      
      setTimeout(() => {
        document.querySelector('.main-content').style.transform = 'translateY(0)';
        document.querySelector('.main-content').style.opacity = '1';
      }, 200);
    });
  });
}

// Enhanced Contact Form with Better Validation
function initializeContactForm() {
  const form = document.querySelector('.form');
  const submitBtn = document.querySelector('[data-form-btn]');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!data.fullname || !data.email || !data.message) {
        showNotification('Please fill in all fields!', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
      }
      
      // Simulate form submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<ion-icon name="hourglass"></ion-icon><span>Sending...</span>';
      
      setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
      }, 2000);
    });
  }
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' ? 'background: #10b981;' : 
      type === 'error' ? 'background: #ef4444;' : 
      'background: #3b82f6;'}
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContactForm); 