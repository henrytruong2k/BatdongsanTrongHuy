import React from 'react';
import homeAPI from '../../../api/homeAPI';

const useGetHomeContent = () => {
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [contentBanners, setContentBanners] = React.useState([]);

  React.useEffect(() => {
    try {
      const fetchAll = async () => {
        const { data } = await homeAPI.getContents();

        setProjects(data?.projectsHighlight);
        setNews(data?.newsHighlight);
        setContentBanners(data?.contentBanners);

        //loading done of all parts
        setLoading(false);
      };
      fetchAll();
    } catch (error) {
      console.log('Failed to fetch data of home page: ', error);
    }
  }, []);
  return { projects, news, contentBanners, loading };
};

export default useGetHomeContent;
