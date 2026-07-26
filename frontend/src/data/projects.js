import educationalWebsite from "../images/EduFlow.png";
import travelWebsite from "../images/Travel web.png";
import grocerySystem from "../images/grocery.png";
import expensesTracker from "../images/expense.png";
import portfolioWebsite from "../images/portfolio.png";
import eventManagement from "../images/event.png";
import weatherWebsite from "../images/weather site.png";

const projects = [
    {
        slug: "educational-website",
        title: "Educational Website",
        category: "Learning platform",
        description: "A comprehensive learning management system built to streamline course delivery and student tracking.",
        longDescription:
            "This learning platform brings course content, student progress, and day-to-day learning tools into one clear experience. The interface was designed to make navigation simple for students while giving educators an organized way to manage learning activities.",
        tech: ["React", "Node.js", "Express", "MySQL"],
        image: educationalWebsite,
        sourceUrl: "https://github.com/AshanAkalanka/Online-Course-Platform.git",
    },
    {
        slug: "travel-website",
        title: "Travel Website",
        category: "Travel & booking",
        description: "A modern booking platform for discovering tours, checking availability, and planning memorable trips.",
        longDescription:
            "A visual travel experience that helps visitors explore destinations and move smoothly from inspiration to planning. The project focuses on strong destination imagery, accessible content, and a responsive booking flow that works comfortably across devices.",
        tech: ["React", "Tailwind CSS", "MongoDB"],
        image: travelWebsite,
        sourceUrl: "https://github.com/AshanAkalanka/Travel-Web.git",
    },
    {
        slug: "ai-grocery-system",
        title: "AI Grocery System",
        category: "AI product",
        description: "An intelligent grocery management system with smart recommendations, planning tools, and automation.",
        longDescription:
            "This grocery management system uses intelligent features to make shopping and household planning easier. It combines practical inventory workflows with recommendations and automation, presented through an approachable interface for everyday use.",
        tech: ["Python", "React", "PostgreSQL"],
        image: grocerySystem,
        sourceUrl: "https://github.com/IT24101219/ai-grocery-project.git",
    },
    {
        slug: "expenses-tracker",
        title: "Expenses Tracker",
        category: "Finance tool",
        description: "A focused web application for managing income and expenses with clear visual breakdowns.",
        longDescription:
            "The expenses tracker turns everyday financial records into an easy-to-understand overview. Users can organize transactions, follow spending patterns, and quickly understand their balance through a clean dashboard and clear visual summaries.",
        tech: ["Java", "React", "Node.js", "MySQL"],
        image: expensesTracker,
        sourceUrl: "https://github.com/AshanAkalanka",
    },
    {
        slug: "personal-portfolio",
        title: "My Portfolio",
        category: "Personal website",
        description: "A personal portfolio designed and developed from scratch to showcase my work, skills, and growth.",
        longDescription:
            "This portfolio presents my projects, education, technical strengths, and contact details in one responsive experience. It was created as both a personal brand platform and an ongoing record of my development journey.",
        tech: ["React.js", "Tailwind CSS", "Node.js"],
        image: portfolioWebsite,
        sourceUrl: "https://github.com/AshanAkalanka/My-Portfolio-version-2.git",
    },
    {
        slug: "event-management-system",
        title: "Event Management System",
        category: "Event platform",
        description: "A web application that simplifies planning, organizing, and managing events from start to finish.",
        longDescription:
            "The event management system supports the core tasks involved in organizing an event through a structured, easy-to-follow experience. Its workflows are designed to reduce manual coordination and keep event information accessible in one place.",
        tech: ["Java Spring Boot", "HTML", "CSS", "JavaScript"],
        image: eventManagement,
        sourceUrl: "https://github.com/AshanAkalanka/Event-Management-System.git",
    },
    {
        slug: "live-weather-website",
        title: "Live Weather Website",
        category: "Weather utility",
        description: "A live weather experience that presents forecasts and current conditions through a simple interface.",
        longDescription:
            "This weather application retrieves live forecast data and turns it into a quick, readable experience. The design prioritizes the information people need most while keeping the interface lightweight and responsive.",
        tech: ["React", "Node.js", "OpenWeather API"],
        image: weatherWebsite,
        sourceUrl: "https://github.com/AshanAkalanka/Weather-App.git",
    },
];

export default projects;
