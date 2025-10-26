"use client";

import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

// The content comes verbatim from reference.tsx but adapted for Next.js app router page

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Tutor MVP",
    description: "AI-driven tutoring platform with step-by-step explanations, animated lessons, and multilingual text-to-speech for interactive learning.",
    tags: ["React", "Node.js", "MongoDB", "Nebius AI", "Manim"],
    link: "https://github.com/ujjwalpan001/Solveit_AI",
    github: "https://github.com/ujjwalpan001/Solveit_AI"
  },
  {
    id: 2,
    title: "BeyondChats",
    description: "AI-powered PDF learning platform with ChatGPT-style conversations, dynamic quiz generation, and progress tracking for students.",
    tags: ["React", "RAG", "AI Integration", "PDF Processing"],
    link: "https://beyondchats-revision-app.vercel.app/",
    github: "https://github.com/pankajydv07/beyondchats-revision-app"
  },
  {
    id: 3,
    title: "ElderCare Support Platform",
    description: "MERN-based eldercare solution with real-time health monitoring, emergency alerts, and community engagement forums.",
    tags: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    link: "https://eldercare-support.onrender.com/",
    github: "https://github.com/pankajydv07/ElderCare-Support"
  },
  {
    id: 4,
    title: "Agri-Connect",
    description: "Multilingual AI-powered agricultural marketplace with GPT-powered voice assistant supporting English, Hindi, and Telugu.",
    tags: ["React", "Node.js", "OpenAI", "Speech-to-Text"],
    link: "https://agri-connect-sandy.vercel.app/",
    github: "https://github.com/pankajydv07/agri-connect"
  }
];

const skills = {
  Languages: ["C", "C++", "Python", "JavaScript", "SQL"],
  "Web & Mobile": ["React", "Node.js", "Express", "React Native", "Tailwind CSS", "REST APIs"],
  "Database & Cloud": ["MongoDB", "MySQL", "Azure", "GCP", "Vercel", "Docker"]
};

const skillLevels = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 82 },
  { name: "MongoDB", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Express", level: 83 },
  { name: "SQL", level: 78 },
  { name: "Azure/GCP", level: 75 },
  { name: "REST APIs", level: 87 },
  { name: "React Native", level: 80 },
  { name: "Docker", level: 72 }
];

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "SmartBridge (Salesforce Partner)",
    role: "Salesforce Developer Intern",
    period: "May 2025 - July 2025",
    description: [
      "Delivered 6+ Apex classes and Lightning Web Components to automate workflows, reducing manual data entry time by ~40%",
      "Earned the Apex Specialist Superbadge by completing end-to-end tasks in process automation, security, and UI customization"
    ],
    technologies: ["Salesforce", "Apex", "Lightning Web Components", "Process Automation"]
  },
  {
    id: 2,
    company: "Edunet Foundation",
    role: "Full-Stack Developer Intern",
    period: "May 2024 - July 2024",
    description: [
      "Designed and deployed a MERN-based eldercare platform supporting 100+ simulated users with real-time health monitoring",
      "Implemented JWT-secured authentication and responsive UI, improving platform reliability for diverse user roles"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Redux"]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const NavLink = ({ href, children, onClick, isMobile = false }: { href: string; children: React.ReactNode; onClick?: () => void; isMobile?: boolean }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        if (onClick) onClick();
      }}
      className={"group relative font-mono text-sm " + (isMobile ? 'text-2xl' : '') + " text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors duration-300"}
    >
      <span className="text-teal-500 dark:text-teal-300 mr-1">.</span>
      {children}
      {!isMobile && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full duration-300" />
      )}
    </a>
  );
};

const SectionHeading = ({ children, number }: { children: React.ReactNode; number: string }) => (
  <motion.h2
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className="flex items-center text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-12"
  >
    <span className="text-teal-500 font-mono text-xl mr-3 font-normal">{number}.</span>
    {children}
    <div className="ml-4 h-px bg-slate-200 dark:bg-slate-700 flex-grow max-w-xs hidden md:block" />
  </motion.h2>
);

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .cursor-pointer')) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-teal-500 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={cursorVariant}
        variants={{
          default: { scale: 0.5, opacity: 1 },
          hover: { scale: 3, opacity: 0.3 }
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
         className="fixed top-0 left-0 w-8 h-8 border border-teal-500 rounded-full pointer-events-none z-[99] mix-blend-difference hidden md:block"
         animate={{
             x: mousePosition.x - 16,
             y: mousePosition.y - 16,
             scale: cursorVariant === 'hover' ? 1.5 : 1
         }}
         transition={{
             type: "tween",
             ease: "backOut",
             duration: 0.15
         }}
      />
    </>
  );
};

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [showTerminal, setShowTerminal] = useState(false);
  const [command, setCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '<span class="text-teal-400">Welcome to Pankaj\'s Portfolio Terminal v1.0</span>',
    '<span class="text-slate-400">Type "help" for available commands</span>',
    ''
  ]);

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    // Remove the auto-detection of dark mode preference since we want dark mode by default
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setShowTerminal(prev => !prev);
      }
      if (e.key === 'Escape' && showTerminal) {
        setShowTerminal(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showTerminal]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = command.trim().toLowerCase();
      const output = [...terminalOutput];
      output.push(`<span class="text-teal-400">$</span> ${command}`);

      switch(cmd) {
        case 'help':
          output.push('<span class="text-slate-300">Available commands:</span>');
          output.push('  <span class="text-teal-400">about</span>     - Learn about Pankaj');
          output.push('  <span class="text-teal-400">skills</span>    - View technical skills');
          output.push('  <span class="text-teal-400">projects</span>  - List all projects');
          output.push('  <span class="text-teal-400">contact</span>   - Get contact information');
          output.push('  <span class="text-teal-400">social</span>    - View social media links');
          output.push('  <span class="text-teal-400">resume</span>    - Download resume');
          output.push('  <span class="text-teal-400">clear</span>     - Clear terminal');
          output.push('  <span class="text-teal-400">exit</span>      - Close terminal');
          break;
        case 'about':
          output.push('<span class="text-slate-300">👨‍💻 Pankaj Yadav</span>');
          output.push('<span class="text-slate-400">Software Engineering Student at SRM University AP</span>');
          output.push('<span class="text-slate-400">Specializing in full-stack development and AI-powered solutions</span>');
          break;
        case 'skills':
          output.push('<span class="text-teal-400">Languages:</span> <span class="text-slate-300">C, C++, Python, JavaScript, SQL</span>');
          output.push('<span class="text-teal-400">Web & Mobile:</span> <span class="text-slate-300">React, Node.js, Express, React Native, Tailwind CSS</span>');
          output.push('<span class="text-teal-400">Database & Cloud:</span> <span class="text-slate-300">MongoDB, MySQL, Azure, GCP, Docker</span>');
          break;
        case 'projects':
          output.push('<span class="text-slate-300">Featured Projects:</span>');
          output.push('  1. <span class="text-teal-400">AI Tutor MVP</span> - AI-driven tutoring platform');
          output.push('  2. <span class="text-teal-400">BeyondChats</span> - AI-powered PDF learning platform');
          output.push('  3. <span class="text-teal-400">ElderCare</span> - MERN-based eldercare solution');
          output.push('  4. <span class="text-teal-400">Agri-Connect</span> - Multilingual AI agricultural marketplace');
          break;
        case 'contact':
          output.push('<span class="text-teal-400">Email:</span> <span class="text-slate-300">pankajyadsv08@gmail.com</span>');
          output.push('<span class="text-teal-400">Location:</span> <span class="text-slate-300">India</span>');
          break;
        case 'social':
          output.push('<span class="text-teal-400">GitHub:</span> <span class="text-slate-300">github.com/pankajydv07</span>');
          output.push('<span class="text-teal-400">LinkedIn:</span> <span class="text-slate-300">linkedin.com/in/pankaj-yadav-67b26a291</span>');
          break;
        case 'resume':
          output.push('<span class="text-green-400">✓ Opening resume...</span>');
          setTimeout(() => window.open('/resume.pdf', '_blank'), 500);
          break;
        case 'clear':
          setTerminalOutput([]);
          setCommand('');
          return;
        case 'exit':
          setShowTerminal(false);
          setCommand('');
          return;
        case '':
          break;
        default:
          output.push(`<span class="text-red-400">Command not found: ${cmd}</span>`);
          output.push('<span class="text-slate-400">Type "help" for available commands</span>');
      }

      output.push('');
      setTerminalOutput(output);
      setCommand('');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '3ac9ca9a-a191-4be3-9e81-e43d8a79c75b', // Replace with your Web3Forms access key
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: 'New Contact Form Submission from Portfolio'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setFormStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try emailing directly at pankajyadsv08@gmail.com');
      setFormStatus('idle');
    }
  };

  return (
    <div className={"min-h-screen transition-colors duration-500 relative " + (darkMode ? 'dark' : '')}>
      {/* Background layer - Using soft grayish-blue for light mode */}
      <div className={"fixed inset-0 -z-10 " + (darkMode ? 'bg-[#0a192f]' : 'bg-[#e8eef3]')} />
      
      <div className="min-h-screen text-slate-900 dark:text-slate-300 font-sans selection:bg-teal-300/50 dark:selection:bg-teal-900/50 cursor-none-forced-md relative z-10">
        
        <ParticleBackground />
        <CustomCursor />

        <header 
          className={"fixed top-0 left-0 right-0 z-40 transition-all duration-500 " + (isScrolled ? 'py-4 bg-[#e8eef3]/95 dark:bg-[#0a192f]/90 backdrop-blur-lg shadow-sm dark:shadow-slate-900/20' : 'py-6 bg-transparent')}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
            <motion.a 
              href="#hero"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group flex items-center gap-2 relative z-50"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="text-teal-500 font-mono font-bold text-xl tracking-tighter border-2 border-teal-500 rounded p-1 group-hover:bg-teal-500/10 transition-colors">
                PY
              </div>
            </motion.a>

            <nav className="hidden md:flex items-center space-x-8">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><NavLink href="#about">About</NavLink></motion.div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><NavLink href="#experience">Experience</NavLink></motion.div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><NavLink href="#work">Work</NavLink></motion.div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><NavLink href="#skills">Skills</NavLink></motion.div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}><NavLink href="#contact">Contact</NavLink></motion.div>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-teal-400"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              <motion.a 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                href="/resume.pdf" 
                download="Pankaj_Yadav_Resume.pdf"
                className="px-4 py-2 text-sm font-mono text-teal-600 dark:text-teal-300 border border-teal-600 dark:border-teal-300 rounded hover:bg-teal-500/10 transition-colors"
              >
                Resume
              </motion.a>
            </nav>

            <div className="flex items-center gap-4 md:hidden z-50">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-teal-400"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                className="p-1 text-teal-500 z-50 relative"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 z-40 bg-slate-100 dark:bg-[#112240] flex flex-col items-center justify-center md:hidden"
            >
              <nav className="flex flex-col items-center space-y-8">
                <NavLink isMobile href="#about" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
                <NavLink isMobile href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</NavLink>
                <NavLink isMobile href="#work" onClick={() => setMobileMenuOpen(false)}>Work</NavLink>
                <NavLink isMobile href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</NavLink>
                <NavLink isMobile href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
                <a href="/resume.pdf" download="Pankaj_Yadav_Resume.pdf" className="mt-8 px-8 py-4 text-lg font-mono text-teal-500 border border-teal-500 rounded hover:bg-teal-500/10 transition-colors">
                  Resume
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="max-w-6xl mx-auto px-6 md:px-12">

          <section id="hero" className="min-h-screen flex flex-col justify-center pt-16">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-5 max-w-4xl"
            >
              <motion.p variants={fadeInUp} className="text-teal-500 font-mono ml-1">Hi, my name is</motion.p>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-slate-200">
                Pankaj Yadav.
              </motion.h1>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-7xl font-bold tracking-tight text-slate-500 dark:text-slate-400">
                I build things for the web.
              </motion.h2>
              <motion.p variants={fadeInUp} className="max-w-xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed pt-4">
                I'm a software engineering student at <span className="text-teal-500">SRM University AP</span>, specializing in full-stack development and AI-powered solutions. Currently exploring the intersection of web technologies and artificial intelligence.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="pt-10 flex items-center gap-6">
                <a 
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="px-8 py-4 bg-transparent border-2 border-teal-500 text-teal-500 font-mono rounded hover:bg-teal-500/10 transition-all active:scale-95 flex items-center gap-3"
                >
                  Check out my work <ArrowRight size={18} />
                </a>
              </motion.div>
            </motion.div>
          </section>

          <section id="about" className="py-24 md:py-32">
            <SectionHeading number="01">About Me</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-start">
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg"
              >
                <p>
                  Hello! I'm Pankaj, a Computer Science Engineering student at SRM University AP with a passion for building impactful web applications. My journey in software development started with curiosity about how websites work, and it quickly evolved into building full-stack solutions that solve real-world problems.
                </p>
                <p>
                  I've had the privilege of interning at <span className="text-teal-500">SmartBridge</span> as a Salesforce Developer and <span className="text-teal-500">Edunet Foundation</span> as a Full-Stack Developer. My focus is on creating accessible, user-friendly applications that make a difference.
                </p>
                <p>
                  Here are a few technologies I've been working with recently:
                </p>
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {[ 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'Salesforce' ].map(tech => (
                     <li key={tech} className="flex items-center gap-2 before:content-['▹'] before:text-teal-500">
                       {tech}
                     </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group max-w-sm mx-auto md:mx-0"
              >
                {/* Animated background glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main image container with floating animation */}
                <motion.div 
                  className="aspect-square rounded bg-teal-500/20 relative z-10 overflow-hidden transition-all duration-300 grayscale hover:grayscale-0"
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 1.02,
                    rotate: [0, -1, 1, -1, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <img 
                    src="/profile2.jpg" 
                    alt="Pankaj Yadav"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-teal-500/20 group-hover:bg-transparent transition-all duration-300" />
                  
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                </motion.div>
                
                {/* Animated border with rotation */}
                <motion.div 
                  className="absolute inset-0 border-2 border-teal-500 rounded translate-x-4 translate-y-4 z-0"
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />
              </motion.div>
            </div>
          </section>

          <section id="experience" className="py-24 md:py-32">
            <SectionHeading number="02">Where I've Worked</SectionHeading>
            <div className="max-w-3xl">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-12 relative pl-8 border-l-2 border-slate-200 dark:border-slate-700 last:mb-0 group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 border-4 border-slate-50 dark:border-[#0a192f] group-hover:scale-125 transition-transform" />
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {experience.role}
                      </h3>
                      <p className="text-teal-500 font-mono text-base">
                        {experience.company}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-1">
                        {experience.period}
                      </p>
                    </div>
                    
                    <ul className="space-y-2">
                      {experience.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                          <span className="text-teal-500 mt-1 flex-shrink-0">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {experience.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-teal-500/10 text-teal-600 dark:text-teal-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="work" className="py-24 md:py-32">
            <SectionHeading number="03">Some Things I've Built</SectionHeading>
            <ul className="space-y-24 md:space-y-32">
              {projects.map((project, index) => (
                <motion.li 
                  key={project.id} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={"grid grid-cols-12 gap-4 items-center " + (index % 2 === 1 ? 'md:text-right' : '')}
                >
                  <div className={"col-span-12 md:col-span-7 relative h-[300px] md:h-[360px] " + (index % 2 === 1 ? 'md:col-start-6 row-start-1' : 'md:col-start-1 row-start-1')}>
                     <a href={project.link} target="_blank" rel="noreferrer" className="w-full h-full block group relative rounded overflow-hidden bg-teal-500/30">
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-[#112240] group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0 mix-blend-multiply dark:mix-blend-luminosity group-hover:mix-blend-normal">
                          {project.id === 1 ? (
                            // AI Tutor MVP - Brain/Robot icon with float animation
                            <div className="icon-float icon-pulse">
                              <i className="fas fa-brain text-[140px] text-teal-500"></i>
                            </div>
                          ) : project.id === 2 ? (
                            // BeyondChats - Animated chat icon
                            <div dangerouslySetInnerHTML={{
                              __html: `<animated-icons src="https://animatedicons.co/get-icon?name=chat&style=minimalistic&token=aa724904-12c8-4d99-a7a1-cca76b7ddec0" trigger="loop" attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}' height="200" width="200"></animated-icons>`
                            }} />
                          ) : project.id === 3 ? (
                            // ElderCare - Heartbeat icon with pulse animation
                            <div className="icon-heartbeat icon-pulse">
                              <i className="fas fa-heartbeat text-[140px] text-teal-500"></i>
                            </div>
                          ) : project.id === 4 ? (
                            // Agri-Connect - Wheat/Seedling icon with bounce animation
                            <div className="icon-bounce icon-pulse">
                              <i className="fas fa-seedling text-[140px] text-teal-500"></i>
                            </div>
                          ) : (
                            <div className="w-20 h-20 border-2 border-slate-400 dark:border-slate-600 border-dashed rounded-full" />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-teal-900/30 dark:bg-teal-500/20 group-hover:bg-transparent transition-colors duration-300" />
                     </a>
                  </div>

                  <div className={"col-span-12 md:col-span-6 relative pointer-events-none md:pointer-events-auto z-10 " + (index % 2 === 1 ? 'md:col-start-1 row-start-1' : 'md:col-start-7 row-start-1')}>
                    <p className="font-mono text-teal-500 text-sm mb-2">Featured Project</p>
                    <h3 className="text-2xl font-bold mb-4">
                      <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-teal-500 transition-colors text-slate-900 dark:text-slate-100">
                        {project.title}
                      </a>
                    </h3>
                    
                    <div className="bg-slate-100 dark:bg-[#112240] p-6 rounded shadow-xl text-slate-700 dark:text-slate-400 text-sm md:text-base mb-4 hover:shadow-2xl transition-shadow">
                      {project.description}
                    </div>

                    <ul className={"flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-slate-600 dark:text-slate-400 mb-8 " + (index % 2 === 1 ? 'md:justify-end' : '')}>
                      {project.tags.map(tag => <li key={tag}>{tag}</li>)}
                    </ul>

                    <div className={"flex items-center gap-4 " + (index % 2 === 1 ? 'md:justify-end' : '')}>
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-300 transition-colors">
                        <Github size={22} />
                      </a>
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-300 transition-colors">
                        <ExternalLink size={22} />
                      </a>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>

          <section id="skills" className="py-24 md:py-32 max-w-4xl mx-auto">
             <SectionHeading number="04">Other Skills</SectionHeading>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
                {Object.entries(skills).map(([category, items], catIndex) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.2, duration: 0.5 }}
                  >
                    <h4 className="text-lg font-bold mb-6 text-slate-900 dark:text-slate-100 flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-teal-500">//</span> {category}
                    </h4>
                    <ul className="space-y-2.5 font-mono text-sm">
                      {items.map(skill => (
                        <li key={skill} className="text-slate-600 dark:text-slate-400">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
             </div>
          </section>

          <section id="contact" className="py-24 md:py-48 max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-teal-500 font-mono mb-4">05. What's Next?</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">Get In Touch</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
                Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-4 bg-teal-500/10 text-teal-600 dark:text-teal-300 rounded border border-teal-500/20 font-mono text-sm"
                >
                  Message sent successfully!
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-left md:mx-8">
                   <div className="grid grid-cols-2 gap-4">
                     <input 
                       type="text" placeholder="Name" required
                       value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}
                       className="w-full p-3 bg-slate-100 dark:bg-[#112240] rounded border border-transparent focus:border-teal-500 outline-none transition-all text-slate-900 dark:text-slate-100"
                     />
                     <input 
                       type="email" placeholder="Email" required
                       value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})}
                       className="w-full p-3 bg-slate-100 dark:bg-[#112240] rounded border border-transparent focus:border-teal-500 outline-none transition-all text-slate-900 dark:text-slate-100"
                     />
                   </div>
                   <textarea 
                     placeholder="Message" rows={4} required
                     value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})}
                     className="w-full p-3 bg-slate-100 dark:bg-[#112240] rounded border border-transparent focus:border-teal-500 outline-none transition-all resize-none text-slate-900 dark:text-slate-100"
                   />
                   <div className="text-center mt-8">
                     <button 
                       type="submit" 
                       disabled={formStatus === 'submitting'}
                       className="px-8 py-4 bg-transparent border-2 border-teal-500 text-teal-500 font-mono rounded hover:bg-teal-500/10 transition-all active:scale-95 disabled:opacity-50"
                     >
                       {formStatus === 'submitting' ? 'Sending...' : 'Say Hello'}
                     </button>
                   </div>
                </form>
              )}
            </motion.div>
          </section>

        </main>

        <footer className="py-8 text-center space-y-6 md:space-y-0">
          <div className="flex justify-center gap-8 md:hidden relative z-20">
            <a href="https://github.com/pankajydv07" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-teal-500"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/pankaj-yadav-67b26a291/" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-teal-500"><Linkedin size={20} /></a>
            <a href="mailto:pankajyadsv08@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-teal-500"><Mail size={20} /></a>
          </div>
          
          <a 
            href="https://github.com/pankajydv07" 
            target="_blank" 
            rel="noreferrer" 
            className="font-mono text-xs text-slate-500 dark:text-slate-400 hover:text-teal-500 transition-colors block pb-8"
          >
            Designed & Built by Pankaj Yadav
          </a>
        
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="hidden md:block fixed bottom-0 left-12 w-10 z-20"
          >
            <div className="flex flex-col items-center gap-6 text-slate-600 dark:text-slate-400 after:content-[''] after:w-px after:h-24 after:bg-slate-400 dark:after:bg-slate-600 after:block after:mx-auto">
               <a href="https://github.com/pankajydv07" target="_blank" rel="noreferrer" className="hover:text-teal-500 hover:-translate-y-1 transition-all p-2"><Github size={20} /></a>
               <a href="https://www.linkedin.com/in/pankaj-yadav-67b26a291/" target="_blank" rel="noreferrer" className="hover:text-teal-500 hover:-translate-y-1 transition-all p-2"><Linkedin size={20} /></a>
               <a href="mailto:pankajyadsv08@gmail.com" className="hover:text-teal-500 hover:-translate-y-1 transition-all p-2"><Mail size={20} /></a>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
             className="hidden md:block fixed bottom-0 right-12 w-10 z-20"
          >
             <div className="flex flex-col items-center gap-6 text-slate-600 dark:text-slate-400 after:content-[''] after:w-px after:h-24 after:bg-slate-400 dark:after:bg-slate-600 after:block after:mx-auto">
                <a 
                  href="mailto:pankajyadsv08@gmail.com" 
                  className="font-mono text-sm tracking-widest hover:text-teal-500 hover:-translate-y-1 transition-all p-2 py-6 writing-vertical-rl"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  pankajyadsv08@gmail.com
                </a>
             </div>
          </motion.div>
        </footer>

        {/* Terminal Easter Egg */}
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={() => setShowTerminal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-4xl h-[600px] bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Terminal Header */}
                <div className="bg-[#323233] px-4 py-3 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowTerminal(false)}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                      />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="ml-4 text-slate-400 text-sm font-mono">pankaj@portfolio:~</span>
                  </div>
                  <button
                    onClick={() => setShowTerminal(false)}
                    className="text-slate-400 hover:text-slate-100 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Terminal Body */}
                <div className="flex-1 overflow-auto p-4 font-mono text-sm">
                  <div className="space-y-1">
                    {terminalOutput.map((line, i) => (
                      <div key={i} dangerouslySetInnerHTML={{ __html: line }} className="text-slate-300" />
                    ))}
                  </div>

                  {/* Command Input */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-teal-400">$</span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyDown={handleTerminalCommand}
                      className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono"
                      placeholder="Type a command..."
                      autoFocus
                    />
                  </div>
                </div>

                {/* Terminal Footer */}
                <div className="bg-[#323233] px-4 py-2 text-xs text-slate-500 font-mono border-t border-slate-700">
                  Press <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300">ESC</kbd> or <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300">`</kbd> to close
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal Trigger Button */}
        {!showTerminal && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            onClick={() => setShowTerminal(true)}
            className="fixed bottom-6 left-6 z-50 px-3 py-2 bg-slate-800/80 backdrop-blur-sm text-slate-400 hover:text-teal-400 rounded-lg text-xs font-mono border border-slate-700 hover:border-teal-500 transition-all shadow-lg hover:shadow-teal-500/20 flex items-center gap-2"
            title="Open Terminal (Press `)"
          >
            <span className="text-teal-400">$</span> terminal
          </motion.button>
        )}
      </div>
    </div>
  );
}

