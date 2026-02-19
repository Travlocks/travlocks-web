import TemplateContent from '@/feature/search/TemplateContent';
import { useState } from 'react';
import SideBar from '@/feature/main_page/SideBar';

const TemplatePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  const handleCardClick = (templateId: number) => {
    setSelectedTemplateId(templateId);
    setIsSidebarOpen(true);
    console.log('Sidebar open for template:', templateId);
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto bg-base-color-5">
      <TemplateContent onCardClick={handleCardClick} />
      {isSidebarOpen && selectedTemplateId && (
        <SideBar templateId={selectedTemplateId} onClose={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default TemplatePage;
