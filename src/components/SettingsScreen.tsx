import {
  Lock,
  AlertTriangle,
  Users,
  Download,
} from "lucide-react";

export function SettingsScreen() {
  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-neutral-900 mb-1">
          Settings
        </h1>
        <p className="text-sm text-neutral-600">
          Privacy, security, and data control
        </p>
      </div>

      {/* Security */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-4 h-4 text-neutral-700" />
          <h2 className="text-xs text-neutral-700 uppercase tracking-wider">
            Security
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-neutral-200">
            <div>
              <div className="text-base text-neutral-900 mb-1">
                Face ID / Touch ID
              </div>
              <div className="text-xs text-neutral-600">
                Unlock with biometrics
              </div>
            </div>
            <label
              className="relative inline-block w-14 h-7"
              aria-label="Toggle biometric unlock"
            >
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-neutral-300 peer-checked:bg-neutral-900 rounded-full peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-neutral-200">
            <div>
              <div className="text-base text-neutral-900 mb-1">
                PIN Lock
              </div>
              <div className="text-xs text-neutral-600">
                Require PIN on app open
              </div>
            </div>
            <label
              className="relative inline-block w-14 h-7"
              aria-label="Toggle PIN lock"
            >
              <input type="checkbox" className="sr-only peer" />
              <div className="w-14 h-7 bg-neutral-300 peer-checked:bg-neutral-900 rounded-full peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
            </label>
          </div>

          <button className="w-full py-4 px-4 border-2 border-neutral-400 bg-white text-left hover:bg-neutral-50 active:bg-neutral-100">
            <div className="text-base text-neutral-900">
              Change PIN
            </div>
          </button>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-4 h-4 text-neutral-700" />
          <h2 className="text-xs text-neutral-700 uppercase tracking-wider">
            Connected Users
          </h2>
        </div>

        <div className="space-y-3 mb-4">
          <div className="p-4 border-2 border-neutral-300 bg-neutral-50">
            <div className="flex items-center justify-between mb-2">
              <div className="text-base text-neutral-900">
                User 1 (You)
              </div>
              <div className="text-xs text-neutral-700 px-3 py-1 bg-neutral-200 border border-neutral-400">
                ADMIN
              </div>
            </div>
            <div className="text-xs text-neutral-600">
              Full access · Can log and view all data
            </div>
          </div>

          <div className="p-4 border-2 border-neutral-300 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="text-base text-neutral-900">
                User 2
              </div>
              <div className="text-xs text-neutral-700 px-3 py-1 bg-white border border-neutral-400">
                CONTRIBUTOR
              </div>
            </div>
            <div className="text-xs text-neutral-600">
              Can log entries · View trends
            </div>
          </div>
        </div>

        <button className="w-full py-4 px-4 border-2 border-neutral-400 bg-white hover:bg-neutral-50 active:bg-neutral-100">
          <span className="text-base">
            + Invite Another User
          </span>
        </button>
      </div>

      {/* Data Export */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Download className="w-4 h-4 text-neutral-700" />
          <h2 className="text-xs text-neutral-700 uppercase tracking-wider">
            Data Export
          </h2>
        </div>

        <button className="w-full py-4 px-4 border-2 border-neutral-400 bg-white hover:bg-neutral-50 active:bg-neutral-100 mb-4">
          <div className="text-base text-neutral-900">
            Export All Data (JSON)
          </div>
        </button>

        <div className="p-4 border border-neutral-300 bg-neutral-50">
          <div className="text-xs text-neutral-700">
            Your data is encrypted locally and synced to your
            private Supabase instance. No third-party analytics.
            You own your data.
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="border-t-2 border-neutral-900 pt-10">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-4 h-4 text-neutral-900" />
          <h2 className="text-xs text-neutral-900 uppercase tracking-wider">
            Emergency Actions
          </h2>
        </div>

        <div className="p-6 border-2 border-neutral-900 bg-neutral-50 mb-4">
          <div className="text-sm text-neutral-900 mb-4">
            <strong>Warning:</strong> This will permanently
            delete all local data and remove synced cloud data.
            This action cannot be undone.
          </div>
          <button className="w-full py-4 px-4 border-2 border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700">
            <span className="text-base">Wipe All Data</span>
          </button>
        </div>

        <div className="text-xs text-neutral-600">
          Use this only in emergency situations where data
          security has been compromised.
        </div>
      </div>

      {/* App Info */}
      <div className="mt-10 pt-6 border-t border-neutral-200">
        <div className="text-xs text-neutral-600 space-y-1.5">
          <div>Version 1.0.0</div>
          <div>Last sync: 2 min ago</div>
          <div>Local storage: 12.4 MB encrypted</div>
        </div>
      </div>
    </div>
  );
}