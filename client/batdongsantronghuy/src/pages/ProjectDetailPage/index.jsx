import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import projectAPI from '../../api/projectAPI';
import Loading from '../../components/Loading';
import Wrapper from '../../components/Wrapper';
import ProjectDetailContainer from '../../containers/ProjectDetailContainer';
import useNotifyCount from '../../seo/useNotifyCount';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState(null);
  useEffect(() => {
    const fetchPostDetail = async () => {
      const postDetail = await projectAPI.getDetailBySlug(slug);

      setProject(postDetail?.data);
      setIsLoading(false);
    };
    fetchPostDetail();
  }, [slug]);
  useNotifyCount(project?.name);
  return (
    <Wrapper>
      {isLoading ? <Loading /> : <ProjectDetailContainer project={project} />}
    </Wrapper>
  );
};

export default ProjectDetailPage;
