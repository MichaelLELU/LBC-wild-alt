import { Link } from "react-router-dom";

export type Props = {
  id: number;
  title: string;
  price: number;
  picture: string;
};

export default function AdCard({ id, title, price, picture }: Props) {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={`/ads/${id}`}>
        <img className="ad-card-image" src={picture} alt={title} />
        <div className="ad-card-text">
          <h3 className="ad-card-title">{title}</h3>
          <h4 className="ad-card-price">{price}€</h4>
        </div>
      </Link>
    </div>
  );
}
