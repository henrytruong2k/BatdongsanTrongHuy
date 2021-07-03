import React, { useState, useEffect } from 'react';
import newAPI from '../../../api/newAPI';

const useGetNewTypes = () => {
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [newTypeList, setNewTypeList] = useState([]);
  useEffect(() => {
    try {
      const fetchAllTypes = async () => {
        const response = await newAPI.getAllTypes();
        setNewTypeList(response?.data);
        setLoadingTypes(false);
      };
      fetchAllTypes();
    } catch (error) {
      console.log('Failed to fetch new types: ', error);
    }
  }, []);
  return { newTypeList, loadingTypes };
};

export default useGetNewTypes;
