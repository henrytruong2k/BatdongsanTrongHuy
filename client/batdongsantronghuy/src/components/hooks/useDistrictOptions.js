import React, { useEffect, useState } from 'react';
import cityAPI from '../../api/cityAPI';

function useDistrictOptions(id) {
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
  const [districts, setDistricts] = useState([]);
  useEffect(() => {
    try {
      const fetchDistricts = async () => {
        if (!id) {
          return;
        }
        if (id) {
          setIsLoadingDistrict(true);
          const response = await cityAPI.getDistrictsByCityId(id);
          setDistricts(response.data);
          setIsLoadingDistrict(false);
        }
      };
      fetchDistricts();
    } catch (error) {
      console.log('Fail to fetch districts: ', error);
    }
  }, [id]);
  const districtOptions = districts?.map((item) => {
    return { value: parseInt(item.id), label: item.districtName };
  });
  return {
    districts,
    districtOptions,
    isLoadingDistrict,
  };
}

export default useDistrictOptions;
