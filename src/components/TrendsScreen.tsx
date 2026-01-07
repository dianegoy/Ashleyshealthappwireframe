import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

// Mock data with cycle phases
const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 28; i++) {
    data.push({
      day: i + 1,
      nausea: i < 5 ? 3 : i < 14 ? 2 : i < 16 ? 1 : 5 + Math.random() * 3,
      progesterone: i < 5 ? 1 : i < 14 ? 1.5 : i < 16 ? 3 : 8 + Math.random() * 4,
      estrogen: i < 5 ? 20 : i < 14 ? 40 + i * 8 : i < 16 ? 150 : 60,
    });
  }
  return data;
};

const data = generateMockData();

export function TrendsScreen() {
  const [dateRange, setDateRange] = useState('28');
  const [showSymptoms, setShowSymptoms] = useState(true);
  const [showHormones, setShowHormones] = useState(true);
  const [showMedications, setShowMedications] = useState(true);

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-neutral-900 mb-1">Trends</h1>
        <p className="text-sm text-neutral-600">Cycle overlay with symptom correlation</p>
      </div>

      {/* Date Range Selector */}
      <div className="mb-8">
        <label htmlFor="date-range" className="block text-xs text-neutral-600 uppercase tracking-wider mb-3">
          Date Range
        </label>
        <select
          id="date-range"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-neutral-300 text-base bg-white"
        >
          <option value="28">Last 28 Days (1 Cycle)</option>
          <option value="84">Last 3 Months (3 Cycles)</option>
          <option value="168">Last 6 Months (6 Cycles)</option>
        </select>
      </div>

      {/* Filter Toggles */}
      <div className="mb-8 pb-8 border-b border-neutral-300">
        <div className="text-xs text-neutral-600 uppercase tracking-wider mb-4">
          Display Options
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showSymptoms}
              onChange={(e) => setShowSymptoms(e.target.checked)}
              className="w-5 h-5 border-2 border-neutral-400"
              aria-label="Show symptoms"
            />
            <span className="text-base text-neutral-900">Symptoms (Nausea)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showHormones}
              onChange={(e) => setShowHormones(e.target.checked)}
              className="w-5 h-5 border-2 border-neutral-400"
              aria-label="Show hormones"
            />
            <span className="text-base text-neutral-900">Hormones</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showMedications}
              onChange={(e) => setShowMedications(e.target.checked)}
              className="w-5 h-5 border-2 border-neutral-400"
              aria-label="Show medication markers"
            />
            <span className="text-base text-neutral-900">Medication Markers</span>
          </label>
        </div>
      </div>

      {/* Phase Legend */}
      <div className="mb-6">
        <div className="text-xs text-neutral-600 uppercase tracking-wider mb-4">
          Cycle Phases
        </div>
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div>
            <div className="h-4 bg-neutral-100 border border-neutral-300 mb-2"></div>
            <div className="text-neutral-900 mb-1">Menstrual</div>
            <div className="text-neutral-600">Day 1-5</div>
          </div>
          <div>
            <div className="h-4 bg-neutral-200 border border-neutral-300 mb-2"></div>
            <div className="text-neutral-900 mb-1">Follicular</div>
            <div className="text-neutral-600">Day 6-13</div>
          </div>
          <div>
            <div className="h-4 bg-neutral-300 border border-neutral-400 mb-2"></div>
            <div className="text-neutral-900 mb-1">Ovulatory</div>
            <div className="text-neutral-600">Day 14-16</div>
          </div>
          <div>
            <div className="h-4 bg-neutral-400 border border-neutral-500 mb-2"></div>
            <div className="text-neutral-900 mb-1">Luteal</div>
            <div className="text-neutral-600">Day 17-28</div>
          </div>
        </div>
      </div>

      {/* Graph Area */}
      <div className="border border-neutral-300 p-4 bg-white mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            {/* Phase backgrounds */}
            <ReferenceArea x1={1} x2={5} fill="#f5f5f5" fillOpacity={0.6} />
            <ReferenceArea x1={6} x2={13} fill="#e5e5e5" fillOpacity={0.6} />
            <ReferenceArea x1={14} x2={16} fill="#d4d4d4" fillOpacity={0.6} />
            <ReferenceArea x1={17} x2={28} fill="#a3a3a3" fillOpacity={0.4} />
            
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e7" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: '#737373' }}
              label={{ value: 'Cycle Day', position: 'insideBottom', offset: -5, fontSize: 10 }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 10, fill: '#737373' }}
              label={{ value: 'Nausea', angle: -90, position: 'insideLeft', fontSize: 10 }}
              domain={[0, 10]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: '#737373' }}
              label={{ value: 'Hormones', angle: 90, position: 'insideRight', fontSize: 10 }}
            />

            {/* Medication markers */}
            {showMedications && (
              <>
                <ReferenceLine yAxisId="left" x={8} stroke="#000" strokeDasharray="3 3" strokeWidth={1} />
                <ReferenceLine yAxisId="left" x={15} stroke="#000" strokeDasharray="3 3" strokeWidth={1} />
                <ReferenceLine yAxisId="left" x={21} stroke="#000" strokeDasharray="3 3" strokeWidth={1} />
                <ReferenceLine yAxisId="left" x={24} stroke="#000" strokeDasharray="3 3" strokeWidth={1} />
              </>
            )}

            {showSymptoms && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="nausea"
                stroke="#000"
                strokeWidth={2}
                dot={false}
              />
            )}

            {showHormones && (
              <>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="progesterone"
                  stroke="#525252"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="estrogen"
                  stroke="#737373"
                  strokeWidth={1}
                  dot={false}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Graph Legend */}
      <div className="border border-neutral-300 p-4 bg-neutral-50">
        <div className="text-xs text-neutral-500 uppercase tracking-wide mb-3">
          Legend
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-neutral-900"></div>
            <span className="text-neutral-700">Nausea Intensity (1-10)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-neutral-500 border-t border-dashed border-neutral-500"></div>
            <span className="text-neutral-700">Progesterone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-neutral-400"></div>
            <span className="text-neutral-700">Estrogen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 border-t border-dashed border-neutral-900"></div>
            <span className="text-neutral-700">PRN Medication Taken</span>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 border-t-2 border-neutral-900 pt-6">
        <div className="text-xs text-neutral-500 uppercase tracking-wide mb-3">
          Key Patterns
        </div>
        <ul className="space-y-2 text-sm text-neutral-700">
          <li>• Peak nausea occurs during luteal phase</li>
          <li>• Average severity: 7.2/10 in luteal vs 2.1/10 in follicular</li>
          <li>• 78% of PRN medication use during luteal phase</li>
        </ul>
      </div>
    </div>
  );
}