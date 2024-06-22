import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import arrowRight from '../../Images/Icons/arrow-right-dark.svg'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapUpdater = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      const { lat, lon } = location;
      map.setView([lat, lon], 13);
    }
  }, [location, map]);

  return null;
};

const MapComponent = ({ name, address, city, postalCode, isMapUrl }) => {
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState('');
  const { REACT_APP_LOCATION_IQ_API_KEY } = process.env;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const query = `${address}, ${city}, ${postalCode}`;
        const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=${REACT_APP_LOCATION_IQ_API_KEY}&q=${encodeURIComponent(query)}&format=json`);
        const data = await response.json();

        if (data && data.length > 0) {
          const location = data[0];
          setLocation({
            name,
            address,
            city,
            postalCode,
            lat: parseFloat(location.lat),
            lon: parseFloat(location.lon)
          });
          setMapUrl(`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}#map=18/${location.lat}/${location.lon}`);
        } else {
          console.error('Aucune adresse pour :', query);
        }
      } catch (error) {
        console.error('Impossible de récupérer les coordonnées :', error);
      }
    };

    fetchCoordinates();
  }, [address, city, postalCode, REACT_APP_LOCATION_IQ_API_KEY]);

  return (
    <>
    {isMapUrl && (
      <Link to={mapUrl} target="_blank" className="text-blue-dark flex items-center font-semibold mb-2">Voir sur la carte <img src={arrowRight} className="ms-2" /></Link>
    )}
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        style={{ height: "422px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {location && (
          <>
            <Marker position={[location.lat, location.lon]}>
              <Popup>
                <b>{location.name}</b><br />
                {location.address}<br />
                {location.city}, {location.postalCode}
              </Popup>
            </Marker>
            <MapUpdater location={location} />
          </>
        )}
      </MapContainer>
    </>
  );
};

export default MapComponent;
