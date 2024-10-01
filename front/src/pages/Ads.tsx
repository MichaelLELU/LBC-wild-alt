import { useEffect, useState } from "react";
import axios from "axios";
import AdCard, { Props } from "../components/AdCard";

export default function Ads() {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<Props[]>();

  const fetchData = async () => {
    try {
      await axios.get("http://localhost:3000/api/ads").then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <p>prix : {total} €</p>
      <section className="recent-ads">
        {data?.map((ads, i) => (
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
