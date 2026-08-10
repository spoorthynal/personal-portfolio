import { useState } from "react";
import styles from "./Home.module.css";
import Bowl from "../../components/Bowl/Bowl";
import Rail from "../../components/Rail/Rail";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import { LEFT, RIGHT, ORDER } from "../../data/ingredients";

export default function Home() {
  const [colored, setColored] = useState([]);
  const [active, setActive] = useState(null);

  const isOn = (id) => colored.includes(id);
  const allOn = colored.length === ORDER.length;

  const pick = (id) => {
    setActive(id);
    setColored((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const reset = () => {
    setColored([]);
    setActive(null);
  };

  return (
    <>
      <header className={styles.header}>
        <p className={styles.eyebrow}>tap an ingredient · watch it come to life</p>
        <h1 className={styles.h1}>Build my bowl.</h1>
        <p className={styles.sub}>
          It starts black &amp; white. Tap an ingredient on the side — or right in the bowl — to
          fill it with color and reveal a piece of me.
        </p>
      </header>

      <div className={styles.stage}>
        <Rail ids={LEFT} isOn={isOn} pick={pick} active={active} side="left" />
        <div className={styles.bowlHolder}>
          <Bowl isOn={isOn} pick={pick} active={active} />
        </div>
        <Rail ids={RIGHT} isOn={isOn} pick={pick} active={active} side="right" />
      </div>

      <div className={styles.footerRow}>
        <p className={styles.counter}>
          {colored.length}/{ORDER.length} colored{allOn && " — full color, full picture 🎉"}
        </p>
        {colored.length > 0 && (
          <button onClick={reset} className={styles.reset}>
            ↺ reset bowl
          </button>
        )}
      </div>

      <InfoPanel activeId={active} />
    </>
  );
}
