import DayCard from './components/DayCard';

const TravelData = {
  destinationCityIds: [301, 302],
  trip: {
    days: 3,
    nights: 2,
  },
  transportTypes: ['WALK', 'TRANSIT'],
  travelThemeIds: [1, 2, 3],
};

const BlockTimeLine = () => {
  const { days } = TravelData.trip; // 여행 일수

  return (
    <div className="relative w-full h-full bg-[#F8FAFC]">
      <div className="h-[79px] bg-base-color-6 border-b border-base-color py-[23px] px-[30px] flex items-center">
        <p className="h4">Timeline</p>
      </div>

      <div className="py-[65px] px-[49px] flex gap-[40px] overflow-scroll h-full">
        {Array.from({ length: days }, (_, i) => (
          <DayCard key={i} day={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default BlockTimeLine;
