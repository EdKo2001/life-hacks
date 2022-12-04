import { useState } from "react";
import dynamic from "next/dynamic";

import type { NextPage } from "next";

const MoviesIpsum = dynamic(() => import("../components/MoviesIpsum"), {
  ssr: false,
});

const RMConvertor = dynamic(() => import("../components/RMConvertor"), {
  ssr: false,
});

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
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
          PX To REM
        </button>
      </div>
      {tab === "lipsum" && <MoviesIpsum />}
      {tab === "rem" && <RMConvertor />}
    </div>
  );
};

export default Home;
