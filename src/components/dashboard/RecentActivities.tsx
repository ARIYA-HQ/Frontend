import { UserGroupIcon, MusicalNoteIcon, TruckIcon } from '@heroicons/react/24/solid';

const activities = [
    { id: 1, text: "3 new RSVPs received", time: "2 hrs ago", icon: UserGroupIcon, color: "bg-orange-50 text-orange-600 border-orange-100" },
    { id: 2, text: "DJ confirmed availability", time: "2 hrs ago", icon: MusicalNoteIcon, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { id: 3, text: "Catering quote updated", time: "2 hrs ago", icon: TruckIcon, color: "bg-green-50 text-green-600 border-green-100" },
    { id: 4, text: "3 new RSVPs received", time: "2 hrs ago", icon: UserGroupIcon, color: "bg-orange-50 text-orange-600 border-orange-100" },
];

const RecentActivities = () => {
    return (
        <div className="h-full">
            <div className="space-y-2 mb-10">
                <h3 className="text-lg font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Recent Activities</h3>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Latest updates from your event</p>
            </div>

            <div className="relative border-l-2 border-dashed border-gray-100 dark:border-gray-700 ml-5 space-y-10 py-2">
                {activities.map((activity) => (
                    <div key={activity.id} className="relative pl-10 group cursor-default">
                        {/* Timeline dot */}
                        <span className={`absolute -left-[18px] top-0 w-8 h-8 rounded-[12px] flex items-center justify-center ${activity.color} border group-hover:scale-110 transition-transform duration-300`}>
                            <activity.icon className="w-4 h-4" />
                        </span>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D2939] dark:text-white font-black text-[11px] uppercase tracking-widest group-hover:text-[#D0771E] transition-colors">{activity.text}</span>
                            <span className="text-gray-400 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivities;
