// Plays a mouse-click sound effect. Since it's always triggered from a click
// handler (a user gesture), autoplay restrictions don't apply.
import clickSrc from "../assets/sounds/mouse-click.mp3";

const click = new Audio(clickSrc);
click.preload = "auto";

export function playClick() {
  try {
    // A fresh copy each time so quick repeated clicks overlap instead of
    // cutting each other off.
    const sound = click.cloneNode();
    sound.volume = 0.6;
    sound.play().catch(() => {});
  } catch {
    // Sound is a nice-to-have — never let it break the interaction.
  }
}
