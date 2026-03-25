import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

function ClickHandler({ onPick }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      onPick(lat, lng);
    },
  });

  return null;
}

export default function ProfileLocationPickerMap({ latitude, longitude, onPick }) {
  const lat = Number(latitude);
  const lng = Number(longitude);
  const hasMarker = !Number.isNaN(lat) && !Number.isNaN(lng);
  const center = hasMarker ? [lat, lng] : [27.7172, 85.324];

  return (
    <div className="overflow-hidden rounded-2xl border border-bark/10 bg-white">
      <MapContainer center={center} zoom={12} scrollWheelZoom className="h-64 w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={onPick} />
        {hasMarker && <Marker position={[lat, lng]} />}
      </MapContainer>
    </div>
  );
}
