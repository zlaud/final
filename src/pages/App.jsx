import "../styles/index.css";
import Feed from "../components/Feed";
const App = () => {
  return (
    <div className="w-full flex flex-col items-center pt-20">
      <h1 className="text-5xl text-center font-extrabold mt-5 text-transparent bg-gradient-to-r from-[#5A4956] via-[#9C7A97] to-[#5A4956] bg-clip-text">
        AI Prompts For You, From Others
      </h1>
      <h3 className="max-w-lg text-center m-5 font-medium text-lg">
        Get the most out of AI. Explore, Create, and Share Creative Prompts
        effortlessly to harness the true power of AI.
      </h3>
      <Feed />
    </div>
  );
};

export default App;
