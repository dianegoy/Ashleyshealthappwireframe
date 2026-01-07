import { EventType } from '../App';

interface HomeScreenProps {
  onOpenLog: (type: EventType) => void;
}

export function HomeScreen({ onOpenLog }: HomeScreenProps) {
  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl text-neutral-900 mb-1">Today</h1>
        <p className="text-sm text-neutral-600">Wednesday, January 7, 2026</p>
      </div>

      {/* Primary Actions - Large, thumb-friendly */}
      <div className="space-y-4 mb-10">
        <button
          onClick={() => onOpenLog('nausea')}
          className="w-full py-6 border-2 border-neutral-900 bg-white text-left px-6 hover:bg-neutral-50 active:bg-neutral-100"
        >
          <div className="text-lg text-neutral-900">Log Nausea</div>
        </button>

        <button
          onClick={() => onOpenLog('stool')}
          className="w-full py-6 border-2 border-neutral-900 bg-white text-left px-6 hover:bg-neutral-50 active:bg-neutral-100"
        >
          <div className="text-lg text-neutral-900">Log Stool</div>
        </button>

        <button
          onClick={() => onOpenLog('water')}
          className="w-full py-6 border-2 border-neutral-900 bg-white text-left px-6 hover:bg-neutral-50 active:bg-neutral-100"
        >
          <div className="text-lg text-neutral-900">Log Water</div>
        </button>

        <button
          onClick={() => onOpenLog('medication')}
          className="w-full py-6 border-2 border-neutral-900 bg-white text-left px-6 hover:bg-neutral-50 active:bg-neutral-100"
        >
          <div className="text-lg text-neutral-900">Log Medication</div>
        </button>
      </div>

      {/* Secondary Actions - Smaller, grouped */}
      <div className="border-t border-neutral-300 pt-6 mb-10">
        <div className="text-xs text-neutral-600 uppercase tracking-wider mb-4">Additional Tracking</div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onOpenLog('symptom')}
            className="py-4 border border-neutral-400 bg-white text-center text-sm hover:bg-neutral-50 active:bg-neutral-100"
          >
            Symptom
          </button>
          <button
            onClick={() => onOpenLog('period-start')}
            className="py-4 border border-neutral-400 bg-white text-center text-sm hover:bg-neutral-50 active:bg-neutral-100"
          >
            Period Start
          </button>
          <button
            onClick={() => onOpenLog('period-end')}
            className="py-4 border border-neutral-400 bg-white text-center text-sm hover:bg-neutral-50 active:bg-neutral-100"
          >
            Period End
          </button>
        </div>
      </div>

      {/* Today Summary */}
      <div className="border-t-2 border-neutral-900 pt-8">
        <h2 className="text-sm text-neutral-900 uppercase tracking-wider mb-6">Today Summary</h2>
        
        <div className="space-y-6">
          {/* Water Intake */}
          <div className="pb-6 border-b border-neutral-200">
            <div className="text-xs text-neutral-600 uppercase tracking-wider mb-3">Hydration</div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl text-neutral-900">32</span>
              <span className="text-base text-neutral-600">/ 92 oz</span>
            </div>
            <div className="h-2 bg-neutral-200 mb-3">
              <div className="h-full bg-neutral-900" style={{ width: '35%' }}></div>
            </div>
            <div className="text-xs text-neutral-600">Last drink: 8 oz, 22 min ago</div>
          </div>

          {/* Medications */}
          <div className="pb-6 border-b border-neutral-200">
            <div className="text-xs text-neutral-600 uppercase tracking-wider mb-3">Medications</div>
            <div className="text-base text-neutral-900 mb-3">2 doses logged today</div>
            <div className="space-y-2">
              <div className="text-sm text-neutral-700">• Medication A at 8:00 AM</div>
              <div className="text-sm text-neutral-700">• Medication B at 2:30 PM</div>
            </div>
          </div>

          {/* Last Bowel Movement */}
          <div className="pb-6 border-b border-neutral-200">
            <div className="text-xs text-neutral-600 uppercase tracking-wider mb-3">Bowel Movement</div>
            <div className="text-base text-neutral-900 mb-2">Yesterday at 9:15 AM</div>
            <div className="text-sm text-neutral-700">Bristol Type 3 · No pain reported</div>
          </div>

          {/* Cycle Info */}
          <div>
            <div className="text-xs text-neutral-600 uppercase tracking-wider mb-3">Menstrual Cycle</div>
            <div className="text-base text-neutral-900 mb-2">Luteal Phase · Day 21 of 28</div>
            <div className="text-sm text-neutral-700">Period expected January 15, 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}