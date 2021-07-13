import React, { useEffect, useState } from 'react';
import homeAPI from '../../../api/homeAPI';

const useProjectHome = () => {
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    try {
      const fetchAll = async () => {
        const response = await homeAPI.getContents();

        setProjects(response.data.projectsHighlight);
        setLoadingProjects(false);
      };
      fetchAll();
    } catch (error) {
      console.log('Failed to fetch projects: ', error);
    }
  });
  return { projects, loadingProjects };
};

export default useProjectHome;
