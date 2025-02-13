// components/HomePageTitle.tsx

const HomePageTitle = () => {
  return (
    <div
      className="relative text-center py-16 bg-cover bg-center"
      style={{
        // TODO: Add background image path here
        backgroundImage: "url('/jkt48-background.jpg')"
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative">
        <h1 className="text-5xl font-bold text-white shadow-md">
          Welcome to JKT48 Fanbase Merchandise Store
        </h1>
        <p className="text-xl text-white mt-4 shadow-md">
          Please check out our merch
        </p>
      </div>
    </div>
  );
};

export default HomePageTitle;
