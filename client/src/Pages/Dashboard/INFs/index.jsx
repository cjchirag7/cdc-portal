import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../../api';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import MiniSpinner from '../../../components/common/MiniSpinner';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ERROR, SUCCESS } from '../../../store/types';
import { getComparator, stableSort } from '../../../utils/tableSortFunctions';
import showToast from '../../../utils/showToastNotification';
import EnhancedTableHead from '../../../components/table/enhancedTableHead';
import EnhancedTableToolbar from '../../../components/table/enhancedTableToolBar';
import DialogComponent from '../../../components/common/Dialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function INFList() {
  const history = useHistory();
  const [infs, setInfs] = useState([]);
  const [infsLoading, setINFsLoading] = useState(true);
  const [infId, setInfId] = useState('');
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdOn');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (id) => {
    setInfId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = async () => {
    try {
      await api.deleteINF(infId);
      showToast(SUCCESS, 'INF deleted successfully');
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to delete INF!';
      showToast(ERROR, message);
    } finally {
      handleClose();
    }
  };

  const openINF = (id) => {
    history.push(`/dashboard/inf/${id}`);
  };

  React.useEffect(async () => {
    try {
      const { data } = await api.getINFs();
      let res = data.results;
      res = await Promise.all(
        res.map(async (inf) => {
          const { data } = await api.getUser(inf.createdBy);
          inf.createdBy = data;
          return inf;
        })
      );
      setInfs(res);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to fetch data!';
      showToast(ERROR, message);
    } finally {
      setINFsLoading(false);
    }
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - infs.length) : 0;

  const headCells = [
    {
      id: 'company',
      numeric: false,
      disablePadding: false,
      label: 'Company Name',
    },
    {
      id: 'role',
      numeric: false,
      disablePadding: false,
      label: 'Job Designation',
    },
    {
      id: 'gradYear',
      numeric: false,
      disablePadding: false,
      label: 'Graduation Year',
    },
    {
      id: 'createdBy',
      numeric: false,
      disablePadding: false,
      label: 'Created By',
    },
    {
      id: 'view',
      numeric: false,
      disablePadding: false,
      label: 'View',
    },
    {
      id: 'delete',
      numeric: false,
      disablePadding: false,
      label: 'Delete',
    },
  ];

  const title = 'Internship Notification Forms';

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar title={title} />
      <TableContainer component={Paper}>
        {infsLoading && <MiniSpinner />}
        {!infsLoading && (
          <Table sx={{ minWidth: 750 }} aria-labelledby={title} size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(infs, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((inf) => {
                  return (
                    <StyledTableRow key={inf.id} align="center">
                      <StyledTableCell component="th" scope="row">
                        {inf.company.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{inf.jobDesignation}</StyledTableCell>
                      <StyledTableCell align="center">{inf.gradYear}</StyledTableCell>
                      <StyledTableCell align="center">{inf.createdBy.name}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="View">
                          <IconButton size="small" sx={{ ml: '5px', mb: '5px' }} onClick={() => openINF(inf.id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            sx={{ ml: '5px', mb: '5px' }}
                            onClick={() => handleClickOpen(inf.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      <DialogComponent
                        open={open}
                        handleClose={handleClose}
                        handleYes={handleYes}
                        label="Delete"
                        title="Are you sure you want to delete this form ?"
                      />
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={infs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
