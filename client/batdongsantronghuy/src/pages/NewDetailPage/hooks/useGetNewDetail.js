import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import newAPI from '../../../api/newAPI';

const useGetNewDetail = () => {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [newDetail, setNewDetail] = useState(null);
  useEffect(() => {
    const fetchNewDetail = async () => {
      try {
        const newDetail = await newAPI.getDetailBySlug(slug);
        setNewDetail(newDetail.data);
      } catch (error) {
        console.log('Failed to fetch new detail: ', error);
      }
      setIsLoading(false);
    };
    fetchNewDetail();
  }, [slug]);

  return { newDetail, isLoading };
};

export default useGetNewDetail;
