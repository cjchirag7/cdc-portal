import React, { useCallback, useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Slide from '@mui/material/Slide';
import showToast from '../../../utils/showToastNotification';
import TablePaginationActions from '../../../components/common/TablePaginationActions';
import { ERROR } from '../../../store/types';
import * as api from '../../../api/index';
import CreateUserDialog from '../../../components/users/CreateUserDialog';
import EditUserDialog from '../../../components/users/EditUserDialog';
import DeleteUserDialog from '../../../components/users/DeleteUserDialog';
import UsersTable from '../../../components/users/UsersTable';
import Loader from '../../../components/common/Loader';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [dataE, setDataE] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [totalResults, setTotalResults] = useState(0);
  const [paginationData, setPaginationData] = useState({
    page: 0,
    rowsPerPage: 5,
  });
  const [isfetching, setIsFetching] = useState(true);

  const { page, rowsPerPage } = paginationData;

  const fetchUsers = useCallback(async () => {
    try {
      setIsFetching(true);
      const { data } = await api.getAllUsers({
        limit: rowsPerPage,
        page: page + 1,
      });
      setTotalResults(data.totalResults);
      setUsersData(data.results);
    } catch (e) {
      const message = e?.response?.data?.message || 'Error in loading users!';
      showToast(ERROR, message);
    } finally {
      setIsFetching(false);
    }
  }, [page, rowsPerPage, setIsFetching, setTotalResults, setUsersData]);

  useEffect(() => {
    fetchUsers();
  }, [paginationData, fetchUsers]);

  const handleChangePage = (event, newPage) => {
    setPaginationData({ ...paginationData, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPaginationData({
      ...paginationData,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const [idEditUser, setIdEditUser] = useState('');
  const [colIdEditUser, setColIdEditUser] = useState('');

  const [idForDelete, setIdForDelete] = useState('');
  const [colIdForDelete, setColIdForDelete] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    setOpenDialogDelete(false);
    try {
      await api.deleteUser(idForDelete);
      const dataDelete = [...usersData];
      dataDelete.splice(colIdForDelete, 1);
      setUsersData([...dataDelete]);
    } catch (e) {
      const message = e?.response?.data?.message || 'Error in deleting user!';
      showToast(ERROR, message);
    } finally {
      setIsDeleting(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {isfetching ? (
        <Loader />
      ) : (
        <>
          <div
            className="tableHeader"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'center', margin: '0 auto' }}>
              <Typography variant="h4" component="h4">
                Users
              </Typography>
            </div>
            <div className="tableHeaderAction">
              <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenDialogCreate(true)}>
                Add User
              </Button>
            </div>
          </div>
          <br />
          <UsersTable
            usersData={usersData}
            colIdForDelete={colIdForDelete}
            onEditClick={(row, rowId) => {
              setOpenDialogEdit(true);
              setIdEditUser(row.id);
              setColIdEditUser(rowId);
              const newDataE = {
                name: row['name'],
                email: row['email'],
                role: row['role'],
              };
              setDataE(newDataE);
            }}
            onDeleteClick={(row, rowId) => {
              setOpenDialogDelete(true);
              setIdForDelete(row.id);
              setColIdForDelete(rowId);
            }}
            isDeleting={isDeleting}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            component="div"
            count={totalResults}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
          <DeleteUserDialog
            openDialog={openDialogDelete}
            Transition={Transition}
            handleCloseDialog={() => {
              setOpenDialogDelete(false);
            }}
            handleDelete={handleDelete}
          />
          <CreateUserDialog
            openDialogCreate={openDialogCreate}
            setOpenDialogCreate={setOpenDialogCreate}
            Transition={Transition}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            showPassword={showPassword}
            usersData={usersData}
            setUsersData={setUsersData}
          />
          <EditUserDialog
            openDialogEdit={openDialogEdit}
            setOpenDialogEdit={setOpenDialogEdit}
            Transition={Transition}
            dataE={dataE}
            setDataE={setDataE}
            usersData={usersData}
            setUsersData={setUsersData}
            idEditUser={idEditUser}
            colIdEditUser={colIdEditUser}
          />
        </>
      )}
    </>
  );
};

export default Users;
