import React from 'react';
import { Container } from 'react-bootstrap';
import BoxSearch from './components/BoxSearch';
import NewProjects from './components/NewProjects';
import OtherProjects from './components/OtherProjects';
import useGetProjects from './hooks/useGetProjects';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import 'moment/locale/vi';
import useGetProjectTypes from './hooks/useGetProjectTypes';
moment.locale('vi');

function ProjectContainer(props) {
  const { projectList, type, loading, setProjectList, setLoading, setType } =
    useGetProjects();
  const lastestList = orderBy(
    projectList,
    [
      function (obj) {
        return moment(obj?.createAt);
      },
    ],
    ['desc']
  );
  const { projectTypeList, loadingTypes } = useGetProjectTypes();
  return (
    <Container>
      <BoxSearch
        setProjectList={setProjectList}
        setLoading={setLoading}
        setType={setType}
      />
      <NewProjects projectList={lastestList} loading={loading} type={type} />

      {type !== 'search' && (
        <OtherProjects
          projectList={projectList}
          projectTypeList={projectTypeList}
          loading={loadingTypes}
          loadingTypes={loadingTypes}
        />
      )}
    </Container>
  );
}

export default ProjectContainer;
