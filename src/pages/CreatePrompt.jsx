import { supabase } from "../client";
import { useState } from "react";

const CreatePrompt = () => {
  const [prompt, setPrompt] = useState({
    prompt: "",
    img: "",
    category: "",
    secret_key: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrompt((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPrompt = async (e) => {
    try {
      const category = prompt.category || "uncategorized";
      e.preventDefault();
      const { error } = await supabase.from("prompts").insert({
        prompt: prompt.prompt,
        img: prompt.img,
        category: category,
        secret_key: prompt.secret,
      });
      if (error) {
        throw error;
      }
      window.location = "/";
    } catch (error) {
      console.error("Error creating prompt:", error.message);
    }
  };
  return (
    <div className="container px-10">
      <h1 className="text-3xl font-extrabold mt-3 text-transparent bg-gradient-to-r from-[#5A4956] via-[#9C7A97] to-[#5A4956] bg-clip-text my-2 py-3">
        Create Prompt
      </h1>
      <div className="w-full">
        <form onSubmit={createPrompt}>
          <div className="m-5">
            <label htmlFor="secret" className="font-medium">
              Secret Key:{" "}
            </label>{" "}
            <br />
            <input
              type="password"
              id="secret"
              name="secret"
              required
              placeholder="Secret key to edit or delete later"
              onChange={handleChange}
              className="w-full rounded-md m-3 p-2"
            />
          </div>
          <div className=" m-5">
            <label htmlFor="prompt" className="font-medium">
              Prompt:{" "}
            </label>{" "}
            <br />
            <textarea
              id="prompt"
              name="prompt"
              placeholder="Write your prompt here..."
              required
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
              placeholder="Uncategorized"
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
              placeholder="Image URL (optional)"
              onChange={handleChange}
              className="w-full rounded-md m-3 p-2"
            />
          </div>

          <div className="flex justify-end m-3 mb-10">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePrompt;
