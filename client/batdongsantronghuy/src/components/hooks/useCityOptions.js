import React, { useEffect, useState } from 'react';
import cityAPI from '../../api/cityAPI';

function useCityOptions() {
  const [cities, setCities] = useState([]);
  const [isLoadingCity, setIsLoadingCity] = useState(true);

  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await cityAPI.getAll();
        const cityOptions = response?.data?.map((item) => {
          return { value: item.id, label: item.cityName };
        });
        localStorage.setItem('cities', JSON.stringify(cityOptions));
        setCities(response?.data);
        setIsLoadingCity(false);
      };
      fetch();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const cityOptions = cities?.map((item) => {
    return { value: item.id, label: item.cityName };
  });

  return { cities, cityOptions, isLoadingCity };
}
export default useCityOptions;
