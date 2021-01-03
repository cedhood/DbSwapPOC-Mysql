import React, { useState, useEffect } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import DepartmentService from '../../services/DepartmentService';
import {
  Container,
  HeaderArea,
  DepartmentsTitle as HeaderTitle,
  GridContainer,
} from './styles';
import RefreshButton from '../../components/RefreshButton';
import ErrorMessage from '../../components/ErrorMessage';
import { useContext } from 'react';
import DbTypeContext from '../../contexts/DbTypeContext';

const columns = [
  { name: 'departmentID', header: 'ID', defaultFlex: 1 },
  { name: 'name', header: 'Name', defaultFlex: 4 },
  { name: 'groupName', header: 'Group', defaultFlex: 3 },
  { name: 'modifiedDate', header: 'Modified', defaultFlex: 2 },
];

const Departments = () => {

  const [departments, setDepartments] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentDbType } = useContext(DbTypeContext);

  const loadDepartments = async () => {
    setDepartments([]);
    setHasErrors(false);
    setLoading(true);

    try {
      const depts = await DepartmentService.getAllAsync();
      setDepartments(depts);  
    } catch (e) {
      console.error(e);
      setHasErrors(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    loadDepartments();
  }, [currentDbType]);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Departments</HeaderTitle>
        <RefreshButton onClick={loadDepartments} />
      </HeaderArea>
      
      <GridContainer>
        {hasErrors && <ErrorMessage onRefresh={loadDepartments} />}
        {loading && <h6>Loading</h6>}
        {!loading && departments && departments.length > 0 && 
            <ReactDataGrid 
            columns={columns}
            dataSource={departments}
            style={{ minHeight: 500 }}
            pagination="local" />
        }
          
          
      </GridContainer>      
    </Container>
  )

}

export default Departments;