import { Card } from "../card/card.student";
import "./container.styles.css";

export const Container = ({ children }) => {
  return (
    <section id="container">
      <div id="wrapper">
        <Card></Card>
      </div>
    </section>
  );
};
