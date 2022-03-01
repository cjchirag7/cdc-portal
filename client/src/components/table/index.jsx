import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import { getComparator, stableSort } from '../../utils/tableSortFunctions';
import EnhancedTableHead from './enhancedTableHead';
import EnhancedTableToolbar from './enhancedTableToolBar';
import { StyledTableCell, StyledTableRow } from './styledTableCellAndRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogComponent from '../common/Dialog';
import { PDFDownloadLink } from '@react-pdf/renderer';
import JNF_PDF from '../../Pages/Dashboard/JNFs/jnf-pdf/jnfPDF';

export default function DataTable({ title, DATA, headCells, admin }) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdOn');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [openDownload, setOpenDownload] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    console.log('Form deleted');
    handleClose();
  };

  const handleDownloadOpen = () => {
    setOpenDownload(true);
  };

  const handleDownloadClose = () => {
    setOpenDownload(false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DATA.length) : 0;
  const JNFObject = JSON.parse(localStorage.getItem('JNFObject'));
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar title={title} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby={title} size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(DATA, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow hover tabIndex={-1} key={row.id}>
                      <StyledTableCell align="center"> {row.role} </StyledTableCell>
                      <StyledTableCell align="center">{row.createdBy}</StyledTableCell>
                      <StyledTableCell align="center">{row.company}</StyledTableCell>
                      <StyledTableCell align="center">{row.createdOn}</StyledTableCell>
                      <StyledTableCell align="center">{row.lastEditedOn}</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: '10%' }}>
                        <Tooltip title="View">
                          <IconButton size="small" sx={{ mb: '5px' }} onClick={handleClickOpen}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        {!admin && (
                          <Tooltip title="Edit">
                            <IconButton size="small" sx={{ ml: '5px', mb: '5px' }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {admin && (
                          <Tooltip title="Download">
                            <IconButton size="small" sx={{ ml: '5px', mb: '5px' }} onClick={handleDownloadOpen}>
                              <FileDownloadIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Delete">
                          <IconButton size="small" sx={{ ml: '5px', mb: '5px' }} onClick={handleClickOpen}>
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
                      <Dialog
                        open={openDownload}
                        onClose={handleDownloadClose}
                        BackdropProps={{ style: { backgroundColor: 'rgba(255,255,255,0.2)', boxShadow: 'none' } }}
                        aria-labelledby="Download"
                        aria-describedby="Download jnf/inf"
                      >
                        <DialogTitle id="download">{'Do you want to download student sharable JNF/INF ?'}</DialogTitle>
                        <DialogActions sx={{ justifyContent: 'center' }}>
                          <Button variant="outlined" onClick={handleDownloadClose}>
                            <PDFDownloadLink fileName="Form" document={<JNF_PDF JNFObject={JNFObject} />}>
                              {({ loading }) => (loading ? 'Loading Document' : 'Original')}
                            </PDFDownloadLink>
                          </Button>
                          <Button variant="outlined" onClick={handleDownloadClose}>
                            <PDFDownloadLink
                              fileName="Form"
                              document={<JNF_PDF studentSharable JNFObject={JNFObject} />}
                            >
                              {({ loading }) => (loading ? 'Loading Document' : 'Student sharable')}
                            </PDFDownloadLink>
                          </Button>
                        </DialogActions>
                      </Dialog>
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={DATA.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
