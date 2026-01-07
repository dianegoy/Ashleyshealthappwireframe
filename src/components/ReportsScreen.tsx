import { useState } from 'react';
import { FileText } from 'lucide-react';

export function ReportsScreen() {
  const [dateRange, setDateRange] = useState('3months');

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-neutral-900 mb-1">Reports</h1>
        <p className="text-sm text-neutral-600">Clinical summary for healthcare providers</p>
      </div>

      {/* Date Range */}
      <div className="mb-8">
        <label htmlFor="report-period" className="block text-xs text-neutral-600 uppercase tracking-wider mb-3">
          Report Period
        </label>
        <select
          id="report-period"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-neutral-300 text-base bg-white"
        >
          <option value="1month">Last 1 Month (1 Cycle)</option>
          <option value="3months">Last 3 Months (3 Cycles)</option>
          <option value="6months">Last 6 Months (6 Cycles)</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Generate Button */}
      <button className="w-full py-5 mb-8 border-2 border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700">
        <div className="flex items-center justify-center gap-3">
          <FileText className="w-5 h-5" />
          <span className="text-base">Generate PDF Report</span>
        </div>
      </button>

      {/* PDF Preview */}
      <div className="border-2 border-neutral-900 bg-white mb-8">
        <div className="border-b-2 border-neutral-300 p-4 bg-neutral-50">
          <div className="text-xs text-neutral-600 uppercase tracking-wider">Preview</div>
        </div>
        
        <div className="p-8 space-y-8" style={{ aspectRatio: '8.5/11' }}>
          {/* Report Header */}
          <div className="pb-6 border-b-2 border-neutral-900">
            <div className="text-xl text-neutral-900 mb-3">Health Summary Report</div>
            <div className="text-xs text-neutral-700 space-y-1">
              <div>Patient: [NAME]</div>
              <div>Period: October 7 – January 7, 2026 (3 cycles)</div>
              <div>Generated: January 7, 2026</div>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <div className="text-sm text-neutral-900 mb-2 pb-1 border-b border-neutral-300">
              Key Findings
            </div>
            <ul className="text-xs text-neutral-700 space-y-1">
              <li>• Peak nausea correlates with luteal phase (Days 20-24)</li>
              <li>• Average severity: 7.2/10 luteal vs 2.1/10 follicular</li>
              <li>• Constipation in 68% of luteal phase days</li>
              <li>• Medication reduces nausea by 3.4 pts avg</li>
            </ul>
          </div>

          {/* Symptom Heatmap Table */}
          <div>
            <div className="text-sm text-neutral-900 mb-2 pb-1 border-b border-neutral-300">
              Symptom Heatmap by Phase
            </div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-300">
                  <th className="text-left py-2 pr-2 text-neutral-600">Symptom</th>
                  <th className="text-center py-2 px-2 text-neutral-600">Menstrual</th>
                  <th className="text-center py-2 px-2 text-neutral-600">Follicular</th>
                  <th className="text-center py-2 px-2 text-neutral-600">Ovulatory</th>
                  <th className="text-center py-2 px-2 text-neutral-600">Luteal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 pr-2 text-neutral-900">Nausea</td>
                  <td className="text-center py-2 px-2">
                    <div className="bg-neutral-300 px-2 py-1 text-xs inline-block">MED</div>
                  </td>
                  <td className="text-center py-2 px-2">
                    <div className="bg-neutral-100 px-2 py-1 text-xs inline-block">LOW</div>
                  </td>
                  <td className="text-center py-2 px-2">
                    <div className="bg-neutral-100 px-2 py-1 text-xs inline-block">LOW</div>
                  </td>
                  <td className="text-center py-2 px-2">
                    <div className="bg-neutral-700 text-white px-2 py-1 text-xs inline-block">HIGH</div>
                  </td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 pr-2 text-neutral-900">Constipation</td>
                  <td className="text-center py-2 px-2">
                    <div className="bg-neutral-100 px-2 py-1 text-xs inline-block">LOW</div>
                  </td>
                  <td className="text-center py-2 px-2">
                    <div className="bg-neutral-100 px-2 py-1 text-xs inline-block">LOW</div>
                  </td>
                  <td className="text-center py-2 px-2">
                    <div className="bg-neutral-300 px-2 py-1 text-xs inline-block">MED</div>
                  </td>
                  <td className="text-center py-2 px-2">
                    <div className="bg-neutral-700 text-white px-2 py-1 text-xs inline-block">HIGH</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Medication Summary */}
          <div>
            <div className="text-sm text-neutral-900 mb-2 pb-1 border-b border-neutral-300">
              Medication Usage
            </div>
            <div className="text-xs text-neutral-700 space-y-1">
              <div>• Medication A: 42 doses (14 avg/cycle)</div>
              <div>• 78% of doses during luteal phase</div>
              <div>• Peak use: Days 20-24 of cycle</div>
            </div>
          </div>

          {/* Bowel Health */}
          <div>
            <div className="text-sm text-neutral-900 mb-2 pb-1 border-b border-neutral-300">
              Bowel Health (Bristol Scale)
            </div>
            <div className="flex gap-2 mb-2">
              <div className="flex-1 text-center">
                <div className="h-12 bg-neutral-400 flex items-end justify-center pb-1">
                  <span className="text-xs text-white">22%</span>
                </div>
                <div className="text-xs text-neutral-600 mt-1">Type 1-2</div>
              </div>
              <div className="flex-1 text-center">
                <div className="h-16 bg-neutral-500 flex items-end justify-center pb-1">
                  <span className="text-xs text-white">48%</span>
                </div>
                <div className="text-xs text-neutral-600 mt-1">Type 3-4</div>
              </div>
              <div className="flex-1 text-center">
                <div className="h-10 bg-neutral-300 flex items-end justify-center pb-1">
                  <span className="text-xs">30%</span>
                </div>
                <div className="text-xs text-neutral-600 mt-1">Type 5-7</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="py-3 border border-neutral-400 bg-white hover:bg-neutral-50">
          <span className="text-sm">Share Link</span>
        </button>
        <button className="py-3 border border-neutral-400 bg-white hover:bg-neutral-50">
          <span className="text-sm">Email PDF</span>
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 border border-neutral-300 bg-neutral-50">
        <div className="text-xs text-neutral-700">
          <strong>Clinical Use:</strong> This report preserves all timestamps and correlation data. Designed for diagnostic discussions with healthcare providers.
        </div>
      </div>
    </div>
  );
}