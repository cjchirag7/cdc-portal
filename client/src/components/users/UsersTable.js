import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import Warning from '@mui/icons-material/Warning';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { red, green } from '@mui/material/colors';

const columns = [
  { id: 'name', label: 'Name', format: (value) => value.toLocaleString('en-US') },
  {
    id: 'email',
    label: 'Email',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'role',
    label: 'Role',
    align: 'center',
    format: (value) => value.charAt(0).toUpperCase() + value.substr(1).toLowerCase(),
  },
  {
    id: 'isEmailVerified',
    label: 'Verified?',
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 120,
    align: 'center',
  },
];

function UsersTable(props) {
  const { onEditClick, onDeleteClick, isDeleting, usersData, colIdForDelete } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontSize: '18px' }}>
                <>{column.label}</>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((row, rowId) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={rowId.toString()}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      <>
                        {column.format ? column.format(value) : null}
                        {column.id === 'isEmailVerified' ? (
                          value === true ? (
                            <Tooltip title="Email is verified.">
                              <VerifiedUser style={{ color: green[800] }} />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Email is not verified yet.">
                              <Warning style={{ color: red[800] }} />
                            </Tooltip>
                          )
                        ) : null}
                        {column.id === 'actions' ? (
                          <div
                            className="actionBtnGrp"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                          >
                            <Button
                              aria-label="edit"
                              onClick={() => {
                                onEditClick(row, rowId);
                              }}
                              variant="contained"
                              startIcon={<Edit />}
                            >
                              Edit
                            </Button>
                            <Button
                              aria-label="delete"
                              onClick={() => {
                                onDeleteClick(row, rowId);
                              }}
                              variant="contained"
                              color="error"
                              disabled={colIdForDelete === rowId ? isDeleting : false}
                              startIcon={colIdForDelete === rowId ? isDeleting ? null : <Delete /> : <Delete />}
                              style={{ marginLeft: 4 }}
                            >
                              {colIdForDelete === rowId ? (
                                isDeleting ? (
                                  <>
                                    {'Deleting '}
                                    <CircularProgress color="error" size={24} />
                                  </>
                                ) : (
                                  'Delete'
                                )
                              ) : (
                                'Delete'
                              )}
                            </Button>
                          </div>
                        ) : null}
                      </>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
