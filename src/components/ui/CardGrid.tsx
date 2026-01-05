import type { ReactNode } from 'react';

interface CardGridItem {
    id: string;
    title: string;
    category?: string;
    date?: string;
    description?: string;
    isFavourite?: boolean;
    [key: string]: any;
}

interface CardGridProps {
    items: CardGridItem[];
    onCardClick?: (item: CardGridItem) => void;
    cols?: 2 | 3 | 4;
    responsive?: 'sm' | 'md' | 'lg';
    renderCard?: (item: CardGridItem) => ReactNode;
}

export const CardGrid = ({
    items,
    onCardClick,
    cols = 3,
    responsive = 'lg',
    renderCard
}: CardGridProps) => {
    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    const defaultRenderCard = (item: CardGridItem) => (
        <div
            key={item.id}
            onClick={() => onCardClick?.(item)}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                {item.category && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.category === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        item.category === 'Planning' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {item.category}
                    </span>
                )}
            </div>
            {item.date && (
                <div className="text-xs text-gray-500 mb-2">{item.date}</div>
            )}
            {item.description && (
                <div className="text-xs text-gray-500">{item.description}</div>
            )}
        </div>
    );

    return (
        <div className={`grid ${gridCols[cols]} gap-6`}>
            {items.map(item => renderCard ? renderCard(item) : defaultRenderCard(item))}
        </div>
    );
};
