import DraftCard from './DraftCard';

const TEMPLATES = [
  {
    templateId: 12,
    title: '강원도 겨울 바다 여행',
    region: '강원도',
    progressRate: 85,
    updatedAt: '2026-01-07',
  },
  {
    templateId: 13,
    title: '제주도 3박 4일 여행',
    region: '제주도',
    progressRate: 100,
    updatedAt: '2026-01-07',
  },
];

const Draft = () => {
  return (
    <section className="bg-base-color-5 py-[60px] flex justify-center">
      <div className="flex flex-col gap-[32px] max-w-[calc(589px*2+40px)] w-full">
        <h1 className="text-base-color-0 h1">최근 편집 초안</h1>

        <div className="flex gap-[40px] flex-wrap justify-center">
          {TEMPLATES.map((template) => (
            <DraftCard
              key={template.templateId}
              title={template.title}
              region={template.region}
              progressRate={template.progressRate}
              updatedAt={template.updatedAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Draft;
