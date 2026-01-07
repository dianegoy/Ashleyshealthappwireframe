import { Screen } from '../App';
import { ArrowLeft, Download, FileText, Share2 } from 'lucide-react';

interface ReportScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ReportScreen({ onNavigate }: ReportScreenProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl text-slate-900">Doctor Report Generator</h1>
        <p className="text-slate-600 mt-2">One-page clinical summary with cycle-phase symptom heatmap</p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg text-slate-900 mb-4">Report Settings</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-700 mb-2">Time Period</label>
            <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
              <option>Last 3 Months (3 Cycles)</option>
              <option>Last 6 Months (6 Cycles)</option>
              <option>Last 12 Months (12 Cycles)</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-2">Include</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-slate-700">Symptom Heatmap</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-slate-700">Medication Adherence</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-slate-700">Bowel Health Summary</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl text-slate-900">Report Preview</h2>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Mock PDF Content */}
        <div className="border-2 border-slate-300 rounded-lg p-8 bg-white" style={{ aspectRatio: '8.5/11' }}>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl text-slate-900 mb-2">Health Summary Report</h1>
            <div className="text-sm text-slate-600">
              <div>Patient: Ashley</div>
              <div>Report Period: October 7, 2025 - January 7, 2026 (3 cycles)</div>
              <div>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="mb-6">
            <h2 className="text-lg text-slate-900 mb-3 pb-2 border-b border-slate-200">Key Findings</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Peak nausea intensity correlates with luteal phase (Days 20-24) across all 3 cycles</li>
              <li>• Average nausea severity: 7.2/10 during luteal phase vs 2.1/10 during follicular phase</li>
              <li>• Constipation (Bristol Type 1-2) occurs in 68% of luteal phase days</li>
              <li>• Medication effectiveness: Zofran reduces nausea by average of 3.4 points within 2 hours</li>
            </ul>
          </div>

          {/* Symptom Heatmap by Cycle Phase */}
          <div className="mb-6">
            <h2 className="text-lg text-slate-900 mb-3 pb-2 border-b border-slate-200">Symptom Heatmap by Cycle Phase</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-3 text-slate-700">Symptom</th>
                    <th className="text-center py-2 px-3 text-slate-700">Menstrual</th>
                    <th className="text-center py-2 px-3 text-slate-700">Follicular</th>
                    <th className="text-center py-2 px-3 text-slate-700">Ovulatory</th>
                    <th className="text-center py-2 px-3 text-slate-700">Luteal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3">Nausea</td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-yellow-200 rounded text-xs">Moderate</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-green-200 rounded text-xs">Low</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-green-200 rounded text-xs">Low</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-red-200 rounded text-xs">Severe</div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 px-3">Constipation</td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-green-200 rounded text-xs">Low</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-green-200 rounded text-xs">Low</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-yellow-200 rounded text-xs">Moderate</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-red-200 rounded text-xs">High</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">GI Pain</td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-yellow-200 rounded text-xs">Moderate</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-green-200 rounded text-xs">Low</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-green-200 rounded text-xs">Low</div>
                    </td>
                    <td className="text-center py-2 px-3">
                      <div className="inline-block px-3 py-1 bg-yellow-200 rounded text-xs">Moderate</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Medication Summary */}
          <div className="mb-6">
            <h2 className="text-lg text-slate-900 mb-3 pb-2 border-b border-slate-200">Medication Usage & Adherence</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-700 mb-2">Most Used PRN Medications:</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• Zofran 4mg: 42 doses (avg 14/cycle)</li>
                  <li>• Miralax 17g: 28 doses (avg 9.3/cycle)</li>
                  <li>• Colace 100mg: 18 doses (avg 6/cycle)</li>
                </ul>
              </div>
              <div>
                <div className="text-slate-700 mb-2">Timing Patterns:</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• 78% of Zofran doses taken during luteal phase</li>
                  <li>• Peak medication use: Days 20-24 of cycle</li>
                  <li>• Average time to relief: 1.8 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bowel Health */}
          <div>
            <h2 className="text-lg text-slate-900 mb-3 pb-2 border-b border-slate-200">Bowel Health Overview</h2>
            <div className="text-sm text-slate-700">
              <div className="mb-2">Bristol Scale Distribution (90 days):</div>
              <div className="flex gap-2 mb-3">
                <div className="flex-1 text-center">
                  <div className="h-16 bg-orange-300 rounded-t flex items-end justify-center pb-2" style={{ height: '64px' }}>
                    <span className="text-xs">22%</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Type 1-2</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="h-20 bg-green-300 rounded-t flex items-end justify-center pb-2" style={{ height: '80px' }}>
                    <span className="text-xs">48%</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Type 3-4</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="h-12 bg-yellow-300 rounded-t flex items-end justify-center pb-2" style={{ height: '48px' }}>
                    <span className="text-xs">30%</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Type 5-7</div>
                </div>
              </div>
              <div className="text-slate-600 text-xs">
                Note: Constipation episodes (Type 1-2) concentrated in luteal phase, suggesting hormone-related GI motility changes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div className="flex-1">
            <h3 className="text-lg text-purple-900 mb-2">Clinical Insights</h3>
            <p className="text-sm text-purple-800 mb-4">
              This report is designed for healthcare providers and includes clinically relevant correlations between hormonal cycles, symptoms, and medication effectiveness. All timestamps are preserved to support diagnostic discussions.
            </p>
            <div className="text-sm text-purple-700">
              <strong>Suggested Actions:</strong> Discuss progesterone-related GI symptoms with your gastroenterologist or OB/GYN. Consider timing adjustments for preventive medications during luteal phase.
            </div>
          </div>
        </div>
      </div>

      {/* Wireframe Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-900">
          <strong>Wireframe Note:</strong> PDF generation will aggregate data from health_events table, grouped by cycle phases (from cycles table). Heatmaps calculated from val_1 averages per phase. Target: &lt;30 second generation time.
        </div>
      </div>
    </div>
  );
}
