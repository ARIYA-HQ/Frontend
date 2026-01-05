export interface Vendor {
    id: number;
    image: string;
    name: string;
    location: string;
    guests: string;
    rating: number;
    reviews: number;
    price: string;
    isBooked: boolean;
    isShortlisted: boolean;
    category: string;
}

const baseImages = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2698&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470229722913-7ea0511b92e3?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop"
];

const generateVendors = (count: number, category: string, baseId: number) => {
    return Array.from({ length: count }).map((_, index) => ({
        id: baseId + index,
        image: baseImages[index % baseImages.length],
        name: `${category} Professional ${index + 1}`,
        location: ["Victoria Island, Lagos", "Ikoyi, Lagos", "Lekki Phase 1, Lagos", "Ikeja, Lagos"][index % 4],
        guests: ["0 - 500", "50 - 200", "100 - 1000", "500+"][index % 4],
        rating: 4.5 + (Math.random() * 0.5),
        reviews: Math.floor(Math.random() * 200) + 20,
        price: `₦${(Math.floor(Math.random() * 20) + 5) * 100},000.0`,
        isBooked: Math.random() > 0.8,
        isShortlisted: Math.random() > 0.8,
        category: category
    }));
};

export const MOCK_VENDORS: Vendor[] = [
    // Helpfully explicit manual top vendors
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2698&auto=format&fit=crop",
        name: "Sunset Strings Quartet",
        location: "Victoria Island, Lagos",
        guests: "0 - 500",
        rating: 4.9,
        reviews: 40,
        price: "₦700,000.0",
        isBooked: true,
        isShortlisted: true,
        category: "MusicalNoteIcon" // MC and DJ
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=2670&auto=format&fit=crop",
        name: "Lagos Live Jazz",
        location: "Ikoyi, Lagos",
        guests: "50 - 200",
        rating: 4.8,
        reviews: 25,
        price: "₦450,000.0",
        isBooked: false,
        isShortlisted: true,
        category: "MusicalNoteIcon" // MC and DJ
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2670&auto=format&fit=crop",
        name: "Classic Catering Co.",
        location: "Lekki Phase 1, Lagos",
        guests: "100 - 1000",
        rating: 4.7,
        reviews: 112,
        price: "₦2,500,000.0",
        isBooked: true,
        isShortlisted: false,
        category: "CakeIcon" // Catering
    },

    // Generated vendors for categories
    ...generateVendors(9, "Photography", 100),
    ...generateVendors(9, "Videography", 200),
    ...generateVendors(9, "Catering", 300),
    ...generateVendors(9, "MC and DJ", 400),
    ...generateVendors(9, "Makeup Artist", 500),
    ...generateVendors(9, "Decor & Design", 600),
    ...generateVendors(9, "Cake & Desserts", 700),
    ...generateVendors(9, "Transportation", 800),
    ...generateVendors(9, "Venue", 900),
];
