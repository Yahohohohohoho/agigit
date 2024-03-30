import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { registerAgiGit } from "../util/registerAgiGit";

export default function CommandLine(props: any) {
  const [value, setValue] = useState("");
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      props.onKeyDown(value);
      event.preventDefault();
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="flex justify-center items-start py-10 px-4">
      <div className="w-full rounded-xl border p-2">
        <form action="#" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
              height="40vh"
              defaultLanguage="AgiGit"
              defaultValue="AgiGit add ."
              theme="AgiGitTheme"
              onMount={registerAgiGit}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Run
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
