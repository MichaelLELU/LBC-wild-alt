import { useParams } from "react-router-dom";
import data from "../../public/data/data.json";

export default function AdDetail() {
  let { title } = useParams();

  title = title!.charAt(0).toUpperCase() + title!.slice(1);

  const ad = data.find((ad) => ad.title === title);

  type ad = { title: string; image: string; price: number };

  return (
    <main>
      <h2>{ad!.title}</h2>
      <img src={ad!.image} alt={ad!.title} />
      <h3>{ad!.price} €</h3>
    </main>
  );
}
