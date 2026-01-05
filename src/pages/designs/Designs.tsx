import React, { useState, useRef } from 'react';
import {
    PlusIcon,
    ArrowLeftIcon,
    SparklesIcon,
    LanguageIcon,
    Square2StackIcon,
    CloudArrowUpIcon,
    DevicePhoneMobileIcon,
    ArrowsPointingOutIcon,
    MagnifyingGlassIcon,
    PaintBrushIcon,
    RocketLaunchIcon,
    ViewColumnsIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';
import { CardGrid } from '../../components/ui/CardGrid';
import { Button } from '../../components/ui/Button';
import { Typography } from '../../components/ui/Typography';
import { useUI } from '../../contexts/UIContext';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';

type DesignTone = 'Classical' | 'Floral' | 'Modern' | 'Minimal' | 'Luxe';

type ElementType = 'text' | 'image' | 'shape';

interface DesignElement {
    id: string;
    type: ElementType;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    content?: string; // For text or image URL
    style: {
        backgroundColor?: string;
        color?: string;
        fontSize?: string;
        fontFamily?: string;
        fontWeight?: string;
        borderRadius?: string;
        opacity?: number;
        borderWidth?: number;
        borderColor?: string;
        shadow?: string;
    };
}

interface DesignPage {
    id: string;
    label: string;
    elements: DesignElement[];
    backgroundColor: string;
}

interface CanvasState {
    width: number;
    height: number;
    scale: number;
    pages: DesignPage[];
    currentPageId: string;
    selectedElementId: string | null;
    tone: DesignTone;
    textColor: string;
    fontFamily: string;
}

interface Design {
    id: string;
    title: string;
    category: string;
    tone: DesignTone;
    lastEdited: string;
    image: string;
    isFavourite: boolean;
}

interface Category {
    title: string;
    description: string;
    image: string;
    tone: DesignTone;
}

const TEMPLATES = [
    // Matching Suites
    {
        id: 'suite-1', name: 'Classic Elegance', category: 'Matching Suites',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#F9F6F0',
                elements: [
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 80, width: 350, height: 40, rotation: 0, content: 'PLEASE SAVE THE DATE', style: { fontSize: '14px', fontFamily: 'font-sans', fontWeight: '400', color: '#667085', textAlign: 'center', letterSpacing: '4px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 130, width: 350, height: 80, rotation: 0, content: 'Sarah & James', style: { fontSize: '56px', fontFamily: 'font-serif', fontWeight: '700', color: '#1D2939', textAlign: 'center' } as any },
                    { id: 's1', type: 'shape' as ElementType, x: 125, y: 220, width: 200, height: 1, rotation: 0, style: { backgroundColor: '#D0D5DD' } as any },
                    { id: 't3', type: 'text' as ElementType, x: 50, y: 240, width: 350, height: 40, rotation: 0, content: 'AUGUST 24th, 2024', style: { fontSize: '18px', fontFamily: 'font-serif', fontWeight: '900', color: '#1D2939', textAlign: 'center' } as any },
                    { id: 't4', type: 'text' as ElementType, x: 50, y: 280, width: 350, height: 40, rotation: 0, content: 'New York City', style: { fontSize: '16px', fontFamily: 'font-sans', fontWeight: '400', color: '#667085', textAlign: 'center' } as any },
                    { id: 't5', type: 'text' as ElementType, x: 50, y: 550, width: 350, height: 40, rotation: 0, content: 'FORMAL INVITATION TO FOLLOW', style: { fontSize: '12px', fontFamily: 'font-sans', fontWeight: '700', color: '#98A2B3', textAlign: 'center', letterSpacing: '2px' } as any }
                ]
            },
            {
                id: 'p2', label: 'Back', backgroundColor: '#F9F6F0',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 50, y: 50, width: 350, height: 540, rotation: 0, style: { border: '1px solid #D0D5DD', backgroundColor: 'transparent' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 75, y: 250, width: 300, height: 100, rotation: 0, content: 'We can\'t wait to celebrate with you!', style: { fontSize: '24px', fontFamily: 'font-serif', fontWeight: '400', color: '#475467', textAlign: 'center', fontStyle: 'italic' } as any }
                ]
            }
        ]
    },
    {
        id: 'suite-2', name: 'Blush Floral', category: 'Matching Suites',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#FFF8F8',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 0, y: 0, width: 450, height: 150, rotation: 0, style: { backgroundColor: '#FEE4E2', opacity: 0.3 } as any },
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 180, width: 350, height: 60, rotation: 0, content: 'Together with their families', style: { fontSize: '14px', fontFamily: 'font-serif', fontWeight: '400', color: '#634A4A', textAlign: 'center' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 240, width: 350, height: 100, rotation: 0, content: 'EMILIA\n&\nJULIAN', style: { fontSize: '48px', fontFamily: 'font-serif', fontWeight: '900', color: '#634A4A', textAlign: 'center', lineHeight: '1' } as any },
                    { id: 't3', type: 'text' as ElementType, x: 50, y: 360, width: 350, height: 40, rotation: 0, content: 'request the honor of your presence', style: { fontSize: '16px', fontFamily: 'font-serif', fontWeight: '400', color: '#9E77ED', textAlign: 'center', fontStyle: 'italic' } as any },
                    { id: 's2', type: 'shape' as ElementType, x: 200, y: 420, width: 50, height: 2, rotation: 0, style: { backgroundColor: '#634A4A' } as any }
                ]
            }
        ]
    },
    {
        id: 'suite-3', name: 'Garden Party', category: 'Matching Suites',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#F1F3EE',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 20, y: 20, width: 410, height: 600, rotation: 0, style: { border: '2px solid #3E4B39', backgroundColor: 'transparent' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 80, width: 350, height: 40, rotation: 0, content: 'YOU ARE INVITED TO A', style: { fontSize: '14px', fontFamily: 'font-sans', fontWeight: '700', color: '#3E4B39', textAlign: 'center', letterSpacing: '3px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 130, width: 350, height: 100, rotation: 0, content: 'Garden\nSoirée', style: { fontSize: '64px', fontFamily: 'font-serif', fontWeight: '900', color: '#3E4B39', textAlign: 'center', lineHeight: '0.9' } as any },
                    { id: 't3', type: 'text' as ElementType, x: 50, y: 250, width: 350, height: 40, rotation: 0, content: 'HONORING THE NEWLYWEDS', style: { fontSize: '12px', fontFamily: 'font-sans', fontWeight: '400', color: '#667085', textAlign: 'center' } as any },
                    { id: 't4', type: 'text' as ElementType, x: 50, y: 500, width: 350, height: 30, rotation: 0, content: 'Saturday | June 15', style: { fontSize: '18px', fontFamily: 'font-serif', fontWeight: '700', color: '#3E4B39', textAlign: 'center' } as any }
                ]
            }
        ]
    },
    {
        id: 'suite-4', name: 'Midnight Luxe', category: 'Matching Suites',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#101828',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 0, y: 0, width: 450, height: 10, rotation: 0, style: { backgroundColor: '#F9FBF9' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 150, width: 350, height: 120, rotation: 0, content: 'CELEBRATE\nWITH US', style: { fontSize: '56px', fontFamily: 'font-sans', fontWeight: '900', color: '#F9FBF9', textAlign: 'center', lineHeight: '0.8', letterSpacing: '-2px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 300, width: 350, height: 40, rotation: 0, content: 'An evening of dinner and dancing', style: { fontSize: '16px', fontFamily: 'font-sans', fontWeight: '400', color: '#98A2B3', textAlign: 'center' } as any },
                    { id: 's2', type: 'shape' as ElementType, x: 175, y: 360, width: 100, height: 1, rotation: 0, style: { backgroundColor: '#F9FBF9' } as any }
                ]
            }
        ]
    },
    {
        id: 'suite-5', name: 'Royal Gold', category: 'Matching Suites',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#FDFCF0',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 50, y: 100, width: 350, height: 1, rotation: 0, style: { backgroundColor: '#B4905F' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 130, width: 350, height: 40, rotation: 0, content: 'SAVE THE DATE', style: { fontSize: '14px', fontFamily: 'font-sans', fontWeight: '700', color: '#B4905F', textAlign: 'center', letterSpacing: '5px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 180, width: 350, height: 80, rotation: 0, content: 'Thomas & Claire', style: { fontSize: '48px', fontFamily: 'font-serif', fontWeight: '400', color: '#1B1B1B', textAlign: 'center' } as any },
                    { id: 't3', type: 'text' as ElementType, x: 50, y: 500, width: 350, height: 40, rotation: 0, content: 'LONDON | WINTER 2024', style: { fontSize: '16px', fontFamily: 'font-sans', fontWeight: '400', color: '#B4905F', textAlign: 'center' } as any },
                    { id: 's2', type: 'shape' as ElementType, x: 50, y: 550, width: 350, height: 1, rotation: 0, style: { backgroundColor: '#B4905F' } as any }
                ]
            }
        ]
    },

    // Invitations
    {
        id: 'inv-1', name: 'Modern Minimal', category: 'Invitation',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#1D2939',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 40, y: 40, width: 2, height: 560, rotation: 0, style: { backgroundColor: '#F9FBF9' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 60, y: 150, width: 350, height: 100, rotation: 0, content: 'LOVEYOU\nFOREVER', style: { fontSize: '64px', fontFamily: 'font-sans', fontWeight: '900', color: '#FFFFFF', textAlign: 'left', lineHeight: '0.8', letterSpacing: '-4px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 60, y: 260, width: 300, height: 40, rotation: 0, content: 'The Wedding of Sarah & John', style: { fontSize: '18px', fontFamily: 'font-sans', fontWeight: '400', color: '#98A2B3', textAlign: 'left' } as any },
                    { id: 't3', type: 'text' as ElementType, x: 60, y: 310, width: 300, height: 40, rotation: 0, content: '10.24.2024', style: { fontSize: '24px', fontFamily: 'font-sans', fontWeight: '700', color: '#FFFFFF', textAlign: 'left' } as any }
                ]
            }
        ]
    },
    {
        id: 'inv-2', name: 'Script Beauty', category: 'Invitation',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#FFFFFF',
                elements: [
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 120, width: 350, height: 40, rotation: 0, content: 'together with their parents', style: { fontSize: '12px', fontFamily: 'font-serif', fontWeight: '400', color: '#475467', textAlign: 'center', fontStyle: 'italic' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 180, width: 350, height: 80, rotation: 0, content: 'Katherine & William', style: { fontSize: '42px', fontFamily: 'font-serif', fontWeight: '400', color: '#101828', textAlign: 'center' } as any },
                    { id: 't3', type: 'text' as ElementType, x: 50, y: 270, width: 350, height: 40, rotation: 0, content: 'invite you to celebrate their wedding', style: { fontSize: '14px', fontFamily: 'font-serif', fontWeight: '400', color: '#475467', textAlign: 'center' } as any },
                    { id: 's1', type: 'shape' as ElementType, x: 150, y: 330, width: 150, height: 1, rotation: 0, style: { backgroundColor: '#EAECF0' } as any }
                ]
            }
        ]
    },
    {
        id: 'inv-3', name: 'Abstract Noir', category: 'Invitation',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#000000',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 100, y: 100, width: 250, height: 440, rotation: 15, style: { border: '1px solid #344054', backgroundColor: 'transparent' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 250, width: 350, height: 60, rotation: 0, content: 'YOU\'RE INVITED', style: { fontSize: '48px', fontFamily: 'font-sans', fontWeight: '900', color: '#FFFFFF', textAlign: 'center', letterSpacing: '-2px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 320, width: 350, height: 40, rotation: 0, content: 'A Night of Celebration', style: { fontSize: '16px', fontFamily: 'font-sans', fontWeight: '100', color: '#D0D5DD', textAlign: 'center' } as any }
                ]
            }
        ]
    },
    {
        id: 'inv-4', name: 'Vintage Border', category: 'Invitation',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#FCF9F2',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 30, y: 30, width: 390, height: 580, rotation: 0, style: { border: '4px double #433422', backgroundColor: 'transparent' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 100, width: 350, height: 40, rotation: 0, content: 'KINDLY RESPOND', style: { fontSize: '24px', fontFamily: 'font-serif', fontWeight: '900', color: '#433422', textAlign: 'center', letterSpacing: '2px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 160, width: 350, height: 60, rotation: 0, content: 'By the 1st of July', style: { fontSize: '14px', fontFamily: 'font-serif', fontWeight: '400', color: '#433422', textAlign: 'center', fontStyle: 'italic' } as any },
                    { id: 's2', type: 'shape' as ElementType, x: 100, y: 240, width: 250, height: 1, rotation: 0, style: { backgroundColor: '#433422' } as any }
                ]
            }
        ]
    },
    {
        id: 'inv-5', name: 'Soft Gradient', category: 'Invitation',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#FDF2F2',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: -50, y: -50, width: 200, height: 200, rotation: 45, style: { backgroundColor: '#FEE4E2', borderRadius: '50%', filter: 'blur(40px)' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 220, width: 350, height: 80, rotation: 0, content: 'CELEBRATE', style: { fontSize: '64px', fontFamily: 'font-sans', fontWeight: '900', color: '#634A4A', textAlign: 'center', opacity: 0.8 } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 300, width: 350, height: 40, rotation: 0, content: 'With the ones you love', style: { fontSize: '18px', fontFamily: 'font-sans', fontWeight: '400', color: '#634A4A', textAlign: 'center' } as any }
                ]
            }
        ]
    },

    // Menus
    {
        id: 'menu-1', name: 'Golden Menu', category: 'Menus',
        pages: [
            {
                id: 'p1', label: 'Card', backgroundColor: '#F0F0F0',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 200, y: 50, width: 50, height: 2, rotation: 0, style: { backgroundColor: '#C4A484' } as any },
                    { id: 't1', type: 'text' as ElementType, x: 100, y: 70, width: 250, height: 40, rotation: 0, content: 'THE WEDDING MENU', style: { fontSize: '14px', fontFamily: 'font-serif', fontWeight: '900', color: '#C4A484', textAlign: 'center', letterSpacing: '2px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 150, width: 350, height: 30, rotation: 0, content: 'FIRST COURSE', style: { fontSize: '12px', fontFamily: 'font-sans', fontWeight: '700', color: '#101828', textAlign: 'center' } as any },
                    { id: 't3', type: 'text' as ElementType, x: 50, y: 180, width: 350, height: 60, rotation: 0, content: 'Roasted Butternut Squash Soup\nwith toasted pumpkin seeds', style: { fontSize: '16px', fontFamily: 'font-serif', fontWeight: '400', color: '#475467', textAlign: 'center' } as any },
                    { id: 't4', type: 'text' as ElementType, x: 50, y: 280, width: 350, height: 30, rotation: 0, content: 'MAIN COURSE', style: { fontSize: '12px', fontFamily: 'font-sans', fontWeight: '700', color: '#101828', textAlign: 'center' } as any },
                    { id: 't5', type: 'text' as ElementType, x: 50, y: 310, width: 350, height: 60, rotation: 0, content: 'Herb Crusted Sea Bass\nseasonal greens & lemon butter', style: { fontSize: '16px', fontFamily: 'font-serif', fontWeight: '400', color: '#475467', textAlign: 'center' } as any }
                ]
            }
        ]
    },
    {
        id: 'menu-2', name: 'Classic French', category: 'Menus',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#FFFFFF',
                elements: [
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 60, width: 350, height: 60, rotation: 0, content: 'Bon Appétit', style: { fontSize: '32px', fontFamily: 'font-serif', fontWeight: '400', color: '#1D2939', textAlign: 'center', fontStyle: 'italic' } as any },
                    { id: 's1', type: 'shape' as ElementType, x: 50, y: 130, width: 350, height: 1, rotation: 0, style: { backgroundColor: '#1D2939' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 200, width: 350, height: 400, rotation: 0, content: 'Entrée\nFoie Gras de Canard\n\nPlat\nFilet de Bœuf au Poivre\n\nDessert\nTarte Tatin à la Mode', style: { fontSize: '20px', fontFamily: 'font-serif', fontWeight: '400', color: '#1D2939', textAlign: 'center', lineHeight: '2' } as any }
                ]
            }
        ]
    },
    {
        id: 'menu-3', name: 'Modern Bistro', category: 'Menus',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#1D2939',
                elements: [
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 80, width: 350, height: 60, rotation: 0, content: 'THE BISTRO', style: { fontSize: '40px', fontFamily: 'font-sans', fontWeight: '900', color: '#FFFFFF', textAlign: 'center', letterSpacing: '-2px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 140, width: 350, height: 30, rotation: 0, content: 'EVENING DINING', style: { fontSize: '12px', fontFamily: 'font-sans', fontWeight: '400', color: '#98A2B3', textAlign: 'center', letterSpacing: '4px' } as any },
                    { id: 's1', type: 'shape' as ElementType, x: 50, y: 200, width: 350, height: 350, rotation: 0, style: { border: '1px solid #344054', backgroundColor: 'transparent' } as any }
                ]
            }
        ]
    },
    {
        id: 'menu-4', name: 'Minimal Script', category: 'Menus',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#FFFFFF',
                elements: [
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 150, width: 350, height: 60, rotation: 0, content: 'Dinner', style: { fontSize: '48px', fontFamily: 'font-serif', fontWeight: '400', color: '#101828', textAlign: 'center' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 250, width: 350, height: 200, rotation: 0, content: 'Wild Mushroom Risotto\nGrilled Salmon Fillet\nDark Chocolate Torte', style: { fontSize: '18px', fontFamily: 'font-sans', fontWeight: '100', color: '#475467', textAlign: 'center', lineHeight: '2.5' } as any }
                ]
            }
        ]
    },
    {
        id: 'menu-5', name: 'Botanical Menu', category: 'Menus',
        pages: [
            {
                id: 'p1', label: 'Front', backgroundColor: '#F1F3EE',
                elements: [
                    { id: 's1', type: 'shape' as ElementType, x: 0, y: 0, width: 450, height: 80, rotation: 0, style: { backgroundColor: '#3E4B39', opacity: 0.1 } as any },
                    { id: 't1', type: 'text' as ElementType, x: 50, y: 120, width: 350, height: 40, rotation: 0, content: 'FEAST IN THE GARDEN', style: { fontSize: '14px', fontFamily: 'font-sans', fontWeight: '700', color: '#3E4B39', textAlign: 'center', letterSpacing: '3px' } as any },
                    { id: 't2', type: 'text' as ElementType, x: 50, y: 220, width: 350, height: 300, rotation: 0, content: 'Fresh Burrata & Heirloom Tomatoes\n---\nRoast Chicken with Garlic & Thyme\n---\nHoney Glazed Carrots and Greens', style: { fontSize: '18px', fontFamily: 'font-serif', fontWeight: '400', color: '#1B1B1B', textAlign: 'center', lineHeight: '2' } as any }
                ]
            }
        ]
    }
];

const Designs = () => {
    const [activeTab, setActiveTab] = useState('Designs Types');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [studioTab, setStudioTab] = useState<'templates' | 'elements' | 'text' | 'uploads' | 'styles'>('templates');

    // Use the global UI context for notifications
    const { addNotification } = useUI();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                addNotification({ message: `${file.name} uploaded to assets!`, type: 'success' });
            }, 2000);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    // Canvas State
    const [canvasState, setCanvasState] = useState<CanvasState>({
        width: 450,
        height: 640,
        scale: 1,
        pages: [
            {
                id: 'page1',
                label: 'Front',
                backgroundColor: '#FFFFFF',
                elements: [
                    {
                        id: '1',
                        type: 'text',
                        x: 115,
                        y: 100,
                        width: 220,
                        height: 60,
                        rotation: 0,
                        content: 'Celebrate',
                        style: {
                            fontSize: '48px',
                            fontFamily: 'font-serif',
                            fontWeight: '900',
                            color: '#1D2939',
                            numberOfLines: 1,
                            textAlign: 'center'
                        } as any
                    }
                ]
            }
        ],
        currentPageId: 'page1',
        selectedElementId: null,
        tone: 'Classical',
        textColor: '#1D2939',
        fontFamily: 'font-serif'
    });

    const [myDesigns, setMyDesigns] = useState<Design[]>([
        { id: '1', title: 'Modern Minimalist Invite', category: 'Invitation Card', tone: 'Minimal', lastEdited: '2 days ago', image: 'https://images.unsplash.com/photo-1621245033771-479633346d0a?q=80&w=600&auto=format&fit=crop', isFavourite: true },
        { id: '2', title: 'Floral Wedding Suite', category: 'Matching Suites', tone: 'Floral', lastEdited: '5 hours ago', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2ce?q=80&w=600&auto=format&fit=crop', isFavourite: false },
        { id: '3', title: 'Grand Gala Program', category: 'Programs', tone: 'Classical', lastEdited: '1 week ago', image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=600&auto=format&fit=crop', isFavourite: false },
    ]);

    const handleDragStart = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setCanvasState(prev => ({ ...prev, selectedElementId: id }));

        const startX = e.clientX;
        const startY = e.clientY;
        const currentPage = canvasState.pages.find(p => p.id === canvasState.currentPageId);
        const element = currentPage?.elements.find(el => el.id === id);
        if (!element) return;

        const startElX = element.x;
        const startElY = element.y;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const dx = (moveEvent.clientX - startX) / canvasState.scale;
            const dy = (moveEvent.clientY - startY) / canvasState.scale;

            setCanvasState(prev => ({
                ...prev,
                pages: prev.pages.map(p => {
                    if (p.id !== prev.currentPageId) return p;
                    return {
                        ...p,
                        elements: p.elements.map(el => {
                            if (el.id !== id) return el;
                            return { ...el, x: startElX + dx, y: startElY + dy };
                        })
                    };
                })
            }));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const bringToFront = (id: string) => {
        setCanvasState(prev => ({
            ...prev,
            pages: prev.pages.map(p => {
                if (p.id !== prev.currentPageId) return p;
                const elements = [...p.elements];
                const idx = elements.findIndex(el => el.id === id);
                if (idx === -1) return p;
                const el = elements.splice(idx, 1)[0];
                elements.push(el);
                return { ...p, elements };
            })
        }));
    };

    const sendToBack = (id: string) => {
        setCanvasState(prev => ({
            ...prev,
            pages: prev.pages.map(p => {
                if (p.id !== prev.currentPageId) return p;
                const elements = [...p.elements];
                const idx = elements.findIndex(el => el.id === id);
                if (idx === -1) return p;
                const el = elements.splice(idx, 1)[0];
                elements.unshift(el);
                return { ...p, elements };
            })
        }));
    };

    const addPage = () => {
        const newPage: DesignPage = {
            id: Math.random().toString(36).substr(2, 9),
            label: `Page ${canvasState.pages.length + 1}`,
            elements: [],
            backgroundColor: canvasState.pages[0]?.backgroundColor || '#FFFFFF'
        };
        setCanvasState(prev => ({
            ...prev,
            pages: [...prev.pages, newPage],
            currentPageId: newPage.id
        }));
    };

    const removePage = (id: string) => {
        if (canvasState.pages.length <= 1) return;
        setCanvasState(prev => {
            const newPages = prev.pages.filter(p => p.id !== id);
            return {
                ...prev,
                pages: newPages,
                currentPageId: prev.currentPageId === id ? newPages[0].id : prev.currentPageId
            };
        });
    };

    const renamePage = (id: string, newLabel: string) => {
        setCanvasState(prev => ({
            ...prev,
            pages: prev.pages.map(p => p.id === id ? { ...p, label: newLabel } : p)
        }));
    };

    const designCategories: Category[] = [
        { title: 'Matching Suites', tone: 'Classical', description: 'Cohesive branding across your entire event stationery.', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2ce?q=80&w=600&auto=format&fit=crop' },
        { title: 'Invitation Card', tone: 'Floral', description: 'Elegant and soft touches for the perfect first impression.', image: 'https://images.unsplash.com/photo-1607134821990-d4d17329f60c?q=80&w=600&auto=format&fit=crop' },
        { title: 'Save The Date', tone: 'Modern', description: 'Bold and clear announcements for your special day.', image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=600&auto=format&fit=crop' },
        { title: 'Enclosures', tone: 'Minimal', description: 'Simple, direct details for maps and floor plans.', image: 'https://images.unsplash.com/photo-1549489786-88a2162ca831?q=80&w=600&auto=format&fit=crop' },
        { title: 'Paper add-ons', tone: 'Luxe', description: 'Velvet, foil, and specialty textures for premium flair.', image: 'https://images.unsplash.com/photo-1621245033771-479633346d0a?q=80&w=600&auto=format&fit=crop' },
        { title: 'Place Card', tone: 'Classical', description: 'Timeless seating arrangements with calligraphy style.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop' },
        { title: 'Table Number', tone: 'Modern', description: 'Numeric clarity with high-contrast contemporary design.', image: 'https://images.unsplash.com/photo-1522673607200-164883214cdd?q=80&w=600&auto=format&fit=crop' },
        { title: 'Menus', tone: 'Floral', description: 'Delicate layouts that complement your culinary themes.', image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=600&auto=format&fit=crop' },
        { title: 'Programs', tone: 'Classical', description: 'Detailed schedules with sophisticated vertical layouts.', image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=600&auto=format&fit=crop' },
        { title: 'Napkins', tone: 'Minimal', description: 'Small personal touches with subtle brand placement.', image: 'https://images.unsplash.com/photo-1515182332923-3444003d6d0d?q=80&w=600&auto=format&fit=crop' },
        { title: 'Signs', tone: 'Modern', description: 'Wayfinding and welcome boards with impactful type.', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop' },
        { title: 'Stickers', tone: 'Luxe', description: 'Custom foil-pressed seals for the finishing touch.', image: 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=600&auto=format&fit=crop' },
        { title: 'Thank You Cards', tone: 'Floral', description: 'Sincere gratitude wrapped in delicate botanicals.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop' },
        { title: 'Shower Invite', tone: 'Minimal', description: 'Sweet and simple invites for showers and tea parties.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop' },
        { title: 'Digital Save The Date', tone: 'Modern', description: 'Zero waste, maximum impact digital animations.', image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=600&auto=format&fit=crop' },
    ];

    const addElement = (type: ElementType, content?: string, style?: any) => {
        const newElement: DesignElement = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            x: canvasState.width / 2 - 50,
            y: canvasState.height / 2 - 25,
            width: type === 'text' ? 200 : 100,
            height: type === 'text' ? 50 : 100,
            rotation: 0,
            content,
            style: style || {
                backgroundColor: type === 'shape' ? '#D0771E' : undefined,
                color: type === 'text' ? canvasState.textColor : undefined,
                fontSize: type === 'text' ? '24px' : undefined,
                fontFamily: type === 'text' ? canvasState.fontFamily : undefined,
            }
        };

        setCanvasState(prev => ({
            ...prev,
            pages: prev.pages.map(p => {
                if (p.id !== prev.currentPageId) return p;
                return { ...p, elements: [...p.elements, newElement] };
            }),
            selectedElementId: newElement.id
        }));
    };

    const updateSelectedElement = (updates: Partial<DesignElement> | Partial<DesignElement['style']>) => {
        if (!canvasState.selectedElementId) return;

        setCanvasState(prev => ({
            ...prev,
            pages: prev.pages.map(p => {
                if (p.id !== prev.currentPageId) return p;
                return {
                    ...p,
                    elements: p.elements.map(el => {
                        if (el.id !== prev.selectedElementId) return el;

                        // Check if we are updating style or root properties
                        const isStyleUpdate = Object.keys(updates).some(key => ['backgroundColor', 'color', 'fontSize', 'fontFamily', 'fontWeight', 'borderRadius', 'opacity', 'textAlign'].includes(key));

                        if (isStyleUpdate) {
                            return { ...el, style: { ...el.style, ...updates } };
                        }
                        return { ...el, ...updates };
                    })
                };
            })
        }));
    };

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setActiveTab('Design Studio');

        // Apply Tone Defaults
        const defaults = {
            Classical: { backgroundColor: '#F9F6F0', textColor: '#1D2939', fontFamily: 'font-serif' },
            Floral: { backgroundColor: '#FFF8F8', textColor: '#634A4A', fontFamily: 'font-serif' },
            Modern: { backgroundColor: '#1D2939', textColor: '#FFFFFF', fontFamily: 'font-sans' },
            Minimal: { backgroundColor: '#FFFFFF', textColor: '#1D2939', fontFamily: 'font-sans' },
            Luxe: { backgroundColor: '#F0F0F0', textColor: '#C4A484', fontFamily: 'font-serif' }
        };

        const config = defaults[category.tone] || defaults.Modern;
        setCanvasState(prev => ({
            ...prev,
            ...config,
            tone: category.tone,
            pages: [
                {
                    id: 'page1',
                    label: 'Front',
                    backgroundColor: config.backgroundColor,
                    elements: []
                }
            ],
            currentPageId: 'page1'
        }));
    };

    const handleSaveDesign = () => {
        setIsSaving(true);
        setTimeout(() => {
            const newDesign: Design = {
                id: Math.random().toString(),
                title: `My ${selectedCategory?.title || 'Design'}`,
                category: selectedCategory?.title || 'Custom',
                tone: canvasState.tone,
                lastEdited: 'Just now',
                image: selectedCategory?.image || 'https://images.unsplash.com/photo-1621245033771-479633346d0a?q=80&w=600&auto=format&fit=crop',
                isFavourite: false
            };
            setMyDesigns([newDesign, ...myDesigns]);
            setIsSaving(false);
            setActiveTab('Created Designs');
            addNotification({ message: 'Design saved successfully to your gallery!', type: 'success' });
        }, 1500);
    };

    const toggleFavourite = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setMyDesigns(myDesigns.map(d => d.id === id ? { ...d, isFavourite: !d.isFavourite } : d));
    };

    return (
        <div className="min-h-screen bg-[#F4F6F8] dark:bg-gray-900 flex flex-col relative leading-relaxed">

            <div className={`flex-1 flex flex-col ${activeTab === 'Design Studio' ? '' : 'max-w-[1600px] mx-auto w-full pb-16'}`}>

                {activeTab !== 'Design Studio' && (
                    <>
                        <div className="mb-8">
                            <PageHeader
                                title="Design Gallery"
                                subtitle="Create and manage your event stationery"
                                breadcrumb="Designs"
                                actions={
                                    <Button
                                        onClick={triggerUpload}
                                        isLoading={isUploading}
                                        className="bg-[#1D2939] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2"
                                    >
                                        <PlusIcon className="w-4 h-4" /> New Asset
                                    </Button>
                                }
                            />
                        </div>

                        <div className="mb-10">
                            <PremiumTabs
                                tabs={[
                                    { id: 'Designs Types', label: 'Templates' },
                                    { id: 'Design Studio', label: 'Studio' },
                                    { id: 'Created Designs', label: 'My Designs' },
                                    { id: 'Favourites', label: 'Saved' },
                                    { id: 'Send Invitations', label: 'Distribution' }
                                ]}
                                activeTab={activeTab}
                                onChange={setActiveTab}
                                className="mb-0"
                            />
                        </div>
                    </>
                )}

                {/* --- DESIGNS TYPES TAB --- */}
                {activeTab === 'Designs Types' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {/* Upload Card */}
                        <PremiumCard
                            onClick={triggerUpload}
                            className={`bg-gray-50 dark:bg-gray-800 border-dashed border-2 border-gray-200 dark:border-gray-700 hover:border-[#D0771E] dark:hover:border-[#D0771E] flex flex-col items-center justify-center cursor-pointer min-h-[300px] shadow-none dark:shadow-none group ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-none flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {isUploading ? (
                                    <div className="w-6 h-6 border-2 border-[#D0771E] border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <PlusIcon className="w-6 h-6 text-[#D0771E]" />
                                )}
                            </div>
                            <h3 className="font-black text-xs text-[#1D2939] uppercase tracking-widest mb-1">{isUploading ? 'Uploading...' : 'Create Blank'}</h3>
                            <p className="text-[10px] font-bold text-gray-400">{isUploading ? 'Adding to your library' : 'Start from scratch'}</p>
                        </PremiumCard>

                        {/* Design Category Cards */}
                        {designCategories.map((category, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleCategorySelect(category)}
                                className="group relative rounded-[32px] overflow-hidden cursor-pointer bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 shadow-lg shadow-gray-100 dark:shadow-none hover:shadow-2xl hover:shadow-[#D0771E]/10 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-1 block"
                            >
                                <div className="aspect-[3/4] relative overflow-hidden bg-[#F9FAFB] dark:bg-gray-900">
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                    <img
                                        src={category.image}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={category.title}
                                        loading="lazy"
                                        onLoad={(e) => (e.target as HTMLImageElement).parentElement?.querySelector('.animate-pulse')?.remove()}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-24 opacity-100 transition-opacity">
                                        <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                                            <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[9px] font-black text-white uppercase tracking-widest mb-2 border border-white/30">
                                                {category.tone}
                                            </span>
                                            <h3 className="font-black text-white text-lg uppercase tracking-tight mb-1">
                                                {category.title}
                                            </h3>
                                            <p className="text-[11px] font-medium text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- DESIGN STUDIO TAB --- */}
                {activeTab === 'Design Studio' && (
                    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900">
                        {/* Studio Header */}
                        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center px-6 shadow-sm dark:shadow-none z-30 shrink-0">
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => setActiveTab('Designs Types')}
                                    className="p-2 -ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 group flex items-center gap-2"
                                >
                                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">Back</span>
                                </button>
                                <div className="h-6 w-px bg-gray-100"></div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-wide">{selectedCategory?.title || 'Untitled Design'}</h2>
                                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-orange-50 text-[#D0771E] uppercase tracking-widest">{canvasState.tone}</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-gray-300 dark:text-gray-500 uppercase tracking-wider mt-0.5">Last saved just now</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex bg-gray-50 dark:bg-gray-800 rounded-xl p-1 gap-1 border border-gray-100 dark:border-gray-700">
                                    <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm dark:shadow-none"><DevicePhoneMobileIcon className="w-4 h-4" /></button>
                                    <button className="p-2 bg-white dark:bg-gray-900 rounded-lg text-[#1D2939] dark:text-white shadow-sm dark:shadow-none"><ArrowsPointingOutIcon className="w-4 h-4" /></button>
                                </div>
                                <div className="h-6 w-px bg-gray-100"></div>
                                <Button onClick={handleSaveDesign} isDisabled={isSaving} variant="primary" size="sm" className="rounded-xl text-[10px] font-black uppercase tracking-widest px-6 bg-[#1D2939] hover:bg-black text-white shadow-xl shadow-gray-200/50 h-10">
                                    {isSaving ? 'Saving...' : 'Export Asset'}
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 flex overflow-hidden">
                            {/* 1. LEFT SIDEBAR - Navigation Rail + Content Drawer */}
                            <div className="flex w-[420px] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-20 flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none">
                                {/* Icon Rail */}
                                <div className="w-[88px] flex flex-col items-center py-8 gap-4 border-r border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900">
                                    {[
                                        { id: 'templates', icon: ViewColumnsIcon, label: 'Layout' },
                                        { id: 'elements', icon: Square2StackIcon, label: 'Assets' },
                                        { id: 'text', icon: LanguageIcon, label: 'Type' },
                                        { id: 'uploads', icon: CloudArrowUpIcon, label: 'Media' },
                                        { id: 'styles', icon: PaintBrushIcon, label: 'Style' },
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setStudioTab(tab.id as any)}
                                            className={`flex flex-col items-center gap-2 p-3 w-16 rounded-2xl transition-all relative group
                                                ${studioTab === tab.id ? 'bg-[#1D2939] text-white shadow-lg shadow-gray-300 dark:shadow-none' : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}
                                            `}
                                        >
                                            <tab.icon className="w-6 h-6" />
                                            <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Content Panel */}
                                <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
                                    {/* Search Header */}
                                    <div className="p-6 border-b border-gray-50 dark:border-gray-800">
                                        <div className="relative group">
                                            <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 group-focus-within:text-[#D0771E] transition-colors" />
                                            <input
                                                type="text"
                                                placeholder={`Search ${studioTab}...`}
                                                className="w-full bg-gray-50/50 dark:bg-gray-800/80 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-[#D0771E]/10 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
                                        {studioTab === 'templates' && (
                                            <div className="space-y-6">
                                                {['Matching Suites', 'Invitation', 'Menus'].map(cat => (
                                                    <div key={cat}>
                                                        <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">{cat}</h3>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            {TEMPLATES.filter(t => t.category === cat).map(template => (
                                                                <div
                                                                    key={template.id}
                                                                    onClick={() => {
                                                                        setCanvasState(prev => ({
                                                                            ...prev,
                                                                            pages: template.pages,
                                                                            currentPageId: template.pages[0].id,
                                                                            selectedElementId: null
                                                                        }));
                                                                        addNotification({ message: `Loaded ${template.name}`, type: 'success' });
                                                                    }}
                                                                    className="aspect-[3/4] bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:ring-2 hover:ring-[#D0771E] cursor-pointer transition-all group relative"
                                                                >
                                                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/60">
                                                                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 capitalize">{template.name}</span>
                                                                    </div>
                                                                    <div className="absolute bottom-2 left-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis">{template.name}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {studioTab === 'elements' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Shapes</h3>
                                                    <div className="grid grid-cols-4 gap-3">
                                                        {['rounded-none', 'rounded-lg', 'rounded-full', 'rotate-45'].map((cls, i) => (
                                                            <div
                                                                key={i}
                                                                onClick={() => addElement('shape', undefined, { backgroundColor: '#D0771E', borderRadius: cls.includes('full') ? '9999px' : cls.includes('lg') ? '8px' : '0px', rotation: cls.includes('45') ? 45 : 0 })}
                                                                className={`aspect-square bg-gray-100 dark:bg-gray-800 border-2 border-transparent hover:border-[#D0771E] cursor-pointer flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-[#D0771E] transition-all ${cls === 'rounded-full' ? 'rounded-full' : 'rounded-md'}`}
                                                            >
                                                                <div className={`w-6 h-6 bg-current opacity-20 ${cls}`}></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="md"
                                                    className={`w-full text-left transition-all rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500`}
                                                    onClick={() => addElement('text', 'Heading', { fontSize: '64px', fontFamily: 'font-serif', fontWeight: '900', color: '#1D2939' })}
                                                >
                                                    <div className="text-3xl font-black font-serif tracking-tighter leading-none mb-1 text-[#1D2939] dark:text-white">Heading</div>
                                                    <Typography variant="caption" color="muted" className="uppercase tracking-widest" as="span">
                                                        Display Serif
                                                    </Typography>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="md"
                                                    className={`w-full text-left transition-all rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500`}
                                                    onClick={() => addElement('text', 'Subheading', { fontSize: '32px', fontFamily: 'font-sans', fontWeight: '700', color: '#1D2939' })}
                                                >
                                                    <div className="text-2xl font-black font-sans tracking-tight leading-none mb-1 text-[#1D2939] dark:text-white">Subheading</div>
                                                    <Typography variant="caption" color="muted" className="uppercase tracking-widest" as="span">
                                                        Bold Modern Sans
                                                    </Typography>
                                                </Button>
                                                <div>
                                                    <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider mt-6">Stickers</h3>
                                                    <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 hover:border-[#D0771E] transition-colors group cursor-pointer" onClick={() => addElement('shape', undefined, { backgroundColor: '#FFD700', borderRadius: '50%', width: 50, height: 50 })}>
                                                        <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm dark:shadow-none group-hover:scale-110 transition-transform">
                                                            <PlusIcon className="w-8 h-8 text-[#D0771E]" />
                                                        </div>
                                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Create Custom</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Add placeholder</p>
                                                    </div>

                                                    <div className="p-8 text-center bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-900 mt-4">
                                                        <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm dark:shadow-none">
                                                            <SparklesIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
                                                        </div>
                                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">AI Design Assistant</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Let AI generate designs for you</p>
                                                        <Button variant="primary" size="lg" className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-200/40 dark:shadow-none" onClick={() => addNotification({ message: 'AI Assistant coming soon', type: 'info' })}>
                                                            Generate with AI
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider mt-6">Photos</h3>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {[
                                                            'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop',
                                                            'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2ce?q=80&w=200&auto=format&fit=crop',
                                                            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=200&auto=format&fit=crop',
                                                            'https://images.unsplash.com/photo-1607134821990-d4d17329f60c?q=80&w=200&auto=format&fit=crop'
                                                        ].map((url, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={url}
                                                                onClick={() => addElement('image', url)}
                                                                className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-[#D0771E] transition-all"
                                                                alt="Stock"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {studioTab === 'text' && (
                                            <div className="space-y-4">
                                                <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider text-center">Typography Styles</h3>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full h-24 border border-gray-100 flex flex-col items-center justify-center gap-1 hover:border-[#D0771E] hover:bg-orange-50/50"
                                                        onClick={() => addElement('text', 'Header Text', { fontSize: '48px', fontFamily: 'font-serif', fontWeight: '900' })}
                                                    >
                                                        <span className="text-3xl font-black font-serif">Header</span>
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Serif Bold</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full h-20 border border-gray-100 flex flex-col items-center justify-center gap-1 hover:border-[#D0771E] hover:bg-orange-50/50"
                                                        onClick={() => addElement('text', 'Subheading', { fontSize: '24px', fontFamily: 'font-sans', fontWeight: '700' })}
                                                    >
                                                        <span className="text-xl font-bold font-sans">Subheading</span>
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Sans Bold</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full h-16 border border-gray-100 flex flex-col items-center justify-center gap-1 hover:border-[#D0771E] hover:bg-orange-50/50"
                                                        onClick={() => addElement('text', 'Body copy text...', { fontSize: '14px', fontFamily: 'font-sans', fontWeight: '400' })}
                                                    >
                                                        <span className="text-sm font-normal">Body Text</span>
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Regular Sans</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full h-16 border border-gray-100 flex flex-col items-center justify-center gap-1 hover:border-[#D0771E] hover:bg-orange-50/50"
                                                        onClick={() => addElement('text', 'ITALIC CAPTION', { fontSize: '12px', fontFamily: 'font-serif', fontWeight: '400', fontStyle: 'italic' } as any)}
                                                    >
                                                        <span className="text-xs italic font-serif">Caption Text</span>
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Italic Serif</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {studioTab === 'styles' && (
                                            <div className="space-y-6">
                                                <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider text-center">Color Palettes</h3>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {[
                                                        { name: 'Pure White', bg: '#FFFFFF', text: '#1D2939' },
                                                        { name: 'Warm Cream', bg: '#FDFCF0', text: '#433422' },
                                                        { name: 'Soft Blush', bg: '#FFF5F5', text: '#634A4A' },
                                                        { name: 'Midnight', bg: '#1D2939', text: '#FFFFFF' },
                                                        { name: 'Sage Green', bg: '#F1F3EE', text: '#3E4B39' },
                                                        { name: 'Royal Gold', bg: '#F9F7F2', text: '#C0A060' }
                                                    ].map((p, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setCanvasState(prev => ({ ...prev, backgroundColor: p.bg, textColor: p.text }))}
                                                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#D0771E] transition-all bg-white"
                                                        >
                                                            <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: p.bg }}></div>
                                                            <div className="text-left">
                                                                <p className="text-xs font-bold text-gray-900">{p.name}</p>
                                                                <div className="flex gap-1 mt-1">
                                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.text }}></div>
                                                                    <div className="w-3 h-3 rounded-full opacity-50" style={{ backgroundColor: p.text }}></div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {['uploads'].includes(studioTab) && (
                                            <div className="text-center py-10">
                                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                                                    <SparklesIcon className="w-6 h-6" />
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium">More tools coming soon</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 2. CENTER CANVAS - Infinite Workspace */}
                            <div className="flex-1 bg-gray-100/50 relative overflow-hidden flex flex-col">
                                {/* Rulers (Mock) */}
                                <div className="h-6 bg-white border-b border-gray-200 w-full flex text-[9px] text-gray-400 select-none overflow-hidden">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <div key={i} className="w-12 h-full border-r border-gray-100 flex items-end justify-start pl-1 pb-0.5">{i * 50}</div>
                                    ))}
                                </div>
                                <div className="flex-1 flex relative">
                                    <div className="w-6 bg-white border-r border-gray-200 h-full flex flex-col text-[9px] text-gray-400 select-none overflow-hidden items-center pt-2">
                                        {Array.from({ length: 25 }).map((_, i) => (
                                            <div key={i} className="h-12 w-full border-b border-gray-100 flex items-start justify-center pt-0.5"><span className="-rotate-90">{i * 50}</span></div>
                                        ))}
                                    </div>

                                    {/* Scrollable Canvas Area */}
                                    <div className="flex-1 flex items-center justify-center relative overflow-auto p-20">

                                        {/* The Artboard */}
                                        <div
                                            className="bg-white shadow-2xl transition-all duration-300 group relative select-none"
                                            onClick={() => setCanvasState(prev => ({ ...prev, selectedElementId: null }))}
                                            style={{
                                                width: `${canvasState.width}px`,
                                                height: `${canvasState.height}px`,
                                                backgroundColor: canvasState.pages.find(p => p.id === canvasState.currentPageId)?.backgroundColor || '#FFFFFF',
                                                transform: `scale(${canvasState.scale})`,
                                            }}
                                        >
                                            {/* Render Elements */}
                                            {canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.map(element => (
                                                <div
                                                    key={element.id}
                                                    onMouseDown={(e) => handleDragStart(e, element.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={`absolute flex items-center justify-center cursor-move hover:ring-1 hover:ring-[#D0771E]/50 ${canvasState.selectedElementId === element.id ? 'ring-2 ring-[#D0771E] z-10' : 'z-0'}`}
                                                    style={{
                                                        left: element.x,
                                                        top: element.y,
                                                        width: element.width ? `${element.width}px` : 'auto',
                                                        height: element.height ? `${element.height}px` : 'auto',
                                                        transform: `rotate(${element.rotation}deg)`,
                                                        ...element.style
                                                    }}
                                                >
                                                    {element.type === 'text' && (
                                                        <span
                                                            contentEditable
                                                            suppressContentEditableWarning
                                                            onBlur={(e) => updateSelectedElement({ content: e.currentTarget.innerText })}
                                                            style={{
                                                                fontSize: element.style.fontSize,
                                                                fontFamily: element.style.fontFamily,
                                                                fontWeight: element.style.fontWeight,
                                                                color: element.style.color,
                                                                outline: 'none',
                                                                display: 'block',
                                                                width: '100%',
                                                                textAlign: (element.style as any).textAlign || 'center'
                                                            }}
                                                        >{element.content}</span>
                                                    )}
                                                    {element.type === 'image' && (
                                                        <img
                                                            src={element.content}
                                                            className="w-full h-full object-cover select-none pointer-events-none"
                                                            alt="Element"
                                                            style={{
                                                                borderRadius: element.style.borderRadius,
                                                                opacity: element.style.opacity
                                                            }}
                                                        />
                                                    )}
                                                    {element.type === 'shape' && (
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundColor: element.style.backgroundColor,
                                                            borderRadius: element.style.borderRadius,
                                                        }} />
                                                    )}
                                                    {canvasState.selectedElementId === element.id && (
                                                        <>
                                                            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#D0771E] rounded-full"></div>
                                                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#D0771E] rounded-full"></div>
                                                            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#D0771E] rounded-full"></div>
                                                            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#D0771E] rounded-full"></div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Floating Toolbar */}
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-xl border border-gray-200 p-1.5 flex items-center gap-1 z-30">
                                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900" title="Hand Tool"><ViewColumnsIcon className="w-4 h-4" /></button>
                                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900" onClick={() => setCanvasState(prev => ({ ...prev, scale: Math.max(0.2, prev.scale - 0.1) }))} title="Zoom Out"><ChevronDownIcon className="w-4 h-4" /></button>
                                            <span className="text-xs font-bold text-gray-600 w-12 text-center">{Math.round(canvasState.scale * 100)}%</span>
                                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900" onClick={() => setCanvasState(prev => ({ ...prev, scale: Math.min(3, prev.scale + 0.1) }))} title="Zoom In"><PlusIcon className="w-4 h-4" /></button>
                                        </div>

                                        {/* Page Navigator */}
                                        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-100 p-2 flex items-center gap-2 z-30">
                                            {canvasState.pages.map((page) => (
                                                <div key={page.id} className="group relative">
                                                    <button
                                                        onClick={() => setCanvasState(prev => ({ ...prev, currentPageId: page.id }))}
                                                        onDoubleClick={() => {
                                                            const newName = prompt('Enter page name:', page.label);
                                                            if (newName) renamePage(page.id, newName);
                                                        }}
                                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${canvasState.currentPageId === page.id ? 'bg-[#1D2939] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                                    >
                                                        {page.label}
                                                    </button>
                                                    {canvasState.pages.length > 1 && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); removePage(page.id); }}
                                                            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >×</button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                onClick={addPage}
                                                className="w-10 py-1.5 rounded-lg bg-orange-50 text-[#D0771E] hover:bg-orange-100 flex items-center justify-center transition-all"
                                                title="Add Page"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. RIGHT SIDEBAR - Properties Panel */}
                            <div className="w-[280px] bg-white border-l border-gray-200 flex flex-col z-20">
                                <div className="p-4 border-b border-gray-100">
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                                        {canvasState.selectedElementId ? 'Element Properties' : 'Canvas Properties'}
                                    </h3>
                                </div>

                                <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
                                    {canvasState.selectedElementId ? (
                                        // ELEMENT PROPERTIES
                                        <>
                                            {/* Position & Size */}
                                            <div className="mb-8">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Position & Size</label>
                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center">
                                                        <span className="text-[9px] text-gray-400 mr-2">X</span>
                                                        <input
                                                            type="number"
                                                            value={Math.round(canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.x || 0)}
                                                            onChange={(e) => updateSelectedElement({ x: parseInt(e.target.value) })}
                                                            className="w-full bg-transparent border-none p-0 text-right text-sm font-bold text-gray-700"
                                                        />
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center">
                                                        <span className="text-[9px] text-gray-400 mr-2">Y</span>
                                                        <input
                                                            type="number"
                                                            value={Math.round(canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.y || 0)}
                                                            onChange={(e) => updateSelectedElement({ y: parseInt(e.target.value) })}
                                                            className="w-full bg-transparent border-none p-0 text-right text-sm font-bold text-gray-700"
                                                        />
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center">
                                                        <span className="text-[9px] text-gray-400 mr-2">W</span>
                                                        <input
                                                            type="number"
                                                            value={Math.round(canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.width || 0)}
                                                            onChange={(e) => updateSelectedElement({ width: parseInt(e.target.value) })}
                                                            className="w-full bg-transparent border-none p-0 text-right text-sm font-bold text-gray-700"
                                                        />
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center">
                                                        <span className="text-[9px] text-gray-400 mr-2">H</span>
                                                        <input
                                                            type="number"
                                                            value={Math.round(canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.height || 0)}
                                                            onChange={(e) => updateSelectedElement({ height: parseInt(e.target.value) })}
                                                            className="w-full bg-transparent border-none p-0 text-right text-sm font-bold text-gray-700"
                                                        />
                                                    </div>
                                                </div>

                                                <label className="text-[9px] text-gray-400 mb-1 block">Rotation</label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="range"
                                                        min="-180"
                                                        max="180"
                                                        value={canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.rotation || 0}
                                                        onChange={(e) => updateSelectedElement({ rotation: parseInt(e.target.value) })}
                                                        className="flex-1 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                                                    />
                                                    <span className="text-[10px] font-bold text-gray-600 w-8 text-right">{canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.rotation || 0}°</span>
                                                </div>
                                            </div>

                                            {/* Style Properties */}
                                            <div className="mb-8">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Style</label>
                                                <div className="space-y-4">
                                                    {canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.type === 'text' && (
                                                        <div className="flex items-center gap-1 mb-4">
                                                            {['left', 'center', 'right'].map(align => (
                                                                <button
                                                                    key={align}
                                                                    onClick={() => updateSelectedElement({ textAlign: align } as any)}
                                                                    className={`flex-1 py-1 rounded border text-[10px] font-bold uppercase tracking-tighter ${(canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.style as any).textAlign === align ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}`}
                                                                >
                                                                    {align}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Color Picker Mock */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-medium text-gray-600">Color</span>
                                                        <input
                                                            type="color"
                                                            value={canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.style.color || canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.style.backgroundColor || '#000000'}
                                                            onChange={(e) => {
                                                                const el = canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId);
                                                                if (el?.type === 'text') updateSelectedElement({ color: e.target.value });
                                                                else updateSelectedElement({ backgroundColor: e.target.value });
                                                            }}
                                                            className="w-8 h-8 rounded cursor-pointer"
                                                        />
                                                    </div>

                                                    {canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.type === 'text' && (
                                                        <>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium text-gray-600">Size</span>
                                                                <input
                                                                    type="text"
                                                                    value={canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.style.fontSize || ''}
                                                                    onChange={(e) => updateSelectedElement({ fontSize: e.target.value })}
                                                                    className="w-16 bg-gray-50 border border-gray-200 rounded text-xs p-1 text-right"
                                                                />
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium text-gray-600">Font</span>
                                                                <select
                                                                    className="w-32 bg-gray-50 border border-gray-200 rounded text-xs p-1"
                                                                    onChange={(e) => updateSelectedElement({ fontFamily: e.target.value })}
                                                                    value={canvasState.pages.find(p => p.id === canvasState.currentPageId)?.elements.find(el => el.id === canvasState.selectedElementId)?.style.fontFamily}
                                                                >
                                                                    <option value="font-sans">Sans</option>
                                                                    <option value="font-serif">Serif</option>
                                                                    <option value="font-mono">Mono</option>
                                                                </select>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                <Button variant="outline" size="sm" onClick={() => bringToFront(canvasState.selectedElementId!)}>To Front</Button>
                                                <Button variant="outline" size="sm" onClick={() => sendToBack(canvasState.selectedElementId!)}>To Back</Button>
                                            </div>
                                            <Button variant="destructive" size="sm" className="w-full font-bold" onClick={() => {
                                                setCanvasState(prev => ({
                                                    ...prev,
                                                    pages: prev.pages.map(p => {
                                                        if (p.id !== prev.currentPageId) return p;
                                                        return { ...p, elements: p.elements.filter(el => el.id !== prev.selectedElementId) };
                                                    }),
                                                    selectedElementId: null
                                                }));
                                            }}>Delete Element</Button>
                                        </>
                                    ) : (
                                        // CANVAS GLOBAL PROPERTIES
                                        <>
                                            {/* Dimensions */}
                                            <div className="mb-8">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Dimensions</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 relative group focus-within:border-[#D0771E] focus-within:ring-1 focus-within:ring-[#D0771E]/20 transition-all">
                                                        <span className="text-[9px] text-gray-400 absolute left-2 top-2">W</span>
                                                        <input type="text" value={canvasState.width} onChange={(e) => setCanvasState({ ...canvasState, width: parseInt(e.target.value) || 0 })} className="w-full bg-transparent border-none p-0 text-right text-sm font-bold text-gray-700 focus:ring-0" />
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 relative group focus-within:border-[#D0771E] focus-within:ring-1 focus-within:ring-[#D0771E]/20 transition-all">
                                                        <span className="text-[9px] text-gray-400 absolute left-2 top-2">H</span>
                                                        <input type="text" value={canvasState.height} onChange={(e) => setCanvasState({ ...canvasState, height: parseInt(e.target.value) || 0 })} className="w-full bg-transparent border-none p-0 text-right text-sm font-bold text-gray-700 focus:ring-0" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Appearance */}
                                            <div className="mb-8">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Appearance</label>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-medium text-gray-600">Background</span>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded border border-gray-200 shadow-sm" style={{ backgroundColor: canvasState.pages.find(p => p.id === canvasState.currentPageId)?.backgroundColor }}></div>
                                                            <input
                                                                type="text"
                                                                value={canvasState.pages.find(p => p.id === canvasState.currentPageId)?.backgroundColor}
                                                                onChange={(e) => setCanvasState(prev => ({
                                                                    ...prev,
                                                                    pages: prev.pages.map(p => p.id === prev.currentPageId ? { ...p, backgroundColor: e.target.value } : p)
                                                                }))}
                                                                className="w-20 text-xs font-medium text-gray-600 bg-gray-50 border-gray-200 rounded py-1"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- CREATED DESIGNS TAB --- */}
                {activeTab === 'Created Designs' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {myDesigns.map((design) => (
                            <div
                                key={design.id}
                                onClick={() => {
                                    handleCategorySelect(designCategories.find(c => c.title === design.category) || designCategories[0]);
                                    setActiveTab('Design Studio');
                                }}
                                className="group relative rounded-[32px] overflow-hidden cursor-pointer bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 shadow-lg shadow-gray-100 dark:shadow-none hover:shadow-2xl hover:shadow-[#D0771E]/10 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-1 block"
                            >
                                <div className="aspect-[3/4] relative overflow-hidden bg-[#F9FAFB] dark:bg-gray-900">
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                    <img
                                        src={design.image}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={design.title}
                                        loading="lazy"
                                        onLoad={(e) => (e.target as HTMLImageElement).parentElement?.querySelector('.animate-pulse')?.remove()}
                                    />
                                    {/* Favorite Button Overlay */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavourite(design.id);
                                        }}
                                        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 dark:bg-gray-900/40 backdrop-blur-md border border-white/30 dark:border-gray-700 text-white hover:bg-white hover:text-red-500 dark:hover:bg-gray-900 dark:hover:text-red-400 transition-all z-10"
                                    >
                                        <HeartIcon className={`w-5 h-5 ${design.isFavourite ? 'fill-current text-red-500' : ''}`} />
                                    </button>

                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-24 opacity-100 transition-opacity">
                                        <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[9px] font-black text-white uppercase tracking-widest border border-white/30">
                                                    {design.category}
                                                </span>
                                                {design.isFavourite && (
                                                    <span className="inline-block px-2 py-1 bg-red-500/80 backdrop-blur-md rounded text-[9px] font-black text-white uppercase tracking-widest border border-white/10">
                                                        Hearted
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-black text-white text-lg uppercase tracking-tight mb-1">
                                                {design.title}
                                            </h3>
                                            <p className="text-[11px] font-medium text-gray-200">
                                                Edited {design.lastEdited}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- SEND INVITATIONS TAB --- (Kept original logic with improved padding) */}
                {activeTab === 'Send Invitations' && (
                    <div className="bg-white dark:bg-gray-900 rounded-[40px] shadow-2xl shadow-gray-200 dark:shadow-none border border-gray-100 dark:border-gray-700 p-20 max-w-4xl mx-auto w-full relative overflow-hidden mt-10">
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-50/50 dark:bg-orange-900/20 rounded-full blur-[100px]"></div>

                        <div className="text-center mb-16 relative z-10">
                            <div className="w-28 h-28 bg-[#1D2939] text-white rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-3xl dark:shadow-none rotate-6 transition-transform hover:rotate-0">
                                <RocketLaunchIcon className="w-12 h-12" />
                            </div>
                            <Typography variant="h2" className="tracking-tighter uppercase mb-4" as="h2">
                                Digital Blast
                            </Typography>
                            <Typography variant="small" color="muted" className="font-bold uppercase tracking-[0.3em]" as="p">
                                Precision distribution for premium events.
                            </Typography>
                        </div>

                        <div className="space-y-12 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] ml-2">Choose Selection</label>
                                    <select className="w-full rounded-3xl bg-gray-50 dark:bg-gray-800 border-transparent py-6 px-10 text-xs font-black text-[#1D2939] dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-[#D0771E] focus:ring-0 appearance-none shadow-inner dark:shadow-none">
                                        {myDesigns.map(d => <option key={d.id}>{d.title}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-2">Source Control</label>
                                    <Button
                                        variant="primary"
                                        size="md"
                                        className="w-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 rounded-3xl"
                                        onClick={() => addNotification({ message: 'Syncing Database...', type: 'info' })}
                                        isDisabled={isSaving}
                                    >
                                        <ViewColumnsIcon className="w-5 h-5 text-[#D0771E]" /> Guest List
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-2">Direct Overwrite</label>
                                <textarea
                                    rows={4}
                                    placeholder="guest@ariya.com, host@ariya.com"
                                    className="w-full rounded-[40px] bg-gray-50 border-transparent p-12 text-sm font-black text-[#1D2939] focus:bg-white focus:border-[#D0771E] focus:ring-0 transition-all placeholder:opacity-30"
                                ></textarea>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full font-black uppercase text-xs tracking-[0.5em] shadow-3xl shadow-orange-100 hover:-translate-y-1 transition-all flex items-center justify-center gap-6 rounded-3xl"
                                onClick={() => addNotification({ message: 'Broadcast Sequence Started!', type: 'success' })}
                            >
                                Initiate Send Sequence
                            </Button>
                        </div>
                    </div>
                )}

            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
            />
        </div>
    );
};

export default Designs;
