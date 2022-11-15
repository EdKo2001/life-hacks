import React, { forwardRef, useMemo, useState } from "react";

import parse from "html-react-parser";

import {
  randomFromRange,
  parseIntWithDefault,
  randomUniqueFromRange,
  splitHeading,
} from "../utils";

import data from "../data/sentences.json";

// Default Props of the Component
const defaultProps = {
  movieCategory: "aladdin",
  cntParagraph: 1,
  sentencesPerParagraph: 8,
  startWithMovieIpsum: true,
  data: [],
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

// Get a random Sentence from Latin Sentence list
const getRandomSentence = (data: any[], movieCategory: string) => {
  // data[randomFromRange(0, data.length - 1)].attributes.feature_details
  //   .parent_title;
  const categorisedData = data.find((data) => data.id === movieCategory);
  return categorisedData.phrases[
    randomFromRange(0, categorisedData.phrases.length - 1)
  ];
};

// Get a punctuation for end of the sentence randomly
const endPunctuation = () => {
  const random = Math.random();
  // 1% probability exclamation mark, 4% probability question mark, 95% probability dot
  if (random > 0.99) return "!";
  if (random > 0.95) return "?";
  return ".";
};

// Create a Sentence by using random words
const createSentence = ({
  withMovieIpsum,
  withLink,
  withBold,
  withItalic,
  rawSentence,
  movieCategory,
}: // data,
{
  withMovieIpsum?: boolean;
  withLink?: boolean;
  withBold?: boolean;
  withItalic?: boolean;
  rawSentence?: boolean;
  movieCategory: string;
  data?: any[];
}) => {
  if (withMovieIpsum) return "Movies ipsum ";
  if (withLink)
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    return `<a href="https://ez-digital.com/">${getRandomSentence(
      data,
      movieCategory
    )}</a>`; //${endPunctuation()}
  if (withBold) return `<b>${getRandomSentence(data, movieCategory)}</b>`; //${endPunctuation()}
  if (withItalic) return `<i>${getRandomSentence(data, movieCategory)}</i>`; //${endPunctuation()}
  if (rawSentence) return getRandomSentence(data, movieCategory);
  return getRandomSentence(data, movieCategory); //+ endPunctuation();
};

// Create a paragraph by joining sentences
const createRandomParagraph = ({
  movieCategory,
  currentParagraph,
  firstParagraph,
  headings,
  ulParagraph,
  olParagraph,
  sentencesPerParagraph,
  startWithMovieIpsum,
  link,
  bold,
  ul,
  ol,
  quote,
  quoteParagraph,
  dlParagraph,
  dl,
  codeParagraph,
  code,
  data,
}: {
  movieCategory: string;
  currentParagraph: number;
  firstParagraph: boolean;
  headings: boolean;
  ulParagraph: boolean;
  olParagraph: boolean;
  cntParagraph: number;
  sentencesPerParagraph: number;
  startWithMovieIpsum: number;
  link: boolean;
  bold: boolean;
  ul: boolean;
  ol: boolean;
  quoteParagraph: boolean;
  quote: boolean;
  dlParagraph: boolean;
  dl: boolean;
  codeParagraph: boolean;
  code: boolean;
  data: any[];
}) => {
  const swmi =
    typeof startWithMovieIpsum === "boolean"
      ? startWithMovieIpsum
      : defaultProps.startWithMovieIpsum;

  const linkPosition = randomFromRange(0, sentencesPerParagraph * 2);
  const boldPosition = randomUniqueFromRange(0, sentencesPerParagraph * 2, [
    link ? linkPosition : 0,
  ]);
  const italicPosition = randomUniqueFromRange(0, sentencesPerParagraph * 2, [
    link ? linkPosition : 0,
    bold ? boldPosition! : 0,
  ]);

  let paragraph = "";
  if (headings) {
    switch (currentParagraph) {
      case 0:
        paragraph += `<h1>${createSentence({
          data,
          movieCategory,
        })}</h1>`;
        break;
      case 1:
        paragraph += `<h2>${createSentence({
          data,
          movieCategory,
        })}</h2>`;
        break;
      case 2:
        paragraph += `<h3>${createSentence({
          data,
          movieCategory,
        })}</h3>`;
        break;
      case 3:
        paragraph += `<h4>${createSentence({
          data,
          movieCategory,
        })}</h4>`;
        break;
      case 4:
        paragraph += `<h5>${createSentence({
          data,
          movieCategory,
        })}</h5>`;
        break;
      case 5:
        paragraph += `<h6>${createSentence({
          data,
          movieCategory,
        })}</h6>`;
        break;
    }
  }
  if (ulParagraph && ul) {
    paragraph = "<ul key='ul'>";
    for (let i = 0; i < randomFromRange(2, 6); i += 1) {
      paragraph += `<li key="${i}">${createSentence({
        data,
        movieCategory,
      })}</li>`;
    }
    paragraph += "</ul>";
  } else if (olParagraph && ol) {
    paragraph = "<ol key='ol'>";
    for (let i = 0; i < randomFromRange(2, 6); i += 1) {
      paragraph += `<li>${createSentence({
        data,
        movieCategory,
      })}</li>`;
    }
    paragraph += "</ol>";
  } else if (quoteParagraph && quote) {
    paragraph +=
      '<blockquote key="blockquote" cite="https://ez-digital.com/">33 explicabo nihil id nisi magni est sint sunt et sint rerum non tempora velit nam nobis galisum? </blockquote>';
  } else if (dlParagraph && dl) {
    paragraph = "<dl key='dl'>";
    for (let i = 0; i < randomFromRange(2, 4); i += 1) {
      paragraph += `<dt key="${i}"><dfn>${createSentence({
        data,
        movieCategory,
      })}</dfn></dt>
      <dd>${createSentence({
        data,
        movieCategory,
      })}</dd>`;
    }
    paragraph += "</dl>";
  } else if (codeParagraph && code) {
    paragraph = `<pre key='pre'><code>&lt;!-- ${createSentence({
      data,
      movieCategory,
    })} --&gt;\n&lt;animi&gt;${createSentence({
      data,
      movieCategory,
    })}&lt;/animi&gt;\n&lt;id&gt;${createSentence({
      data,
      movieCategory,
    })}&lt;/id&gt; \n&lt;ut&gt;${createSentence({
      data,
      movieCategory,
    })}&lt;/ut&gt;</code></pre>`;
  } else {
    for (let i = 0; i < sentencesPerParagraph; i += 1) {
      const withMovieIpsum = !!(i === 0 && firstParagraph && swmi);
      const withLink = !!(i === linkPosition && link);
      const withBold = !!(i === boldPosition && bold);
      const withItalic = !!(i === italicPosition && bold);

      paragraph += `${createSentence({
        withMovieIpsum,
        withLink,
        withBold,
        withItalic,
        data,
        movieCategory,
      })} `;
    }
  }

  return paragraph.trim();
};

// Function create plain Movie Ipsum
const moviesIpsum = (props: any | object = {}) => {
  const { cntParagraph, ...otherProps } = props;
  // NOTE: check typeOf cntParagraph
  const pCount = parseIntWithDefault(
    cntParagraph as number & string,
    defaultProps.cntParagraph
  );
  const ulPosition = randomFromRange(1, pCount);
  const olPosition = randomUniqueFromRange(1, pCount, [
    props.ul ? ulPosition : 1,
  ]);
  const quotePosition = randomUniqueFromRange(1, pCount, [
    props.ol ? olPosition! : 1,
    props.ul ? ulPosition : 1,
  ]);
  const dlPosition = randomUniqueFromRange(1, pCount, [
    props.ol ? olPosition! : 1,
    props.ul ? ulPosition : 1,
    props.quote ? quotePosition! : 1,
  ]);
  const codePosition = randomUniqueFromRange(1, pCount, [
    props.ol ? olPosition! : 1,
    props.ul ? ulPosition : 1,
    props.quote ? quotePosition! : 1,
    props.dl ? dlPosition! : 1,
  ]);

  return Array.from({ length: pCount }, (_, i) => i).map((_, i) =>
    createRandomParagraph({
      currentParagraph: i,
      firstParagraph: i === 0,
      ulParagraph: props.ul ? i === ulPosition : 999,
      olParagraph: props.ol ? i === olPosition : 999,
      quoteParagraph: props.quote ? i === quotePosition : 999,
      dlParagraph: props.dl ? i === dlPosition : 999,
      codeParagraph: props.code ? i === codePosition : 999,
      ...otherProps,
    })
  );
};

// Component create Movie Ipsum as HTML
const MoviesIpsum = forwardRef((props: MovieIpsumProps, ref) => {
  const [html, setHTML] = useState<(string | JSX.Element | JSX.Element[])[]>();

  useMemo(() => {
    const paragraphs = moviesIpsum(props);

    if (props.noHtml) {
      setHTML(paragraphs.map((paragraph) => paragraph));
    } else {
      setHTML(
        paragraphs.map((paragraph: string, idx) =>
          /<\/ol>|<\/ul>|<\/blockquote>|<\/dl>|<\/code>/g.test(paragraph) ? (
            parse(paragraph)
          ) : /<h1>|<h2>|<h3>|<h4>|<h5>|<h6>/g.test(paragraph) ? (
            splitHeading(paragraph, idx)
          ) : (
            <p key={idx}>{parse(paragraph)}</p>
          )
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.callback]);

  return (
    <div className="output" ref={ref as React.RefObject<HTMLDivElement>}>
      {html}
    </div>
  );
});

MoviesIpsum.displayName = "MoviesIpsum";

interface MovieIpsumProps {
  movieCategory: string;
  cntParagraph: number | string;
  sentencesPerParagraph: number | string;
  startWithMovieIpsum: boolean;
  data?: any[];
  callback: boolean;
  link: boolean;
  bold: boolean;
  headings: boolean;
  ul: boolean;
  ol: boolean;
  dl: boolean;
  quote: boolean;
  code: boolean;
  noHtml: boolean;
}

export default MoviesIpsum;
