interface MapProps {
  origin: string;
  destination: string;
}

const Map = ({ origin, destination }: MapProps) => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const src = `https://maps.googleapis.com/maps/api/staticmap?size=540x360&maptype=roadmap&markers=color:blue%7Clabel:A%7C${encodeURIComponent(
    origin
  )}&markers=color:red%7Clabel:B%7C${encodeURIComponent(
    destination
  )}&path=color:0xFFF|weight:50|&key=${GOOGLE_API_KEY}`;

  return <img src={src} alt='' />;
};

export default Map;
