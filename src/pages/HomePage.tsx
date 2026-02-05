import { HomeBackground } from '@/feature/home/components/HomeBackground';
import Draft from '@/feature/home/components/Draft';
import { Footer } from '@/shared/components/Footer/Footer';

const HomePage = () => {
  return (
    <div>
      <HomeBackground />
      <Draft />
      <Footer />
    </div>
  );
};

export default HomePage;
