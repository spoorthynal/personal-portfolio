import styles from "./Bowl.module.css";
import { cx } from "../../utils/cx";

export default function Bowl({ isOn, pick, active }) {
  const regionClass = (id) =>
    cx(styles.region, isOn(id) ? styles.on : styles.off, active === id && styles.active);

  return (
    <svg
      viewBox="0 0 400 400"
      width="300"
      height="300"
      className={cx(styles.bowl, isOn("acai") && styles.acaiOn)}
      role="group"
      aria-label="Açaí bowl"
    >
      <defs>
        {/* soft radial for the açaí to give depth */}
        <radialGradient id="acaiG" cx="42%" cy="38%" r="65%">
          <stop offset="0%" className={styles.acaiStop0} />
          <stop offset="60%" className={styles.acaiStop1} />
          <stop offset="100%" className={styles.acaiStop2} />
        </radialGradient>
        {/* highlight used on berries */}
        <radialGradient id="shine" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* bowl rim + inner wall for depth */}
      <circle cx="200" cy="200" r="192" fill="#EFEAE3" stroke="#DAD1C8" strokeWidth="5" />
      <circle cx="200" cy="200" r="176" fill="#E4DcD3" />

      {/* açaí base — About */}
      <g className={regionClass("acai")} onClick={() => pick("acai")}>
        <circle cx="200" cy="200" r="168" fill="url(#acaiG)" />
        <path
          d="M96 214 Q150 150 214 168 Q262 182 250 214 Q234 250 200 232 Q176 220 150 244 Q120 262 96 214 Z"
          className={styles.acaiSwirl}
          opacity="0.35"
        />
        <path
          d="M130 258 Q200 210 286 250"
          className={styles.acaiSwirl2}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.3"
        />
      </g>

      {/* granola cluster (top-left) — Resume. Lumpy popcorn-style pieces */}
      <g className={regionClass("granola")} onClick={() => pick("granola")}>
        {[
          [118, 116, 18],
          [150, 104, 42],
          [112, 146, 12],
          [144, 150, 70],
          [104, 178, 30],
          [136, 182, 105],
          [100, 212, 55],
          [132, 214, 20],
          [116, 244, 80],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`rotate(${r} ${x} ${y}) scale(${0.9 + (i % 3) * 0.12})`}>
            {/* overlapping blobs form a bumpy popcorn silhouette */}
            <circle cx={x - 7} cy={y - 4} r="8" className={styles.granolaFill} />
            <circle cx={x + 6} cy={y - 6} r="9" className={styles.granolaFill} />
            <circle cx={x + 9} cy={y + 4} r="7.5" className={styles.granolaFill} />
            <circle cx={x - 4} cy={y + 7} r="8.5" className={styles.granolaFill} />
            <circle cx={x + 1} cy={y} r="9" className={styles.granolaFill} />
            {/* soft top highlight */}
            <circle cx={x - 2} cy={y - 4} r="3.2" className={styles.granolaLine} />
          </g>
        ))}
      </g>

      {/* blueberries — Projects. Round w/ blossom end + shine */}
      <g className={regionClass("blueberry")} onClick={() => pick("blueberry")}>
        {[
          [214, 120, 17],
          [256, 142, 18],
          [192, 158, 15],
          [242, 186, 17],
          [280, 172, 15],
          [218, 206, 16],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} className={styles.blueberryFill} />
            <circle cx={x} cy={y} r={r} fill="url(#shine)" />
            <circle cx={x} cy={y - r * 0.15} r={r * 0.28} className={styles.blueberryStar} />
          </g>
        ))}
      </g>

      {/* strawberries (center) — GitHub. Heart-ish body, leaf, seeds */}
      <g className={regionClass("strawberry")} onClick={() => pick("strawberry")}>
        {[
          [196, 190, 0],
          [248, 206, 14],
        ].map(([cx, cy, rot], k) => (
          <g key={k} transform={`rotate(${rot} ${cx} ${cy})`}>
            <path
              d={`M${cx} ${cy - 22} C ${cx + 20} ${cy - 24} ${cx + 22} ${cy - 2} ${cx} ${cy + 22} C ${cx - 22} ${cy - 2} ${cx - 20} ${cy - 24} ${cx} ${cy - 22} Z`}
              className={styles.strawFill}
            />
            <path
              d={`M${cx - 10} ${cy - 22} Q${cx} ${cy - 30} ${cx + 10} ${cy - 22} Q${cx} ${cy - 16} ${cx - 10} ${cy - 22} Z`}
              className={styles.strawLeaf}
            />
            {[
              [-6, -6],
              [6, -4],
              [0, 2],
              [-8, 4],
              [8, 6],
              [0, 12],
            ].map(([dx, dy], i) => (
              <circle key={i} cx={cx + dx} cy={cy + dy} r="1.7" className={styles.strawSeed} />
            ))}
          </g>
        ))}
      </g>

      {/* kiwi — LinkedIn. Sliced kiwi: rind, flesh, core, seeds */}
      <g className={regionClass("kiwi")} onClick={() => pick("kiwi")}>
        {[
          [166, 182, 20],
          [176, 286, 17],
        ].map(([cx, cy, r], k) => (
          <g key={k}>
            <circle cx={cx} cy={cy} r={r} className={styles.kiwiRind} />
            <circle cx={cx} cy={cy} r={r - 3} className={styles.kiwiFlesh} />
            <circle cx={cx} cy={cy} r={r * 0.28} className={styles.kiwiCore} />
            {Array.from({ length: 10 }).map((_, i) => {
              const ang = (i / 10) * Math.PI * 2;
              const rr = r * 0.62;
              return (
                <circle
                  key={i}
                  cx={cx + Math.cos(ang) * rr}
                  cy={cy + Math.sin(ang) * rr}
                  r="1.5"
                  className={styles.kiwiSeed}
                />
              );
            })}
          </g>
        ))}
      </g>

      {/* banana slices (right) — Contact. Ring w/ inner ring + seed dots */}
      <g className={regionClass("banana")} onClick={() => pick("banana")}>
        {[
          [302, 128, 17],
          [318, 172, 18],
          [308, 216, 17],
          [288, 258, 16],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} className={styles.bananaFill} />
            <circle cx={x} cy={y} r={r - 4} className={styles.bananaInner} />
            {[
              [0, -4],
              [3, 3],
              [-3, 3],
            ].map(([dx, dy], j) => (
              <circle key={j} cx={x + dx} cy={y + dy} r="1.3" className={styles.bananaSeed} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
