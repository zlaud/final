import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [sortInput, setSortInput] = useState("created_at");

  useEffect(() => {
    const readPrompts = async () => {
      const { data } = await supabase
        .from("prompts")
        .select()
        .order(sortInput, { ascending: false });
      setPrompts(data);
    };
    readPrompts();
  }, [sortInput]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    let filteredData = prompts.filter((prompt) =>
      (prompt.category?.toLowerCase() || "").includes(searchValue.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const handleSort = (event) => {
    setSortInput(event.target.value);
  };

  const updateLike = async (event, id) => {
    event.stopPropagation();
    const promptToUpdate = prompts.find((prompt) => prompt.id === id);
    const updatedLikes = promptToUpdate.like_count + 1;
    await supabase
      .from("prompts")
      .update({
        like_count: updatedLikes,
      })
      .eq("id", id);
    const { data } = await supabase
      .from("prompts")
      .select()
      .order(sortInput, { ascending: false });
    setPrompts(data);
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by category..."
          onChange={(inputString) => searchItems(inputString.target.value)}
          className="rounded-3xl px-5 py-2 m-5 bg-transparent border-2 border-[#9C7A97] w-[32rem]"
        />
      </div>
      <div className="container px-10 m-3">
        <label htmlFor="sort">
          Sort by:
          <select
            id="sort"
            name="sort"
            onChange={handleSort}
            className="bg-white rounded-md p-1 m-1"
          >
            <option value="created_at">Newest</option>
            <option value="like_count">Popularity</option>
          </select>
        </label>
      </div>
      <div className="container flex flex-wrap justify-start mb-7 px-10">
        {prompts &&
          (searchInput.length > 0 ? filtered : prompts).map((prompt) => (
            <div
              className="flex flex-col flex-wrap border rounded-lg p-3 bg-white drop-shadow-md bg-opacity-60 m-2 h-56 w-[48%]"
              key={prompt.id}
            >
              <Link to={`/${prompt.id}`}>
                <div className="flex justify-between py-1">
                  <h4 className="text-[#5A4956]">{prompt.user}</h4>
                  <div className="flex items-center">
                    <h4 className="text-neutral-500 text-sm mx-1">
                      {new Date(prompt.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </h4>
                    <h4 className="text-neutral-500 text-sm">
                      {new Date(prompt.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h4>
                  </div>
                </div>

                <h2 className="text-[#161316]">
                  {prompt.prompt.length > 50
                    ? prompt.prompt.split(" ").slice(0, 50).join(" ") + "..."
                    : prompt.prompt}
                </h2>
              </Link>
              <div className="mt-auto flex justify-between items-end">
                <h3 className="border px-2 my-2 text-center text-sm text-[#9C7A97] bg-white bg-opacity-70 rounded-lg">
                  {prompt.category}
                </h3>
                <div className="flex my-2">
                  <img
                    src="/heart.png"
                    alt="like"
                    onClick={() => updateLike(event, prompt.id)}
                    className="cursor-pointer"
                  />
                  <h3 className="mx-2 text-sm text-neutral-500">
                    {prompt.like_count}
                  </h3>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feed;
