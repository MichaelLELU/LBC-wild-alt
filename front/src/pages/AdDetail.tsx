import { useLoaderData } from "react-router-dom";
import axios from "axios";
type ad = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  createdAt: string;
};

export default function AdDetail() {
  const ad = useLoaderData() as ad;

  const onSubmit = async () => {
    try {
      await axios
        .delete(`http://localhost:3000/api/ads/${ad.id}`)
        .then(() => window.location.replace("/"));
    } catch (error) {
      console.error(error);
    }
  };

  const extractDateAndTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <main>
      <h2>{ad.title}</h2>
      <img src={ad.image} alt={ad.title} />
      <h3>{ad.price} €</h3>
      <p>{ad.description}</p>
      <p>{extractDateAndTime(ad.createdAt)}</p>

      <button onClick={onSubmit}>Suprimer l'annonce</button>
    </main>
  );
}
