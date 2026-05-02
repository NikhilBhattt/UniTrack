import Header from "../Header/Header";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ActionCards from "../ActionCards/ActionCards";
import LatestItems from "../LatestItems/LatestItems";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main>
        <section className="left-container">
          <h1 className="left-heading">
            Your one-stop <span>Solution</span> <br /> for managing{" "}
            <span>lost</span> and <br />
            <span>found</span> items efficiently.
          </h1>
          <div className="actions">
            <Button
              text="Report"
              onClickFunc={() => navigate("/report-item")}
            />
            <Button
              outline={"true"}
              text="Browse"
              onClickFunc={() => navigate("/all-items")}
            />
          </div>
        </section>
        <aside className="right-container">
          <img
            className="logo-banner"
            src="./src/assets/logo-banner.png"
            alt="logo-banner"
          />
        </aside>
      </main>
      <ActionCards />
      <LatestItems />

      <Footer />
    </>
  );
}

export default Home;
