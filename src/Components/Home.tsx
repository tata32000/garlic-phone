const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-garlic bg-cover flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-white-900">Garlic Phone 🧄</h1>
        <p className="text-xl text-gray-700 mt-4">Welcome to the "grate"st game! </p>
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a href="/create-game" className="no-underline text-white">
              Create Game
            </a>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a href="/join-game" className="no-underline text-white">
              Join Game
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
