import React, { useState, useEffect } from 'react';
import projectAPI from '../../../api/projectAPI';

const useGetProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState([]);
  const [type, setType] = useState(null);
  useEffect(() => {
    try {
      const fetchAllPostsOfUser = async () => {
        const response = await projectAPI.getAll();
        setProjectList(response?.data);
        setLoading(false);
      };
      fetchAllPostsOfUser();
    } catch (error) {
      console.log('Failed to fetch projects: ', error);
    }
  }, []);
  return { projectList, type, loading, setProjectList, setLoading, setType };
};

export default useGetProjects;
