import React from 'react';
import { JNF_DATA } from '../../../store/DATA';
import DataTable from '../../../components/table';

const headCells = [
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'createdBy',
    numeric: false,
    disablePadding: false,
    label: 'Created By',
  },
  {
    id: 'company',
    numeric: false,
    disablePadding: false,
    label: 'Company Name',
  },
  {
    id: 'createdOn',
    numeric: false,
    disablePadding: false,
    label: 'Created On',
  },
  {
    id: 'lastEditedOn',
    numeric: false,
    disablePadding: false,
    label: 'Last edit',
  },
];

export default function MyJNFs() {
  return <DataTable title="MY JNFs" DATA={JNF_DATA} headCells={headCells} />;
}
