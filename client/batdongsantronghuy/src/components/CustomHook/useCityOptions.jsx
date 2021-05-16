import React, { useEffect, useState } from 'react';
import cityAPI from '../../api/cityAPI';
import postAPI from '../../api/postAPI';

function useCityOptions() {
  const [cities, setCities] = useState([]);
  const [isLoadingCity, setIsLoadingCity] = useState(true);

  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await cityAPI.getAll();
        setCities(response?.data);
        setIsLoadingCity(false);
      };
      fetch();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const cityOptions = cities.map((item) => {
    return { value: item.id, label: item.cityName };
  });
  return { cityOptions, isLoadingCity };
}
export default useCityOptions;
