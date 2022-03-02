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
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import { ERROR, SUCCESS } from '../../../store/types';
import { getComparator, stableSort } from '../../../utils/tableSortFunctions';
import showToast from '../../../utils/showToastNotification';
import EnhancedTableHead from '../../../components/table/enhancedTableHead';
import EnhancedTableToolbar from '../../../components/table/enhancedTableToolBar';
import DialogComponent from '../../../components/common/Dialog';
import JNF_PDF from './jnf-pdf/jnfPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

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

export default function MyJNFs() {
  const history = useHistory();
  const [jnfs, setJnfs] = useState([]);
  const [jnfsLoading, setJNFsLoading] = useState(true);
  const [jnfId, setJnfId] = useState('');
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
    setJnfId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = async () => {
    try {
      await api.deleteJNF(jnfId);
      showToast(SUCCESS, 'JNF deleted successfully');
      window.location.reload();
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to delete JNF!';
      showToast(ERROR, message);
    } finally {
      handleClose();
    }
  };

  const openJNF = (id) => {
    history.push(`/dashboard/jnf/${id}`);
  };

  // const previewJNF = (id) => {
  //   history.push(`/dashboard/preview-jnf/${id}`);
  // };

  React.useEffect(async () => {
    try {
      const { data } = await api.getJNFs();
      let res = data;
      res = await Promise.all(
        res.map(async (jnf) => {
          const { data } = await api.getUser(jnf.createdBy);
          jnf.createdBy = data;
          return jnf;
        })
      );
      setJnfs(res);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to fetch data!';
      showToast(ERROR, message);
    } finally {
      setJNFsLoading(false);
    }
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jnfs.length) : 0;

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
      id: 'options',
      numeric: false,
      disablePadding: false,
    },
  ];

  const title = 'Job Notification Forms';

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar title={title} />
      <TableContainer component={Paper}>
        {jnfsLoading && <MiniSpinner />}
        {!jnfsLoading && (
          <Table sx={{ minWidth: 750 }} aria-labelledby={title} size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(jnfs, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((jnf) => {
                  return (
                    <StyledTableRow key={jnf.id} align="center">
                      <StyledTableCell align="center" component="th" scope="row">
                        {jnf.company.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{jnf.jobDesignation}</StyledTableCell>
                      <StyledTableCell align="center">{jnf.gradYear}</StyledTableCell>
                      <StyledTableCell align="center">{jnf.createdBy.name}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="View">
                          <IconButton size="small" sx={{ ml: '5px', mb: '5px' }} onClick={() => openJNF(jnf.id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="PDF Download">
                          <IconButton size="small" sx={{ ml: '5px', mb: '5px', mt: '2px' }}>
                            <PDFDownloadLink
                              document={<JNF_PDF id={jnf.id} fileName="Form" />}
                              style={{ textDecoration: 'none', color: 'currentColor' }}
                            >
                              {({ loading }) => (loading ? <MiniSpinner /> : <FileDownloadIcon />)}
                            </PDFDownloadLink>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" sx={{ ml: '5px', mb: '5px' }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            sx={{ ml: '5px', mb: '5px' }}
                            onClick={() => handleClickOpen(jnf.id)}
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
        count={jnfs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
