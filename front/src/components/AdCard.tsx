type Props = {
  data: {
    title: string;
    price: number;
    image: string;
    link: string;
  };
};

export default function AdCard({ data }: Props) {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={data.link}>
        <img className="ad-card-image" src={data.image} alt={data.title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{data.title}</div>
          <div className="ad-card-price">{data.price}€</div>
        </div>
      </a>
    </div>
  );
}
