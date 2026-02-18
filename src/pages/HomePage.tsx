import { HomeBackground } from '@/feature/home/components/HomeBackground';
import Draft from '@/feature/home/components/Draft';
import AITemplate from '@/feature/home/components/AITemplate';

const HomePage = () => {
  return (
    <div>
      <HomeBackground />

      <AITemplate />

      <Draft />
    </div>
  );
};

export default HomePage;
