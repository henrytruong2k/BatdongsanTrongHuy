import React, { useState, useEffect } from 'react';
import projectAPI from '../../../api/projectAPI';

const useGetProjectTypes = () => {
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [projectTypeList, setProjectTypeList] = useState([]);
  useEffect(() => {
    try {
      const fetchAllPostsOfUser = async () => {
        const response = await projectAPI.getAllTypes();
        setProjectTypeList(response?.data);
        setLoadingTypes(false);
      };
      fetchAllPostsOfUser();
    } catch (error) {
      console.log('Failed to fetch project types: ', error);
    }
  }, []);
  return { projectTypeList, loadingTypes };
};

export default useGetProjectTypes;
