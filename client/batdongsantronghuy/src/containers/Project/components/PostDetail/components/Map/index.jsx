import React, { useRef } from 'react';
import L from 'leaflet';
import osm from '../../../../../../constants/osm-providers';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map({ post }) {
  const ZOOM_LEVEL = 50;
  const mapRef = useRef();
  const center = {
    lat: post.locationX,
    lng: post.locationY,
  };
  const markerIcon = new L.icon({
    iconUrl: '/location.svg',
    iconSize: [35, 45],
    popupAnchor: [3, -25],
  });

  return (
    <>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
        <Marker position={center} icon={markerIcon}>
          <Popup>
            <img
              src={post?.images[0]?.url}
              alt={post.title}
              className="post-detail__image-leaflet"
            />
            <b>Bạn đang ở đây, {post.address.street}</b>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default Map;
