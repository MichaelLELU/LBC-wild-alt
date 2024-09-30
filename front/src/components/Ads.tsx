import AdCard from "./AdCard";
import data from "../../public/data/data.json";

export default function Ads() {
  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {data.map((ads, i) => (
          <AdCard key={i} data={ads} />
        ))}
      </section>
    </main>
  );
}
