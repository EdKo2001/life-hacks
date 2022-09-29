import { useState } from "react";

import AceEditor from "react-ace";
import Switch from "./Reusables/Switch";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-xcode";

const RMConvertor = () => {
  const [method, setMethod] = useState("px");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertor = (input: string, newMethod?: string) => {
    (newMethod ? newMethod === "px" : method === "px")
      ? setOutput(
          input
            .split(/([0-9]+px)|([0-9]+\.[0-9]+px)/g)
            ?.map((chunk) =>
              chunk?.match(/([0-9]+px)|([0-9]+\.[0-9]+px)/g)
                ? +chunk.split(/px/)[0] / 16 + "rem"
                : chunk
            )
            .join("")
        ) 
      : setOutput(
          input
            .split(/([0-9]+rem)|([0-9]+\.[0-9]+rem)/g)
            ?.map((chunk) =>
              chunk?.match(/([0-9]+rem)|([0-9]+\.[0-9]+rem)/g)
                ? +chunk.split(/rem/)[0] * 16 + "px"
                : chunk
            )
            .join("")
        );
  };

  return (
    <div>
      <h2>Option</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 16,
          margin: "20px 0",
        }}
      >
        PX
        <Switch
          onChange={(value) => (
            setMethod(value ? "rem" : "px"),
            convertor(input, value ? "rem" : "px")
          )}
        />
        REM
      </div>
      <div className="editors__row">
        <div className="editors__col">
          <h4 className="editors__col-title">Enter css here:</h4>
          <AceEditor
            mode="css"
            theme="xcode"
            onChange={(input) => (setInput(input), convertor(input))}
            name="input"
          />
        </div>
        <div className="editors__col">
          <h4 className="editors__col-title">Results:</h4>
          <AceEditor
            mode="css"
            theme="xcode"
            name="output"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default RMConvertor;
