import { useLoaderData } from "react-router-dom";
type ad = { title: string; image: string; price: number; description: string };

export default function AdDetail() {
  const ad = useLoaderData() as ad;
  return (
    <main>
      <h2>{ad.title}</h2>
      <img src={ad.image} alt={ad.title} />
      <h3>{ad.price} €</h3>
      <p>{ad.description}</p>
    </main>
  );
}
