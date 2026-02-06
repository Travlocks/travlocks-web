import clsx from 'clsx';
import ActivityCard from './ActivityCard';

interface LocationActivity {
  id: string;
  title: string;
  location: string;
  date: string;
}

interface TemplateActivity {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
}

interface LocationActivityListProps {
  sectionTitle: string;
  activities: LocationActivity[];
  className?: string;
  showStar?: false;
  onToggleFavorite?: never;
}

interface TemplateActivityListProps {
  sectionTitle: string;
  activities: TemplateActivity[];
  className?: string;
  showStar: true;
  onToggleFavorite?: (id: string) => void;
}

type ActivityListProps = LocationActivityListProps | TemplateActivityListProps;

const ActivityList = ({ sectionTitle, activities, className, showStar, onToggleFavorite }: ActivityListProps) => {
  return (
    <div className={clsx('p-9 bg-base-color-6 border border-base-color rounded-[10px]', className)}>
      <h3 className="h5 text-base-color-0 mb-8.5">{sectionTitle}</h3>
      <div className="flex flex-col gap-5">
        {showStar
          ? (activities as TemplateActivity[]).map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                showStar
                isFavorite={activity.isFavorite}
                onToggleFavorite={() => onToggleFavorite?.(activity.id)}
              />
            ))
          : (activities as LocationActivity[]).map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                location={activity.location}
                date={activity.date}
              />
            ))}
      </div>
    </div>
  );
};

export default ActivityList;
