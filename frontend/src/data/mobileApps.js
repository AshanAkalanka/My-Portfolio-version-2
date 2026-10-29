import projects from "./projects";
import apartmentMobile from "../images/apartment_mobile.png";
import musicMobile from "../images/music_mobile.png";
import travelMobile from "../images/travel_mobile.png";
import coffeeMobile from "../images/coffee_mobile.png";

const mobileApps = [
    {
        slug: "apartment-management-system",
        image: apartmentMobile,
        description: "Manage apartment life from your phone, with everyday resident services together in one place.",
        features: ["Facilities and maintenance", "Visitor passes and bookings", "Payments and resident profile"],
    },
    {
        slug: "music-platform",
        image: musicMobile,
        description: "Discover new sounds, explore genres, and find playlists and recommendations made for everyday listening.",
        features: ["Genre and artist discovery", "New music releases", "Playlists and recommendations"],
    },
    {
        slug: "travel-website",
        image: travelMobile,
        description: "Explore destinations, discover nearby experiences, and browse places to stay through a mobile-friendly travel experience.",
        features: ["Destination and tour discovery", "Popular places and favorites", "Hotels and journey browsing"],
    },
    {
        slug: "coffee-shop",
        image: coffeeMobile,
        description: "Find your next coffee, explore the menu, and discover nearby branches with orders and your cart close at hand.",
        features: ["Drinks and food categories", "Nearby branch discovery", "Orders, cart, and profile"],
    },
].map(app => ({ ...projects.find(project => project.slug === app.slug), ...app }));

export default mobileApps;
