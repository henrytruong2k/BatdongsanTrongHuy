import React, { useRef } from 'react';
import L from 'leaflet';
import osm from '../../../../../../constants/osm-providers';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useGeoLocation from '../../../../../../components/hooks/useGeoLocation';

function MarkersMap({ mapConfig }) {
  console.log('mapconfigx va x', mapConfig.locationX, mapConfig.locationY);
  const ZOOM_LEVEL = 20;
  const mapRef = useRef(null);
  const center = {
    lat: mapConfig.locationX,
    lng: mapConfig.locationY,
  };
  console.log('center: ', center);
  const markerIcon = new L.icon({
    iconUrl: '/assets/icons/location.svg',
    iconSize: [35, 45],
    popupAnchor: [3, -25],
  });

  const markerHouseIcon = new L.icon({
    iconUrl: '/assets/icons/buildings.svg',
    iconSize: [35, 45],
    popupAnchor: [3, -25],
  });
  console.log(mapRef)
  // const location = useGeoLocation();
  const showMyLocation = () => {
    // if (location.loaded && !location.error) {
    //   // console.log('map: ', mapRef.current.leafletElement);
    //   // mapRef.current?.leafletElement &&
    //   //   mapRef.current.leafletElement.flyTo(
    //   //     [location.coordinates.lat, location.coordinates.lng],
    //   //     ZOOM_LEVEL,
    //   //     { animate: true }
    //   //   );
    //   console.log(
    //     'map: ',
    //     mapRef?.current?.leafletElement &&
    //       mapRef.current.leafletElement.getBounds()
    //   );
    // } else {
    //   alert(location.error.message);
    // }
  };
  return (
    <>
      {/* <div>
        <button onClick={showMyLocation}>Định dạng vị trí của tôi</button>
      </div> */}
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        scrollWheelZoom={false}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />

        {/* {location.loaded && !location.error && (
          <Marker
            icon={markerIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          ></Marker>
        )} */}
        <Marker position={center} icon={markerHouseIcon}>
          <Popup>
            <img
              src={mapConfig?.images[0]?.url}
              alt={mapConfig.title}
              className="mapConfig-detail__image-leaflet"
              width="50"
              height="50"
            />
            <b>Bạn đang ở đây, {mapConfig.address.street}</b>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default MarkersMap;
