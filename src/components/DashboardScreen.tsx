import { Screen } from '../App';
import { Activity, Calendar, FileText, Menu, Plus } from 'lucide-react';
import { CycleOverlayChart } from './CycleOverlayChart';

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl text-slate-900">Ashley's Health Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">User: Ashley (Admin)</span>
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-slate-900">Quick Log (15-Second Entry)</h2>
            <button
              onClick={() => onNavigate('quicklog')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Entry
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => onNavigate('bowel')}
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="text-3xl mb-2">💩</div>
              <div className="text-sm text-slate-700">Bowel</div>
            </button>
            
            <button
              onClick={() => onNavigate('medication')}
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="text-3xl mb-2">💊</div>
              <div className="text-sm text-slate-700">Medication</div>
            </button>
            
            <button
              onClick={() => onNavigate('hydration')}
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="text-3xl mb-2">💧</div>
              <div className="text-sm text-slate-700">Hydration</div>
            </button>
            
            <button
              onClick={() => onNavigate('quicklog')}
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="text-3xl mb-2">🤢</div>
              <div className="text-sm text-slate-700">Nausea</div>
            </button>
          </div>
        </div>

        {/* Current Cycle Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg text-slate-900">Current Cycle</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-slate-600 mb-1">Phase</div>
              <div className="text-xl text-slate-900">Luteal</div>
              <div className="text-xs text-slate-500 mt-1">Day 21 of 28</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Started</div>
              <div className="text-xl text-slate-900">Dec 18, 2025</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Expected Period</div>
              <div className="text-xl text-slate-900">Jan 15, 2026</div>
            </div>
          </div>
        </div>

        {/* Cycle Overlay Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg text-slate-900">Cycle Overlay: Hormones & Symptoms</h2>
            <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm">
              <option>Last 28 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <CycleOverlayChart />
        </div>

        {/* Generate Report */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg text-slate-900 mb-2">Doctor Report</h2>
              <p className="text-sm text-slate-600">Generate a one-page clinical summary with cycle-phase symptom heatmap</p>
            </div>
            <button
              onClick={() => onNavigate('report')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
