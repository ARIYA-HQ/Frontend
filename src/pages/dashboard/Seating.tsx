import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import SeatingChart from '../../components/guests/SeatingChart';

interface Table {
  id: string;
  name: string;
  type: 'round' | 'rectangle';
  capacity: number;
  guestIds: number[];
  x: number;
  y: number;
  conflicts?: string[];
}

interface Guest {
  id: number;
  name: string;
  group: string;
  assignedTableId?: string;
  avatar?: string;
  isVIP?: boolean;
  dietary?: string;
}

const Seating = () => {
  // Initialize with sample data
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: 'Phoenix Baker', group: 'Family', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', isVIP: true, dietary: 'Nut Allergy' },
    { id: 2, name: 'Lana Steiner', group: 'Friends', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', dietary: 'Vegan' },
    { id: 3, name: 'Demi Wilkinson', group: 'Work', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', isVIP: true },
    { id: 4, name: 'Candice Wu', group: 'Family', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 5, name: 'Natali Craig', group: 'Friends', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', dietary: 'Gluten Free' },
    { id: 6, name: 'Drew Cano', group: 'VIP', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', isVIP: true },
    { id: 7, name: 'Orlando Diggs', group: 'Work', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 8, name: 'Andi Lane', group: 'Friends', avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 9, name: 'Kate Morrison', group: 'Family', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 10, name: 'Koray Okumus', group: 'VIP', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', isVIP: true },
  ]);

  const [tables, setTables] = useState<Table[]>([
    { id: 'table-1', name: 'Head Table', type: 'rectangle', capacity: 10, guestIds: [], x: 400, y: 100 },
    { id: 'table-2', name: 'Table 2', type: 'round', capacity: 8, guestIds: [], x: 200, y: 300 },
    { id: 'table-3', name: 'Table 3', type: 'round', capacity: 8, guestIds: [], x: 600, y: 300 },
  ]);

  return (
    <div className="max-w-7xl mx-auto pb-12 dark:bg-gray-900">
      <PageHeader
        breadcrumb="Guest Management"
        title="Seating Manifest"
        subtitle="Strategic Table Positioning & Guest Orchestration"
      />

      <SeatingChart
        guests={guests}
        tables={tables}
        setTables={setTables}
        setGuests={setGuests}
      />
    </div>
  );
};

export default Seating;