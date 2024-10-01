import { useLoaderData } from "react-router-dom";
import AdCard, { Props } from "../components/AdCard";

export default function Category() {
  const data = useLoaderData() as Props[];

  console.log(data);

  return (
    <div className="main-content">
      {data?.map((c) => <AdCard id={c.id} data={c} />)}
    </div>
  );
}
