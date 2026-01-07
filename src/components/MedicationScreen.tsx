import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Check, Plus } from 'lucide-react';

interface MedicationScreenProps {
  onNavigate: (screen: Screen) => void;
}

const commonMedications = [
  { name: 'Zofran', dosage: '4mg', category: 'Anti-nausea' },
  { name: 'Phenergan', dosage: '25mg', category: 'Anti-nausea' },
  { name: 'Reglan', dosage: '10mg', category: 'Anti-nausea' },
  { name: 'Miralax', dosage: '17g', category: 'Laxative' },
  { name: 'Colace', dosage: '100mg', category: 'Stool Softener' },
];

export function MedicationScreen({ onNavigate }: MedicationScreenProps) {
  const [selectedMed, setSelectedMed] = useState<string | null>(null);
  const [customMed, setCustomMed] = useState('');
  const [dosage, setDosage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl text-slate-900">Medication Log</h1>
        <p className="text-slate-600 mt-2">Track PRN medications for symptom correlation</p>
      </div>

      {showSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl text-green-900 mb-2">Medication Logged!</h2>
          <p className="text-green-700">This will appear as a marker on your symptom graphs</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Selection */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg text-slate-900 mb-4">Quick Select (Common PRN Meds)</h2>
            <div className="grid grid-cols-1 gap-3">
              {commonMedications.map((med) => (
                <button
                  key={med.name}
                  onClick={() => {
                    setSelectedMed(med.name);
                    setDosage(med.dosage);
                    setCustomMed('');
                  }}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    selectedMed === med.name
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-900 mb-1">{med.name}</div>
                      <div className="text-sm text-slate-600">{med.dosage} • {med.category}</div>
                    </div>
                    <div className="text-2xl">💊</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Or Custom Entry */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg text-slate-900 mb-4">Or Enter Custom Medication</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Medication Name
                </label>
                <input
                  type="text"
                  value={customMed}
                  onChange={(e) => {
                    setCustomMed(e.target.value);
                    setSelectedMed(null);
                  }}
                  placeholder="Enter medication name..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Dosage
                </label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g., 4mg, 10ml..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Timing Context */}
          {(selectedMed || customMed) && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg text-slate-900 mb-4">When did you take it?</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-3 border-2 border-purple-500 bg-purple-50 rounded-lg text-sm">
                  Just Now
                </button>
                <button className="px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
                  Custom Time
                </button>
              </div>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
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
            </div>
          )}

          {/* Submit */}
          {(selectedMed || customMed) && dosage && (
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg"
            >
              Log Medication
            </button>
          )}

          {/* Recent Medications */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg text-slate-900 mb-4">Recent Medications (Last 24 Hours)</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="text-slate-900">Zofran 4mg</div>
                  <div className="text-sm text-slate-600">Today at 2:30 PM</div>
                </div>
                <div className="text-sm text-purple-600">6 hours ago</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="text-slate-900">Miralax 17g</div>
                  <div className="text-sm text-slate-600">Today at 8:00 AM</div>
                </div>
                <div className="text-sm text-purple-600">12 hours ago</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="text-slate-900">Zofran 4mg</div>
                  <div className="text-sm text-slate-600">Yesterday at 10:15 PM</div>
                </div>
                <div className="text-sm text-purple-600">20 hours ago</div>
              </div>
            </div>
          </div>

          {/* Wireframe Note */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-900">
              <strong>Wireframe Note:</strong> Medications stored as event_type='medication', val_2={dosage}, label={med_name}. These appear as markers on the symptom correlation graphs.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
