import { Editor } from "@monaco-editor/react";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { greenBtnCss } from "../constant/tailwind";
import { getLocalStorage, setLocalStorage } from "../util/localStorage";
import { registerAgiGit } from "../util/registerAgiGit";

export default function CommandLine(props: any) {
  const [editorValue, setEditorValue] = useState<string | undefined>(
    "AgiGit add .",
  );
  const [recordList, setRecordList] = useState<any>([]);

  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value);
  };

  useEffect(() => {
    const list = getLocalStorage("record") ?? [];
    setRecordList(list);
  }, []);

  return (
    <div className="flex y-10 px-4 my-4">
      <div className="w-2/3 rounded-xl border p-2 mr-2">
        <div className="">
          <label htmlFor="comment" className="sr-only">
            Add your code
          </label>
          <Editor
            height="40vh"
            defaultLanguage="AgiGit"
            value={editorValue}
            theme="AgiGitTheme"
            onMount={registerAgiGit}
            onChange={handleEditorChange}
          />
        </div>
        <div className="flex flex-row-reverse mt-2">
          <Button
            className={greenBtnCss}
            onClick={() => {
              if ((editorValue ?? "").length > 0) {
                const list = [editorValue, ...recordList];
                setRecordList(list);
                setEditorValue("");
                setLocalStorage("record", list);
              }
            }}
          >
            Run
          </Button>
        </div>
      </div>
      <div className="w-1/3 rounded-xl border p-4 bg-[#fff] font-bold overflow-y-scroll h-[400px] scrollbar-thin">
        <div className="text-xl text-bold mb-2">History Record</div>
        <div>
          {recordList.map((item: string, idx: number) => {
            return (
              <div
                className="text-sm w-full rounded-xl bg-[#F8F6E3] mb-2 p-2 font-normal"
                key={item}
              >
                {idx + 1}: {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
