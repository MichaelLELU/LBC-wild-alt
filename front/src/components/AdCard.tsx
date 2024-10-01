import { Link } from "react-router-dom";

export type Props = {
  id: number;
  title: string;
  price: number;
  image: string;
  link: string;
};

export default function AdCard(data: Props) {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={`ads/${data.id}`}>
        <img className="ad-card-image" src={data.image} alt={data.title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{data.title}</div>
          <div className="ad-card-price">{data.price}€</div>
        </div>
      </Link>
    </div>
  );
}
