import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";

const MoviesIpsum = dynamic(() => import("../components/MoviesIpsum"), {
  ssr: false,
});
const RMConvertor = dynamic(() => import("../components/RMConvertor"), {
  ssr: false,
});

interface HomeProps {
  data: [];
}

const Home: NextPage<HomeProps> = ({ data }) => {
  const [tab, setTab] = useState("lipsum");

  return (
    <div className="container">
      <div className="tab-header">
        <button
          type="button"
          className={tab === "lipsum" ? "active" : ""}
          onClick={() => setTab("lipsum")}
        >
          Movies Ipsum
        </button>
        <button
          type="button"
          className={tab === "rem" ? "active" : ""}
          onClick={() => setTab("rem")}
        >
          PX To Rem
        </button>
      </div>
      {tab === "lipsum" && <MoviesIpsum data={data} />}
      {tab === "rem" && <RMConvertor />}{" "}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.opensubtitles.com/api/v1/subtitles?query=murder`,
    {
      headers: {
        "Api-Key": "9u10mGxt1ZKP3eUvCK3onu2l1YwOJsbS",
      },
    }
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data.data },
  };
}

export default Home;
