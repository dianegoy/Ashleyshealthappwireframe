import { useState } from 'react';
import { EventType } from '../App';
import { X } from 'lucide-react';

interface LogEventModalProps {
  eventType: EventType;
  onClose: () => void;
}

export function LogEventModal({ eventType, onClose }: LogEventModalProps) {
  const [nauseaLevel, setNauseaLevel] = useState(5);
  const [selectedBristol, setSelectedBristol] = useState<number | null>(null);
  const [hasPain, setHasPain] = useState(false);
  const [waterAmount, setWaterAmount] = useState<number | null>(null);

  const handleSave = () => {
    // In real app: save to encrypted local DB
    onClose();
  };

  const renderContent = () => {
    switch (eventType) {
      case 'nausea':
        return (
          <>
            <h2 className="text-xl text-neutral-900 mb-6">Log Nausea</h2>
            
            <div className="mb-8">
              <label className="block text-sm text-neutral-700 mb-4">
                Intensity (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={nauseaLevel}
                onChange={(e) => setNauseaLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-neutral-600">
                <span>1</span>
                <span className="text-2xl text-neutral-900">{nauseaLevel}</span>
                <span>10</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm text-neutral-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                placeholder="Context or triggers..."
                className="w-full px-4 py-3 border border-neutral-300 text-sm resize-none"
                rows={3}
              />
            </div>

            <div className="mb-6 p-4 bg-neutral-100 border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Timestamp</div>
              <div className="text-sm text-neutral-900">Now · 8:47 PM</div>
            </div>
          </>
        );

      case 'stool':
        return (
          <>
            <h2 className="text-xl text-neutral-900 mb-6">Log Stool</h2>
            
            <div className="mb-8">
              <label className="block text-sm text-neutral-700 mb-4">
                Bristol Stool Scale
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBristol(type)}
                    className={`py-3 px-4 border text-left text-sm ${
                      selectedBristol === type
                        ? 'border-neutral-900 bg-neutral-100'
                        : 'border-neutral-300 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    Type {type} — {getBristolLabel(type)}
                  </button>
                ))}
              </div>
            </div>

            {selectedBristol && (
              <>
                <div className="mb-6">
                  <label className="block text-sm text-neutral-700 mb-3">
                    Pain?
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHasPain(false)}
                      className={`flex-1 py-3 border ${
                        !hasPain
                          ? 'border-neutral-900 bg-neutral-100'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      <span className="text-sm">No</span>
                    </button>
                    <button
                      onClick={() => setHasPain(true)}
                      className={`flex-1 py-3 border ${
                        hasPain
                          ? 'border-neutral-900 bg-neutral-100'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      <span className="text-sm">Yes</span>
                    </button>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-neutral-100 border border-neutral-200">
                  <div className="text-xs text-neutral-500 mb-1">Timestamp</div>
                  <div className="text-sm text-neutral-900">Now · 8:47 PM</div>
                </div>
              </>
            )}
          </>
        );

      case 'water':
        return (
          <>
            <h2 className="text-xl text-neutral-900 mb-6">Log Water</h2>
            
            <div className="mb-8">
              <label className="block text-sm text-neutral-700 mb-4">
                Quick Add
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setWaterAmount(8)}
                  className={`py-6 border-2 ${
                    waterAmount === 8
                      ? 'border-neutral-900 bg-neutral-100'
                      : 'border-neutral-400 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <div className="text-2xl text-neutral-900">+8</div>
                  <div className="text-xs text-neutral-600 mt-1">oz</div>
                </button>
                <button
                  onClick={() => setWaterAmount(16)}
                  className={`py-6 border-2 ${
                    waterAmount === 16
                      ? 'border-neutral-900 bg-neutral-100'
                      : 'border-neutral-400 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <div className="text-2xl text-neutral-900">+16</div>
                  <div className="text-xs text-neutral-600 mt-1">oz</div>
                </button>
              </div>
            </div>

            {waterAmount && (
              <div className="mb-6 p-4 bg-neutral-100 border border-neutral-200">
                <div className="text-xs text-neutral-500 mb-2">Auto-tracked</div>
                <div className="text-sm text-neutral-900 mb-1">Time: Now · 8:47 PM</div>
                <div className="text-sm text-neutral-900">7h 47m since waking (7:00 AM)</div>
              </div>
            )}
          </>
        );

      case 'medication':
        return (
          <>
            <h2 className="text-xl text-neutral-900 mb-6">Log Medication</h2>
            
            <div className="mb-6">
              <label className="block text-sm text-neutral-700 mb-3">
                Quick Select
              </label>
              <div className="space-y-2">
                <button className="w-full py-3 px-4 border border-neutral-300 bg-white text-left text-sm hover:bg-neutral-50">
                  Medication A
                </button>
                <button className="w-full py-3 px-4 border border-neutral-300 bg-white text-left text-sm hover:bg-neutral-50">
                  Medication B
                </button>
                <button className="w-full py-3 px-4 border border-neutral-300 bg-white text-left text-sm hover:bg-neutral-50">
                  Medication C
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-neutral-700 mb-2">
                Or Enter Custom
              </label>
              <input
                type="text"
                placeholder="Medication name"
                className="w-full px-4 py-3 border border-neutral-300 text-sm mb-2"
              />
              <input
                type="text"
                placeholder="Dosage (e.g., 4mg)"
                className="w-full px-4 py-3 border border-neutral-300 text-sm"
              />
            </div>

            <div className="mb-6 p-4 bg-neutral-100 border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Timestamp</div>
              <div className="text-sm text-neutral-900">Now · 8:47 PM</div>
            </div>
          </>
        );

      case 'symptom':
        return (
          <>
            <h2 className="text-xl text-neutral-900 mb-6">Log Symptom</h2>
            
            <div className="mb-6">
              <label className="block text-sm text-neutral-700 mb-3">
                Symptom Type
              </label>
              <select className="w-full px-4 py-3 border border-neutral-300 text-sm">
                <option>Select symptom...</option>
                <option>Headache</option>
                <option>Fatigue</option>
                <option>Bloating</option>
                <option>Cramping</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-neutral-700 mb-3">
                Intensity (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="5"
                className="w-full h-2 bg-neutral-200 appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-6 p-4 bg-neutral-100 border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Timestamp</div>
              <div className="text-sm text-neutral-900">Now · 8:47 PM</div>
            </div>
          </>
        );

      case 'period-start':
        return (
          <>
            <h2 className="text-xl text-neutral-900 mb-6">Period Start</h2>
            
            <div className="mb-8 p-4 bg-neutral-100 border border-neutral-200">
              <div className="text-sm text-neutral-900 mb-4">
                Mark the start of your menstrual cycle
              </div>
              <div className="text-xs text-neutral-500 mb-1">Date</div>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-neutral-300 text-sm"
              />
            </div>
          </>
        );

      case 'period-end':
        return (
          <>
            <h2 className="text-xl text-neutral-900 mb-6">Period End</h2>
            
            <div className="mb-8 p-4 bg-neutral-100 border border-neutral-200">
              <div className="text-sm text-neutral-900 mb-4">
                Mark the end of your menstrual cycle
              </div>
              <div className="text-xs text-neutral-500 mb-1">Date</div>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-neutral-300 text-sm"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md border-t-4 border-neutral-900" style={{ maxHeight: '90vh' }}>
        <div className="overflow-y-auto" style={{ maxHeight: '90vh' }}>
          <div className="p-6">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-neutral-100 rounded"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-neutral-600" />
            </button>

            {/* Content */}
            {renderContent()}

            {/* Actions */}
            <div className="flex gap-4 pt-8 border-t border-neutral-300 mt-8">
              <button
                onClick={onClose}
                className="flex-1 py-4 border-2 border-neutral-400 bg-white hover:bg-neutral-50 active:bg-neutral-100"
                aria-label="Cancel"
              >
                <span className="text-base">Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-4 border-2 border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700"
                aria-label="Save entry"
              >
                <span className="text-base">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getBristolLabel(type: number): string {
  const labels = {
    1: 'Separate hard lumps',
    2: 'Lumpy and sausage-like',
    3: 'Sausage with cracks',
    4: 'Smooth, soft sausage',
    5: 'Soft blobs',
    6: 'Mushy consistency',
    7: 'Watery, no solids'
  };
  return labels[type as keyof typeof labels] || '';
}