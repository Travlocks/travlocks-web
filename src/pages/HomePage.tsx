import { HomeBackground } from '@/feature/home/components/HomeBackground';
import Draft from '@/feature/home/components/Draft';
import AITemplate from '@/feature/home/components/AITemplate';
import PopularTemplate from '@/feature/home/components/PopularTemplate';

const HomePage = () => {
  return (
    <div>
      <HomeBackground />

      <AITemplate />
      <PopularTemplate />

      <Draft />
    </div>
  );
};

export default HomePage;
