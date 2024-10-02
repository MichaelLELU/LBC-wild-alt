import { useLoaderData } from "react-router-dom";
import AdCard, { Props } from "../components/AdCard";

export default function Category() {
  const data = useLoaderData() as Props[];

  return (
    <div className="main-content">
      {data?.map((c) => (
        <AdCard title={c.title} id={c.id} price={c.price} picture={c.picture} />
      ))}
    </div>
  );
}
