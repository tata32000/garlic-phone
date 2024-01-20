const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-900">Home</h1>
        <p className="text-xl text-gray-700 mt-4">This is the home page</p>
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