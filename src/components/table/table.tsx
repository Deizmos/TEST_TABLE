import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  Pagination,
  Table as TableMui,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { getTableData } from '../../store/api/table';
import {
  setLoading,
  setPaginationCount,
  setTableData,
  sortData,
} from '../../store/reducers/tableData';
import { RootState } from '../../store/store';
import { sortInfoType } from '../../store/types';
import EmptyTable from './empty-table';
import TableBody from './table-body';
import TableHead from './table-head';

const useStyles = makeStyles({
    paggination: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
    },
});


function Table(): React.ReactElement {
    const navigate = useNavigate();
    const { page } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [sortInfo, setSortInfo] = useState<sortInfoType>({ direction: 'asc', column: 'id' });

    const pagination = useSelector((state: RootState) => state.tableData.pagination)
    const tableData = useSelector((state: RootState) => state.tableData.data)
    const isLoading = useSelector((state: RootState) => state.tableData.isLoading)

    useEffect(() => {
        getTableData().then((resp) => {
            dispatch(setTableData(resp))
        }).then(() => {
            dispatch(setPaginationCount(Number(page)));
            dispatch(setLoading(false));
        });
    }, []);

    useEffect(() => {
        dispatch(setPaginationCount(Number(page)));
    }, [page]);

    useEffect(() => {
        dispatch(sortData(sortInfo))
    }, [sortInfo]);

    return (
        <>
            <TableMui>
                <TableHead setSortInfo={setSortInfo} sortInfo={sortInfo} />
                <TableBody />
            </TableMui>
            {!isLoading && !tableData.length && <EmptyTable />}
            {!!pagination.total && <Pagination
                className={classes.paggination}
                count={pagination.total}
                page={pagination.count}
                onChange={(_, val) => navigate(`/${val}`)}
            />}
        </>
    );
}

export default Table;