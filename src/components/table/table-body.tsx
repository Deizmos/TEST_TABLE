import React from 'react';

import { useSelector } from 'react-redux';

import {
  CircularProgress,
  TableBody as TableBodyMui,
  TableCell,
  TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { RootState } from '../../store/store';
import { tableDataType } from '../../store/types';

const useStyles = makeStyles({
    table_row: {
        border: '1px solid #E3E6EC',
    },
});


function TableBody(): React.ReactElement {
    const classes = useStyles();
    const tableData = useSelector((state: RootState) => state.tableData.data)
    const isLoading = useSelector((state: RootState) => state.tableData.isLoading)

    return (
        <TableBodyMui>
            {isLoading && <CircularProgress />}
            {!isLoading && !!tableData.length &&
                tableData.map((data: tableDataType) => <TableRow key={data.id}>
                    <TableCell align="center" className={classes.table_row}>{data.id}</TableCell>
                    <TableCell className={classes.table_row}>{data.title}</TableCell>
                    <TableCell className={classes.table_row}>{data.body}</TableCell>
                </TableRow>)}
        </TableBodyMui>
    );
}

export default TableBody;