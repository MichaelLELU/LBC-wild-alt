import { useState } from "react";
import AdCard from "./AdCard";
import data from "../../public/data/data.json";

export default function Ads() {
  const [total, setTotal] = useState(0);

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <p>prix : {total} €</p>
      <section className="recent-ads">
        {data.map((ads, i) => (
          <div key={i}>
            <AdCard data={ads} />
            <button
              className="button"
              onClick={() => {
                setTotal(total + ads.price);
              }}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
