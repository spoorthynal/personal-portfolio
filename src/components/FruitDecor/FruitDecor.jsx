import styles from "./FruitDecor.module.css";
import strawberry from "../../assets/decor/strawberry.png";
import blueberry from "../../assets/decor/blueberry.png";
import raspberry from "../../assets/decor/raspberry.png";
import flower from "../../assets/decor/flower.png";
import strawberryHalf from "../../assets/decor/strawberry-half.png";
import forgetMeNots from "../../assets/decor/forget-me-nots.png";

// Watercolor stickers scattered in the side gutters around the page
// content. `x` is a % offset into that side's gutter (from the outer edge),
// `top` is px from the top as laid out on a ~828px-tall screen (scaled to
// the actual screen height), `size` is in vw so pieces scale with
// the gutter width, and `rot` is degrees of tilt.
const LEFT = [
  { src: blueberry, x: 30, top: 10, size: 7, rot: -12 },
  { src: flower, x: 70, top: 190, size: 3.6, rot: 18 },
  { src: strawberry, x: -6, top: 240, size: 9.5, rot: -16 },
  { src: forgetMeNots, x: 56, top: 330, size: 6.5, rot: 14 },
  { src: raspberry, x: 52, top: 450, size: 5.5, rot: 10 },
  { src: strawberryHalf, x: -8, top: 550, size: 10.5, rot: 14 },
  { src: blueberry, x: 64, top: 630, size: 5, rot: 28 },
  { src: flower, x: 56, top: 780, size: 4, rot: -24 },
];

const RIGHT = [
  { src: strawberry, x: -4, top: 0, size: 10, rot: 14 },
  { src: flower, x: 62, top: 50, size: 3.8, rot: 22 },
  { src: strawberryHalf, x: 50, top: 170, size: 7.5, rot: -20 },
  { src: blueberry, x: 10, top: 300, size: 6.2, rot: 20 },
  { src: forgetMeNots, x: 56, top: 370, size: 8, rot: -18 },
  { src: raspberry, x: 60, top: 510, size: 5.2, rot: -16 },
  { src: strawberry, x: 2, top: 570, size: 7.5, rot: -8 },
  { src: flower, x: 56, top: 730, size: 4.2, rot: 32 },
];

function Side({ items, side }) {
  return (
    <div className={`${styles.side} ${styles[side]}`}>
      {items.map((it, i) => (
        <img
          key={i}
          src={it.src}
          alt=""
          draggable={false}
          className={styles.piece}
          style={{
            [side]: `${it.x}%`,
            top: `${(it.top / 828) * 100}%`,
            width: `${it.size}vw`,
            "--rot": `${it.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default function FruitDecor() {
  return (
    <div className={styles.decor} aria-hidden="true">
      <Side items={LEFT} side="left" />
      <Side items={RIGHT} side="right" />
    </div>
  );
}
