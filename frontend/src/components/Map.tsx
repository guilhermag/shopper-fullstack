
interface MapProps {
  origin: string;
  destination: string;
}

const Map = ({ origin, destination }: MapProps) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}`;

  return (
    <iframe
      width="600"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      src={mapUrl}
    ></iframe>
  );
};

export default Map;