import mainBgUrl from '@assets/backgrounds/mainBg.svg?url';

const MainBg = () => {
  return (
    <div className="absolute inset-0 z-0">
      <img src={mainBgUrl} alt="main-bg" className="w-full h-full object-cover" />
    </div>
  );
};

export default MainBg;
