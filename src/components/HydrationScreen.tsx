import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Check, Coffee, Droplets } from 'lucide-react';

interface HydrationScreenProps {
  onNavigate: (screen: Screen) => void;
}

const quickAmounts = [4, 8, 12, 16, 20, 24];

export function HydrationScreen({ onNavigate }: HydrationScreenProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [drinkType, setDrinkType] = useState<'water' | 'other'>('water');
  const [wakeTime] = useState(new Date().setHours(7, 0, 0, 0));
  const [timeSinceWaking, setTimeSinceWaking] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const now = new Date().getTime();
    const diff = now - wakeTime;
    const minutes = Math.floor(diff / (1000 * 60));
    setTimeSinceWaking(minutes);
  }, [wakeTime]);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1000);
  };

  const formatTimeSinceWaking = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m since waking`;
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
        <h1 className="text-3xl text-slate-900">Hydration Tracker</h1>
        <p className="text-slate-600 mt-2">Log intake relative to wake time for better correlation</p>
      </div>

      {showSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl text-green-900 mb-2">Hydration Logged!</h2>
          <p className="text-green-700">Returning to dashboard...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Today's Progress */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-slate-900">Today's Hydration</h2>
              <div className="text-sm text-slate-600">{formatTimeSinceWaking(timeSinceWaking)}</div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Droplets className="w-8 h-8 text-blue-500" />
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl text-slate-900">48</span>
                  <span className="text-slate-600">/ 64 oz</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
            <div className="text-sm text-slate-600">Goal: 64 oz per day • 16 oz remaining</div>
          </div>

          {/* Drink Type */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg text-slate-900 mb-4">What are you drinking?</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDrinkType('water')}
                className={`p-4 border-2 rounded-lg ${
                  drinkType === 'water'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-3xl mb-2">💧</div>
                <div className="text-slate-900">Water</div>
              </button>
              <button
                onClick={() => setDrinkType('other')}
                className={`p-4 border-2 rounded-lg ${
                  drinkType === 'other'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-3xl mb-2">☕</div>
                <div className="text-slate-900">Other</div>
              </button>
            </div>
          </div>

          {/* Quick Amount Selection */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg text-slate-900 mb-4">How much? (oz)</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`py-4 px-6 border-2 rounded-lg text-lg ${
                    selectedAmount === amount
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {amount} oz
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Or enter custom amount
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg"
                />
                <div className="flex items-center px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-700">
                  oz
                </div>
              </div>
            </div>
          </div>

          {/* Timing */}
          {(selectedAmount || customAmount) && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg text-slate-900 mb-4">Timing Context</h2>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-900 mb-1">Wake Time</div>
                  <div className="text-blue-900">7:00 AM (assumed)</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Current Time</div>
                  <div className="text-slate-900">
                    {new Date().toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-900 mb-1">Time Since Waking</div>
                  <div className="text-purple-900">{formatTimeSinceWaking(timeSinceWaking)}</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                💡 Tracking relative to wake time helps identify patterns in symptoms and hydration timing
              </div>
            </div>
          )}

          {/* Submit */}
          {(selectedAmount || customAmount) && (
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg"
            >
              Log {selectedAmount || customAmount} oz
            </button>
          )}

          {/* Today's Log */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg text-slate-900 mb-4">Today's Intake</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-xl">💧</div>
                  <div>
                    <div className="text-slate-900">16 oz water</div>
                    <div className="text-sm text-slate-600">2:30 PM (7h 30m after waking)</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-xl">☕</div>
                  <div>
                    <div className="text-slate-900">12 oz coffee</div>
                    <div className="text-sm text-slate-600">11:00 AM (4h after waking)</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-xl">💧</div>
                  <div>
                    <div className="text-slate-900">20 oz water</div>
                    <div className="text-sm text-slate-600">8:30 AM (1h 30m after waking)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wireframe Note */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-900">
              <strong>Wireframe Note:</strong> Data stored as event_type='hydration', val_2={amount in oz}, ciphertext=[wake_time_offset: {timeSinceWaking} minutes]
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
