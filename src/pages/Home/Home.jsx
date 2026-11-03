import { lazy, Suspense, useState } from "react";
import styles from "./Home.module.css";
import Rail from "../../components/Rail/Rail";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import TypingText from "../../components/TypingText/TypingText";
import { LEFT, RIGHT, ORDER } from "../../data/ingredients";
import { playClick } from "../../utils/playClick";

const Bowl3D = lazy(() => import("../../components/Bowl3D/Bowl3D"));

export default function Home() {
  const [colored, setColored] = useState([]);
  const [active, setActive] = useState(null);

  const isOn = (id) => colored.includes(id);
  const allOn = colored.length === ORDER.length;

  // `also` lets one click reveal a second ingredient (see DUAL_REVEAL in Bowl3D)
  // while still playing a single click.
  const pick = (id, also) => {
    playClick();
    setActive(id);
    const ids = also ? [also, id] : [id];
    setColored((prev) => [...prev, ...ids.filter((x) => !prev.includes(x))]);
  };
  const reset = () => {
    setColored([]);
    setActive(null);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.welcome}> Hi! I'm Spoorthy and this is my portfolio. Get to know me below! 😊 </p>
        <h1 className={styles.h1}>
          <TypingText text="Build my bowl!" />
        </h1>
        <p className={styles.sub}>
          The acai bowl starts black &amp; white. Tap an ingredient on the side or right in the bowl to
          fill it with color and reveal a piece of me!
        </p>
      </header>

      <div className={styles.stage}>
        <Rail ids={LEFT} isOn={isOn} pick={pick} active={active} side="left" />
        <div className={styles.bowlHolder}>
          {colored.length > 0 && (
            <button onClick={reset} className={styles.reset} aria-label="Reset bowl" title="Reset bowl">
              ↺
            </button>
          )}
          <Suspense fallback={<div className={styles.bowlPlaceholder} />}>
            <Bowl3D isOn={isOn} pick={pick} active={active} />
          </Suspense>
        </div>
        <Rail ids={RIGHT} isOn={isOn} pick={pick} active={active} side="right" />
      </div>

      <div className={styles.footerRow}>
        <p className={styles.counter}>
          {colored.length}/{ORDER.length} colored{allOn && " — yay! 😋"}
        </p>
      </div>

      <InfoPanel activeId={active} />
    </div>
  );
}
