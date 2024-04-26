import { supabase } from "../client";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Comments from "../components/Comments";

const ViewPrompt = () => {
  const [prompt, setPrompt] = useState([]);
  const [secret, setSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const readPrompt = async () => {
      const { data } = await supabase
        .from("prompts")
        .select()
        .eq("id", id)
        .single();
      setPrompt(data);
    };
    readPrompt();
  }, []);

  const updateLike = async (event, id) => {
    event.stopPropagation();
    const updatedLikes = prompt.like_count + 1;
    await supabase
      .from("prompts")
      .update({
        like_count: updatedLikes,
      })
      .eq("id", id);
    const { data } = await supabase
      .from("prompts")
      .select()
      .eq("id", id)
      .single();
    setPrompt(data);
  };

  const handleSecret = (event) => {
    setSecret(event.target.value); // Update the secret key state when input changes
  };
  console.log(secret);

  const deletePrompt = async (e) => {
    console.log(secret);
    e.preventDefault();
    if (secret === prompt.secret_key) {
      await supabase.from("prompts").delete().eq("id", id);
      alert("Prompt deleted.");
      window.location = "/";
    } else {
      alert("Incorrect secret key.");
    }
  };

  return (
    <div className="container px-10 ">
      <div className="mt-auto flex justify-between items-end">
        <h4 className="border px-2 my-2 text-sm  text-[#9C7A97] bg-white bg-opacity-70 rounded-lg">
          {prompt.category}
        </h4>
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
      <div className="border rounded-lg p-3 m-2 bg-white drop-shadow-md bg-opacity-90">
        <p className="font-light"> {prompt.prompt}</p>
        {prompt.img ? (
          <img src={prompt.img} alt="prompt" className="w-1/2 p-2 m-2" />
        ) : null}
        <div className="flex justify-between">
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
          <div className="flex my-2 items-center">
            <Popup
              trigger={
                <img
                  src="/delete.png"
                  alt="delete"
                  className="cursor-pointer"
                />
              }
              position={"center center"}
              modal
              overlayStyle={{ background: "rgba(0, 0, 0, 0.3)" }}
            >
              {(close) => (
                <form onSubmit={(inputString) => deletePrompt(inputString)}>
                  <div className="bg-white border rounded-xl p-10 bg-opacity-90">
                    <label htmlFor="secret">Secret Key: </label>
                    <input
                      type="password"
                      name="secret"
                      placeholder="secret"
                      value={secret}
                      onChange={handleSecret}
                      className="rounded-md p-2 mx-1"
                    />
                    <button
                      type="submit"
                      onClick={() => {
                        deletePrompt();
                        close;
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Popup>

            <Link to={`/${prompt.id}/edit`}>
              <img src="/edit.png" alt="edit" className="cursor-pointer mx-2" />
            </Link>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default ViewPrompt;
