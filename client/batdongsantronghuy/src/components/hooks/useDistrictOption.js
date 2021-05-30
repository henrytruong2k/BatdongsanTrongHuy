import React, { useEffect, useState, useRef } from 'react';
import cityAPI from '../../api/cityAPI';

function useDistrictOption(props) {
  const { city } = props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
  const [districts, setDistricts] = useState([]);

  //function reset district
  const selectDistrict = useRef();
  const onClear = () => {
    selectDistrict.current.select.clearValue();
  };
  useEffect(() => {
    try {
      const fetchDistricts = async () => {
        setIsDisabled(true);
        if (city) {
          onClear();
          setIsLoadingDistrict(true);
          const response = await cityAPI.getDistrictsByCityId(city.value);
          setDistricts(response.data);
          setIsLoadingDistrict(false);
          setIsDisabled(false);
        }
      };
      fetchDistricts();
    } catch (error) {
      console.log(error);
    }
  }, [city]);
  const districtOptions = districts.map((item) => {
    return { value: parseInt(item.id), label: item.districtName };
  });
  return { selectDistrict, districtOptions, isLoadingDistrict, isDisabled };
}

export default useDistrictOption;
