import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getComparator, stableSort } from '../../utils/tableSortFunctions';
import EnhancedTableHead from './enhancedTableHead';
import EnhancedTableToolbar from './enhancedTableToolBar';
import { StyledTableCell, StyledTableRow } from './styledTableCellAndRow';
import DialogComponent from '../common/Dialog';

export default function DataTable({ title, DATA, headCells, admin }) {
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DATA.length) : 0;

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
                      <StyledTableCell align="right" sx={{ width: '15%' }}>
                        {!admin && (
                          <Button variant="outlined" startIcon={<EditIcon />} size="small" sx={{ mb: '5px' }}>
                            Edit
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          size="small"
                          sx={{ ml: '5px', mb: '5px' }}
                          onClick={handleClickOpen}
                        >
                          {' '}
                          Delete{' '}
                        </Button>
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
