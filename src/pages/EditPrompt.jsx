import { supabase } from "../client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPrompt = () => {
  const [secretInput, setSecretInput] = useState("");
  const [inputted, setVal] = useState(false);
  const { id } = useParams();
  const [prompt, setPrompt] = useState({
    id: null,
    prompt: "",
    img: "",
    category: "",
  });
  const [key, setKey] = useState("");

  useEffect(() => {
    const fetchPrompt = async () => {
      if (id) {
        const { data, error } = await supabase
          .from("prompts")
          .select()
          .eq("id", id);
        if (error) {
          console.error("Error fetching mate:", error.message);
        } else {
          setPrompt(data[0]);
        }
      }
    };

    fetchPrompt();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrompt((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSecret = (event) => {
    setSecretInput(event.target.value); // Update the secret key state when input changes
  };

  const readPrompt = async () => {
    const { data } = await supabase
      .from("prompts")
      .select("secret_key")
      .eq("id", id)
      .single();
    setKey(data.secret_key);
  };
  readPrompt();

  const editPrompt = async (event) => {
    event.preventDefault();
    await supabase
      .from("prompts")
      .update({
        prompt: prompt.prompt,
        img: prompt.img,
        category: prompt.category,
      })
      .eq("id", id);
    window.location = `/${id}`;
  };

  const deletePrompt = async (e) => {
    e.preventDefault();
    await supabase.from("prompts").delete().eq("id", id);
    alert("Prompt deleted.");
    window.location = "/";
  };

  return (
    <div>
      <form
        onChange={(e) => {
          e.preventDefault();
          setVal(true);
        }}
      >
        <div className="bg-white border rounded-xl p-10 bg-opacity-90">
          <label htmlFor="secret">Secret Key: </label>
          <input
            type="password"
            name="secret"
            placeholder="secret"
            value={secretInput}
            onChange={handleSecret}
            className="rounded-md p-2 mx-1 border"
          />
        </div>
      </form>
      {inputted && secretInput == key ? (
        <div className="container px-10">
          <h1 className="text-3xl font-extrabold mt-3 text-transparent bg-gradient-to-r from-[#5A4956] via-[#9C7A97] to-[#5A4956] bg-clip-text my-2 py-3">
            Edit Prompt
          </h1>
          <div className="w-full">
            <form onSubmit={editPrompt}>
              <div className=" m-5">
                <label htmlFor="prompt" className="font-medium">
                  Prompt:{" "}
                </label>{" "}
                <br />
                <textarea
                  id="prompt"
                  name="prompt"
                  value={prompt.prompt}
                  onChange={handleChange}
                  className="rounded-md w-full m-3 p-2 "
                  rows={7}
                  cols={50}
                />
              </div>
              <div className=" m-5">
                <label htmlFor="category" className="font-medium">
                  Category:{" "}
                </label>{" "}
                <br />
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={prompt.category}
                  onChange={handleChange}
                  className="w-full rounded-md m-3 p-2"
                />
              </div>
              <div className="m-5">
                <label htmlFor="img" className="font-medium">
                  Image:{" "}
                </label>{" "}
                <br />
                <input
                  type="url"
                  id="img"
                  name="img"
                  value={prompt.img}
                  onChange={handleChange}
                  className="w-full rounded-md m-3 p-2"
                />
              </div>

              <div className="flex justify-end m-3 mb-10">
                <button type="submit" className="mx-2">
                  Update
                </button>
                <button
                  onClick={deletePrompt}
                  className="text-[#7a6174] bg-white"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : inputted && secretInput !== "" && secretInput !== key ? (
        <h4 className="text-xl text-center m-5 p-5">Incorrect secret key</h4>
      ) : null}
    </div>
  );
};

export default EditPrompt;
