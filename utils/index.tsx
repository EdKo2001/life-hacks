import parse from "html-react-parser";

// Get random integers from a range
const randomFromRange = (min: number, max: number) =>
  Math.round(Math.random() * (max - min)) + min;

// Get random unique integers from a range
const randomUniqueFromRange = (
  min: number,
  max: number,
  exclude?: number[]
): number | undefined => {
  if (min === max) return;
  if (exclude?.includes(min) && exclude?.includes(max)) return;
  const randomNumber = randomFromRange(min, max);
  return exclude?.includes(randomNumber)
    ? randomUniqueFromRange(min, max, exclude)
    : randomNumber;
};

// Try to parse a value and return default value if it could not parsed as number
const parseIntWithDefault = (value: number & string, defaultValue: number) => {
  let finalValue = parseInt(value, 10);
  if (Number.isNaN(finalValue)) finalValue = defaultValue;
  return finalValue;
};

const getRandomGender = () => {
  if (Math.random() >= 0.5) return "male";
  return "female";
};

const splitHeading = (paragraph: string, idx: number) => {
  const heading =
    paragraph.split("</h1>").length === 2
      ? "h1"
      : paragraph.split("</h2>").length === 2
      ? "h2"
      : paragraph.split("</h3>").length === 2
      ? "h3"
      : paragraph.split("</h4>").length === 2
      ? "h4"
      : paragraph.split("</h5>").length === 2
      ? "h5"
      : "h6";
  switch (heading) {
    case "h1":
      return (
        <>
          {parse(paragraph.split("</h1>")[0] + "</h1>")}
          <p key={idx}>{parse(paragraph.split("</h1>")[1])}</p>
        </>
      );
    case "h2":
      return (
        <>
          {parse(paragraph.split("</h2>")[0] + "</h2>")}
          <p key={idx}>{parse(paragraph.split("</h2>")[1])}</p>
        </>
      );
    case "h3":
      return (
        <>
          {parse(paragraph.split("</h3>")[0] + "</h3>")}
          <p key={idx}>{parse(paragraph.split("</h3>")[1])}</p>
        </>
      );
    case "h4":
      return (
        <>
          {parse(paragraph.split("</h4>")[0] + "</h4>")}
          <p key={idx}>{parse(paragraph.split("</h4>")[1])}</p>
        </>
      );
    case "h5":
      return (
        <>
          {parse(paragraph.split("</h5>")[0] + "</h5>")}
          <p key={idx}>{parse(paragraph.split("</h5>")[1])}</p>
        </>
      );
    case "h6":
      return (
        <>
          {parse(paragraph.split("</h6>")[0] + "</h6>")}
          <p key={idx}>{parse(paragraph.split("</h6>")[1])}</p>
        </>
      );
  }
};

export {
  randomFromRange,
  randomUniqueFromRange,
  parseIntWithDefault,
  getRandomGender,
  splitHeading,
};
