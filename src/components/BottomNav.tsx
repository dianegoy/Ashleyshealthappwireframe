import { Screen } from '../App';
import { Home, TrendingUp, FileText, Settings } from 'lucide-react';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const NAV_ITEMS = [
  { id: 'home' as const, label: 'Home', Icon: Home },
  { id: 'trends' as const, label: 'Trends', Icon: TrendingUp },
  { id: 'reports' as const, label: 'Reports', Icon: FileText },
  { id: 'settings' as const, label: 'Settings', Icon: Settings },
];

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="border-t-2 border-border bg-background"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="grid grid-cols-4">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = currentScreen === id;

          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={[
                'py-4 flex flex-col items-center gap-1.5 border-b-4 transition-colors',
                isActive
                  ? 'bg-muted border-primary'
                  : 'bg-background border-transparent hover:bg-accent',
              ].join(' ')}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              type="button"
            >
              <Icon
                className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              />
              <span className={`text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
