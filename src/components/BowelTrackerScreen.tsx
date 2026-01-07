import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Check } from 'lucide-react';

interface BowelTrackerScreenProps {
  onNavigate: (screen: Screen) => void;
}

const bristolTypes = [
  {
    type: 1,
    name: 'Separate hard lumps',
    description: 'Like nuts (hard to pass)',
    emoji: '🟤',
    severity: 'Severe Constipation'
  },
  {
    type: 2,
    name: 'Sausage-shaped but lumpy',
    description: 'Lumpy and firm',
    emoji: '🟤🟤',
    severity: 'Mild Constipation'
  },
  {
    type: 3,
    name: 'Like a sausage with cracks',
    description: 'Formed but with surface cracks',
    emoji: '🌭',
    severity: 'Normal'
  },
  {
    type: 4,
    name: 'Smooth and soft',
    description: 'Like a sausage or snake, smooth',
    emoji: '✨',
    severity: 'Normal'
  },
  {
    type: 5,
    name: 'Soft blobs',
    description: 'Soft blobs with clear-cut edges',
    emoji: '💧',
    severity: 'Lacking Fiber'
  },
  {
    type: 6,
    name: 'Fluffy pieces',
    description: 'Mushy with ragged edges',
    emoji: '💦',
    severity: 'Mild Diarrhea'
  },
  {
    type: 7,
    name: 'Watery',
    description: 'Entirely liquid, no solid pieces',
    emoji: '🌊',
    severity: 'Severe Diarrhea'
  }
];

export function BowelTrackerScreen({ onNavigate }: BowelTrackerScreenProps) {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [hasPain, setHasPain] = useState(false);
  const [painLevel, setPainLevel] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl text-slate-900">Bowel Tracker</h1>
        <p className="text-slate-600 mt-2">Bristol Stool Scale - One-tap logging</p>
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
        <div className="space-y-6">
          {/* Bristol Scale Selection */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg text-slate-900 mb-6">Select Bristol Stool Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bristolTypes.map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSelectedType(item.type)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    selectedType === item.type
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{item.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg text-slate-900">Type {item.type}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.type <= 2 ? 'bg-orange-100 text-orange-700' :
                          item.type <= 4 ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.severity}
                        </span>
                      </div>
                      <div className="text-sm text-slate-900 mb-1">{item.name}</div>
                      <div className="text-xs text-slate-600">{item.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pain Indicator */}
          {selectedType && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg text-slate-900 mb-4">Any Pain?</h2>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => {
                    setHasPain(false);
                    setPainLevel(0);
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg border-2 ${
                    !hasPain
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  No Pain
                </button>
                <button
                  onClick={() => setHasPain(true)}
                  className={`flex-1 py-3 px-6 rounded-lg border-2 ${
                    hasPain
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Pain Present
                </button>
              </div>

              {hasPain && (
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Pain Level
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={painLevel}
                    onChange={(e) => setPainLevel(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-slate-600 mt-2">
                    <span>Mild</span>
                    <span className="text-lg text-slate-900">{painLevel}/10</span>
                    <span>Severe</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Timestamp */}
          {selectedType && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
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
                </div>
                <button className="text-sm text-purple-600 hover:text-purple-700">
                  Edit
                </button>
              </div>
            </div>
          )}

          {/* Submit */}
          {selectedType && (
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg"
            >
              Log Bowel Movement
            </button>
          )}

          {/* Wireframe Note */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-900">
              <strong>Wireframe Note:</strong> Data stored as event_type='gi', val_1={selectedType}, ciphertext=[encrypted pain data]. Example from your schema: "No pain, just hard" for Type 1.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
