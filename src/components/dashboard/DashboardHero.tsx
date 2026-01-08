import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/solid';

const DashboardHero = () => {
    const eventName = "Toluwanimi's Birthday Party";
    const location = "Lagos Island, Lagos";
    const date = "19 December 2025";
    const daysToGo = 50;

    return (
        <div className="relative w-full rounded-[40px] overflow-hidden bg-gradient-to-br from-[#1A051D] via-[#2D0A31] to-[#1A051D] text-white p-8 sm:p-12 lg:p-16 mb-10 shadow-2xl dark:shadow-none group border border-white/5">
            {/* Immersive Background Decorations */}
            <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:scale-110 transition-transform duration-1000">
                <div className="w-96 h-96 bg-[#D0771E] rounded-full blur-[120px] -mr-32 -mt-32 opacity-20"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-4 opacity-30">
                <div className="w-64 h-64 bg-purple-500 rounded-full blur-[100px] -ml-32 -mb-32 opacity-10"></div>
            </div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-10 sm:gap-12">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-orange-500/30">
                            Upcoming Event
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                        <span className="text-white/60 text-[10px] font-black uppercase tracking-widest italic">Live Status</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.95] max-w-2xl group-hover:text-orange-100 transition-colors">
                        {eventName}
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-white/70">
                        <div className="flex items-center gap-3 group/item">
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover/item:bg-white/10 transition-colors">
                                <MapPinIcon className="w-5 h-5 text-[#D0771E]" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">{location}</span>
                        </div>
                        <div className="flex items-center gap-3 group/item">
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover/item:bg-white/10 transition-colors">
                                <CalendarIcon className="w-5 h-5 text-[#D0771E]" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">{date}</span>
                        </div>
                    </div>
                </div>

                {/* Countdown Circle Container */}
                <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center group/circle">
                        {/* SVG Circle Progress */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                stroke="white"
                                strokeWidth="2"
                                fill="transparent"
                                className="opacity-10"
                            />
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                stroke="#D0771E"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray="465"
                                strokeDashoffset="120"
                                className="transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(208,119,30,0.5)]"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl sm:text-5xl font-black tracking-tighter transition-transform group-hover/circle:scale-110 duration-500">{daysToGo}</span>
                            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-[#D0771E] mt-0.5 sm:mt-1">Days To Go</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;
