import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from 'recharts';

// Mock data for the cycle overlay
const generateMockData = () => {
  const data = [];
  const cycleStart = new Date('2025-12-18');
  
  for (let day = 0; day < 28; day++) {
    const currentDate = new Date(cycleStart);
    currentDate.setDate(cycleStart.getDate() + day);
    
    // Determine cycle phase
    let phase = '';
    let estrogen = 0;
    let progesterone = 0;
    let lh = 0;
    
    if (day <= 5) {
      phase = 'Menstrual';
      estrogen = 20 + Math.random() * 10;
      progesterone = 1 + Math.random() * 2;
      lh = 5 + Math.random() * 3;
    } else if (day <= 13) {
      phase = 'Follicular';
      estrogen = 20 + (day - 5) * 15 + Math.random() * 20;
      progesterone = 1 + Math.random() * 2;
      lh = day === 13 ? 40 : 5 + Math.random() * 5;
    } else if (day <= 16) {
      phase = 'Ovulatory';
      estrogen = 150 - (day - 13) * 30 + Math.random() * 20;
      progesterone = 2 + (day - 13) * 2;
      lh = day === 14 ? 45 : 20 - (day - 14) * 5;
    } else {
      phase = 'Luteal';
      estrogen = 60 + Math.sin((day - 16) * 0.5) * 20;
      progesterone = 5 + (day - 16) * 3 + Math.random() * 5;
      lh = 5 + Math.random() * 2;
    }
    
    // Nausea correlates with hormone changes
    let nausea = 0;
    if (day >= 18 && day <= 27) {
      // Higher nausea in luteal phase
      nausea = 3 + Math.random() * 5;
    } else if (day <= 2) {
      nausea = 2 + Math.random() * 3;
    } else {
      nausea = Math.random() * 2;
    }
    
    data.push({
      day: `Day ${day + 1}`,
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      estrogen: Math.round(estrogen * 10) / 10,
      progesterone: Math.round(progesterone * 10) / 10,
      lh: Math.round(lh * 10) / 10,
      nausea: Math.round(nausea * 10) / 10,
      phase
    });
  }
  
  return data;
};

const data = generateMockData();

export function CycleOverlayChart() {
  return (
    <div className="space-y-4">
      {/* Phase Legend */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-slate-700">Menstrual (Days 1-5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span className="text-slate-700">Follicular (Days 6-13)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-slate-700">Ovulatory (Days 14-16)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span className="text-slate-700">Luteal (Days 17-28)</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="nauseaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            interval={3}
          />
          <YAxis 
            yAxisId="left"
            label={{ value: 'Hormone Levels (pg/mL or mIU/mL)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            domain={[0, 10]}
            label={{ value: 'Nausea Intensity (1-10)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          
          {/* Hormone Lines */}
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="estrogen" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={false}
            name="Estrogen"
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="progesterone" 
            stroke="#ec4899" 
            strokeWidth={2}
            dot={false}
            name="Progesterone"
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="lh" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={false}
            name="LH"
          />
          
          {/* Nausea Area */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="nausea"
            fill="url(#nauseaGradient)"
            stroke="#ef4444"
            strokeWidth={2}
            name="Nausea"
          />
          
          {/* Phase markers */}
          <ReferenceLine yAxisId="left" x="Day 14" stroke="#10b981" strokeDasharray="3 3" label="Ovulation" />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Additional Info */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
        <div>
          <div className="text-xs text-slate-600 mb-1">Peak Nausea</div>
          <div className="text-sm text-slate-900">Luteal Phase (Days 20-24)</div>
        </div>
        <div>
          <div className="text-xs text-slate-600 mb-1">Correlation</div>
          <div className="text-sm text-slate-900">High Progesterone → Higher Nausea</div>
        </div>
        <div>
          <div className="text-xs text-slate-600 mb-1">Pattern</div>
          <div className="text-sm text-slate-900">Consistent over 3 cycles</div>
        </div>
      </div>
    </div>
  );
}
