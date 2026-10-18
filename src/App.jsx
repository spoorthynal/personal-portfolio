import { useEffect } from "react";
import Nav from "./components/Nav/Nav";
import FruitDecor from "./components/FruitDecor/FruitDecor";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Work from "./pages/Work/Work";
import Contact from "./pages/Contact/Contact";
import styles from "./App.module.css";

export default function App() {
  // A shared link like /#work should open on that section. The browser tries
  // before React has rendered the sections, so jump there once they exist.
  useEffect(() => {
    const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div className={styles.page}>
      <Nav />
      <FruitDecor />
      <main>
        <section id="home" className={styles.section}>
          <Home />
        </section>
        <About />
        <Work />
        <Contact />
      </main>
    </div>
  );
}
