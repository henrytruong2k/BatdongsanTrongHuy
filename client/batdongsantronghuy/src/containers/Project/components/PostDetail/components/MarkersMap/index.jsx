import L from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import osm from '../../../../../../constants/osm-providers';
import './style.scss';

function MarkersMap({ mapConfig }) {
  const ZOOM_LEVEL = 15;
  const mapRef = useRef(null);
  const center = {
    lat: mapConfig.locationX,
    lng: mapConfig.locationY,
  };
  useEffect(() => {
    try {
      const showPopUp = () => {
        setTimeout(() => mapRef.current.openPopup(), 100);
      };
      showPopUp();
    } catch (error) {
      console.log('Fail to show pop up: ', error);
    }
  }, []);
  const markerIcon = new L.icon({
    iconUrl: '/assets/icons/location.svg',
    iconSize: [35, 45],
    popupAnchor: [3, -25],
  });

  return (
    <>
      <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />

        <Marker position={center} icon={markerIcon} ref={mapRef}>
          <Popup>
            <div className="popup-content">
              <img
                src={mapConfig?.images[0]?.url}
                alt={mapConfig.title}
                className="mr-2"
                width="50"
                height="50"
              />
              <b>
                Bạn đang ở đây, {mapConfig.address.street},&nbsp;
                {mapConfig.address.district.districtName},&nbsp;
                {mapConfig.address.city.cityName}
              </b>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default MarkersMap;
