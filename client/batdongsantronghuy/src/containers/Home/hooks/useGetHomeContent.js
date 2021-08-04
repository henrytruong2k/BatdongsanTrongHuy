import React from 'react';
import homeAPI from '../../../api/homeAPI';

const useGetHomeContent = () => {
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [contentBanners, setContentBanners] = React.useState([]);
  const [postsHighlight, setPostsHighlight] = React.useState([]);

  React.useEffect(() => {
    try {
      const fetchAll = async () => {
        const { data } = await homeAPI.getContents();

        setProjects(data?.projectsHighlight);
        setNews(data?.newsHighlight);
        setContentBanners(data?.contentBanners);
        setPostsHighlight(data?.postsHighlight);
        //loading done of all parts
        setLoading(false);
      };
      fetchAll();
    } catch (error) {
      console.log('Failed to fetch data of home page: ', error);
    }
  }, []);
  return { projects, news, contentBanners, postsHighlight, loading };
};

export default useGetHomeContent;
