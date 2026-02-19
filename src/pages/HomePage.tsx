import { HomeBackground } from '@/feature/home/components/HomeBackground';
import Draft from '@/feature/home/components/Draft';
import AITemplate from '@/feature/home/components/AITemplate';
import PopularTemplate from '@/feature/home/components/PopularTemplate';
import { useState } from 'react';
import SideBar from '@/feature/main_page/SideBar';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  const handleCardClick = (templateId: number) => {
    setSelectedTemplateId(templateId);
    setIsSidebarOpen(true);
  };

  return (
    <div>
      <HomeBackground />

      <AITemplate onCardClick={handleCardClick} />
      <PopularTemplate onCardClick={handleCardClick} />

      <Draft />

      {isSidebarOpen && selectedTemplateId && (
        <SideBar templateId={selectedTemplateId} onClose={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
