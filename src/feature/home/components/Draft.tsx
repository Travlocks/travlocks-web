import clsx from 'clsx';
import DraftCard from './DraftCard';
import DraftEmptyCard from './DraftEmptyCard';
import useGetRecentTemplates from '../hooks/useQuery/useGetRecentTemplates';

const Draft = () => {
  const { data } = useGetRecentTemplates(); // 최근 편집 초안

  return (
    <section className="bg-base-color-5 py-[60px] flex justify-center">
      <div className="flex flex-col gap-[32px] max-w-[calc(589px*2+40px)] w-full">
        <h1 className="text-base-color-0 h1">최근 편집 초안</h1>

        <div className={clsx('flex gap-[40px] flex-wrap', data?.data?.length > 2 && 'justify-center')}>
          {data?.data?.length === 0 ? (
            <DraftEmptyCard />
          ) : (
            data?.data.map((template) => (
              <DraftCard
                key={template.id}
                title={template.title}
                region={template.regionName}
                progressRate={template.progressRate}
                updatedAt={template.updatedAt}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Draft;
