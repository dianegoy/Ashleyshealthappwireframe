import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Check } from 'lucide-react';

interface QuickLogScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function QuickLogScreen({ onNavigate }: QuickLogScreenProps) {
  const [nauseaLevel, setNauseaLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl text-slate-900">Quick Symptom Log</h1>
        <p className="text-slate-600 mt-2">Record symptoms in under 15 seconds</p>
      </div>

      {showSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl text-green-900 mb-2">Logged Successfully!</h2>
          <p className="text-green-700">Returning to dashboard...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          {/* Nausea Level */}
          <div className="mb-8">
            <label className="block text-lg text-slate-900 mb-4">
              How intense is your nausea right now?
            </label>
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="10"
                value={nauseaLevel}
                onChange={(e) => setNauseaLevel(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>No Nausea</span>
              <span className="text-2xl text-slate-900">{nauseaLevel}</span>
              <span>Severe</span>
            </div>
            <div className="text-center text-4xl mt-4">
              {nauseaLevel === 0 && '😊'}
              {nauseaLevel > 0 && nauseaLevel <= 3 && '😐'}
              {nauseaLevel > 3 && nauseaLevel <= 6 && '😟'}
              {nauseaLevel > 6 && nauseaLevel <= 8 && '🤢'}
              {nauseaLevel > 8 && '🤮'}
            </div>
          </div>

          {/* Quick Context Buttons */}
          <div className="mb-8">
            <label className="block text-sm text-slate-700 mb-3">
              Quick Context (Optional)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
                After Eating
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
                Morning
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
                Evening
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
                Before Meds
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
                After Meds
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
                Exercise
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="block text-sm text-slate-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional context..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg resize-none"
              rows={3}
            />
          </div>

          {/* Timestamp */}
          <div className="mb-8 p-4 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Timestamp</div>
            <div className="text-slate-900">
              {new Date().toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 mt-2">
              Edit timestamp
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg"
          >
            Log Symptom
          </button>
        </div>
      )}

      {/* Wire frame note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-900">
          <strong>Wireframe Note:</strong> In the production app, this data will be encrypted and synced to Supabase with the schema: event_type='symptom', val_1={nauseaLevel}, ciphertext=[encrypted notes]
        </div>
      </div>
    </div>
  );
}
