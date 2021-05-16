import React, { useEffect, useState } from 'react';
import projectAPI from '../../api/projectAPI';

function useProjectOptions() {
  const [projects, setProjects] = useState([]);
  const [isLoadingProject, setIsLoadingProject] = useState(true);

  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await projectAPI.getAll();
        setProjects(response?.data);
        setIsLoadingProject(false);
      };
      fetch();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const projectOptions = projects.map((item) => {
    return { value: item.id, label: item.name };
  });
  return { projectOptions, isLoadingProject };
}

export default useProjectOptions;
