import React, { useEffect, useState } from 'react';

function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 10.7716003, lng: 106.6991629 },
  });

  const onSuccess = (location) => {
    console.log('onSuccess');
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };
  const onError = (error) => {
    setLocation({
      ...location,
      loaded: true,
      error,
    });
  };
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}

export default useGeoLocation;
