import React, { useState, useRef, ChangeEvent } from "react";

import MoviesIpsum from "./Generator";

import Select from "./Reusables/Select";

const defaultComponentProps = {
  movieCategory: "aladdin",
  cntParagraph: 3,
  sentencesPerParagraph: 8,
  startWithMovieIpsum: true,
  link: false,
  bold: false,
  headings: false,
  ul: false,
  ol: false,
  dl: false,
  quote: false,
  code: false,
  noHtml: false,
};

interface defaultComponentPropsKeys {
  [key: string]: number | boolean;
}

const MovieIpsumComponent = ({ data }: { data?: any[] }) => {
  const [componentProps, setComponentProps] = useState(defaultComponentProps);
  const [isCopied, setCopied] = useState(false);
  const [callback, setCallback] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const categories = [
    { label: "Aladdin", value: "aladdin" },
    { label: "Back to the Future", value: "backFuture" },
    { label: "Breaking Bad", value: "breakingBad" },
    { label: "Forest Gump", value: "forestGump" },
    { label: "Game of Thrones", value: "gameThrones" },
    { label: "Harry Potter", value: "harryPotter" },
    { label: "The Lord of the Rings", value: "lordRings" },
    { label: "Monty Python and the Holy Grail", value: "montyPython" },
    { label: "Napoleon Dynamite", value: "napoleonDynamite" },
    { label: "Office Space", value: "officeSpace" },
    { label: "The Lion King", value: "lionKing" },
    { label: "The Matrix", value: "matrix" },
    { label: "The Sopranos", value: "sopranos" },
  ];

  const handleComponentPropsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;
    setComponentProps((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "noHtml") {
      setComponentProps((prevState) => ({
        ...prevState,
        link: false,
        bold: false,
        headings: false,
        ul: false,
        ol: false,
        dl: false,
        quote: false,
        code: false,
      }));
    }

    // setCallback((prevState) => !prevState);
  };

  const resetComponentProps = () => {
    setComponentProps(defaultComponentProps);
    // setCallback((prevState) => !prevState);
  };

  const areAllComponentPropsDefault = Object.keys(defaultComponentProps).every(
    (prop) =>
      //@ts-ignore
      (componentProps as defaultComponentPropsKeys)[prop] ===
      //@ts-ignore
      (defaultComponentProps as defaultComponentPropsKeys)[prop]
  );

  const copyToClipboard = (text: string) => {
    const listener = (e: ClipboardEvent) => {
      e.preventDefault();
      e.clipboardData?.setData("text/html", text);
      e.clipboardData?.setData("text/plain", text);
    };
    document.addEventListener("copy", listener);
    // NOTE: without the execCommand fuction the text wont't be copied
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="lorem-ipsum-wrapper">
      <div className="container">
        <div className="lorem-ipsum-row">
          <section className="props">
            <div className="prop same-line">
              <h3 style={{ marginBottom: 10 }}>Movies Ipzum options</h3>
              <label>
                Start with “Movies ipsum”
                <input
                  className="checkbox"
                  type="checkbox"
                  name="startWithMovieIpsum"
                  checked={componentProps.startWithMovieIpsum}
                  onChange={handleComponentPropsChange}
                />
              </label>
            </div>
            <div className="prop">
              <h3 style={{ marginBottom: 10 }}>Movie:</h3>
              <Select
                //@ts-ignore
                onChange={handleComponentPropsChange}
                name="movieCategory"
                value={componentProps.movieCategory}
                options={categories}
              />
            </div>
            <div className="prop">
              <h3>Paragraphs Number: {`${componentProps.cntParagraph}`}</h3>
              <input
                className="slider"
                type="range"
                name="cntParagraph"
                min="1"
                max="50"
                value={componentProps.cntParagraph}
                onChange={handleComponentPropsChange}
              />
            </div>
            <div className="prop">
              <h3>
                Sentences Per Paragraph:{" "}
                {`${componentProps.sentencesPerParagraph}`}
              </h3>
              <input
                className="slider"
                type="range"
                name="sentencesPerParagraph"
                min="4"
                max="20"
                value={componentProps.sentencesPerParagraph}
                onChange={handleComponentPropsChange}
              />
            </div>
            <div className="prop">
              <h3 style={{ marginBottom: 10 }}>Add HTML elements</h3>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="link"
                  name="link"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.link}
                  disabled={componentProps.noHtml}
                />
                <label htmlFor="link">Links {`<a>`}</label>
              </div>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="bold"
                  name="bold"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.bold}
                  disabled={componentProps.noHtml}
                />
                <label htmlFor="bold">
                  Bold and italic text {`<b>`} and {`<i>`}
                </label>
              </div>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="headings"
                  name="headings"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.headings}
                  disabled={componentProps.noHtml}
                />
                <label htmlFor="headings">
                  Headers {`<h1>`} through {`<h5>`}
                </label>
              </div>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="ul"
                  name="ul"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.ul}
                  disabled={componentProps.noHtml}
                />
                <label htmlFor="ul">Unordered lists {`<ul>`}</label>
              </div>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="ol"
                  name="ol"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.ol}
                  disabled={componentProps.noHtml}
                />
                <label htmlFor="ol">Ordered lists {`<ol>`}</label>
              </div>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="dl"
                  name="dl"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.dl}
                  disabled={componentProps.noHtml}
                />
                <label htmlFor="dl">Description lists {`<dl>`}</label>
              </div>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="quote"
                  name="quote"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.quote}
                  disabled={componentProps.noHtml}
                />
                <label htmlFor="quote">Blockquotes {`<blockquote>`}</label>
              </div>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="code"
                  name="code"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.code}
                  disabled={componentProps.noHtml}
                />
                <label htmlFor="code">
                  Pre/Code {`<pre>`} and {`<code>`}
                </label>
              </div>
              <div className="radio-group">
                <input
                  type="checkbox"
                  id="noHtml"
                  name="noHtml"
                  onChange={handleComponentPropsChange}
                  checked={componentProps.noHtml}
                />
                <label htmlFor="noHtml">Turn off HTML elements</label>
              </div>
            </div>
            <button
              className="btn"
              type="button"
              onClick={resetComponentProps}
              disabled={areAllComponentPropsDefault}
            >
              Reset options
            </button>
          </section>
          <section className="output-wrapper">
            <button
              className="btn"
              type="button"
              onClick={() => {
                copyToClipboard(outputRef.current!.innerHTML);
              }}
              style={{ marginRight: 20 }}
            >
              COPY
            </button>

            <button
              className="btn"
              type="button"
              onClick={() => setCallback((prevState) => !prevState)}
            >
              GENERATE
            </button>
            <h2 style={{ marginTop: 20 }}>Output</h2>
            <MoviesIpsum
              // data={data}
              ref={outputRef}
              callback={callback}
              {...componentProps}
            />
            {isCopied && (
              <p
                style={{
                  width: "50%",
                  margin: "0 auto",
                  textAlign: "center",
                  height: "50px",
                  lineHeight: "50px",
                  fontWeight: 500,
                  background: "#0052cc",
                  color: "white",
                }}
              >
                COPIED
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MovieIpsumComponent;
