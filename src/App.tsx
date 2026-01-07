import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { LogEventModal } from './components/LogEventModal';
import { TrendsScreen } from './components/TrendsScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BottomNav } from './components/BottomNav';

export type Screen = 'home' | 'trends' | 'reports' | 'settings';
export type EventType = 'nausea' | 'stool' | 'water' | 'medication' | 'symptom' | 'period-start' | 'period-end' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [eventType, setEventType] = useState<EventType>(null);

  const openLogModal = (type: EventType) => {
    setEventType(type);
    setLogModalOpen(true);
  };

  const closeLogModal = () => {
    setLogModalOpen(false);
    setEventType(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onOpenLog={openLogModal} />;
      case 'trends':
        return <TrendsScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen onOpenLog={openLogModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto border-x border-neutral-200">
      <div className="flex-1 overflow-auto">
        {renderScreen()}
      </div>
      
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      
      {logModalOpen && eventType && (
        <LogEventModal eventType={eventType} onClose={closeLogModal} />
      )}
    </div>
  );
}
