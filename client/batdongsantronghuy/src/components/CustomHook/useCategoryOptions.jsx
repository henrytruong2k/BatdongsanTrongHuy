import React, { useEffect, useState } from 'react';
import categoryAPI from '../../api/categoryAPI';

function useCategoryOptions() {
  const [categories, setCategories] = useState([]);
  const [isLoadingOption, setIsLoadingOption] = useState(true);

  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await categoryAPI.getAll();
        setCategories(response?.data);
        setIsLoadingOption(false);
      };
      fetch();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const categoryOptions = categories.map((item) => {
    return { value: item.id, label: item.name };
  });
  return { categoryOptions, isLoadingOption };
}
export default useCategoryOptions;
