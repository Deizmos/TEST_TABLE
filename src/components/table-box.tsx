import React, {
    useEffect,
    useState
} from 'react';

import axios from 'axios';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    useNavigate,
    useParams
} from 'react-router-dom';

import {
    CircularProgress,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import ArrowIcon from '../assets/icons/arrow';
import {
    getTableData,
    setLoading,
    setPaginationCount,
    sortData
} from '../store/reducers/tableData';
import { RootState } from '../store/store';

const useStyles = makeStyles({
    container: {
        width: 1077,
        marginLeft: 78,
    },

    head: {
        backgroundColor: '#474955',
        width: 1077,
    },

    row: {
        borderStyle: 'none',
        background: '#474955',

        '& .MuiTableCell-head': {
            color: 'white',
            background: '#474955',
        },
    },

    table_row: {
        border: '1px solid #E3E6EC',
    },

    row_id: {
        width: 50,
    },

    arrow: {
        paddingLeft: 10,
    },

    paggination: {
        display: 'flex',
        justifyContent: 'center',
    },
});

export type columnName = 'id' | 'title' | 'description';
export type directionType = 'asc' | 'desc';

function Tables(): React.ReactElement {
    const navigate = useNavigate();
    const { page } = useParams();
    const [sortInfo, setSortInfo] = useState<{ direction: directionType; column: columnName }>({ direction: 'asc', column: 'id' });
    const classes = useStyles();
    const dispatch = useDispatch();
    const tableData = useSelector((state: RootState) => state.tableData.data)
    const pagination = useSelector((state: RootState) => state.tableData.pagination)
    const isLoading = useSelector((state: RootState) => state.tableData.isLoading)

    useEffect(() => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
        axios.get(apiUrl).then((resp: any) => {
            dispatch(getTableData(resp.data))
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

    const handleSortData = (column: columnName) => {
        if (sortInfo.column === column)
            setSortInfo((sort) => ({
                column,
                direction: sort.direction === 'asc' ? 'desc' : 'asc'
            }))
        else
            setSortInfo(() => ({
                column,
                direction: 'asc'
            }))
        navigate('/1')
    }

    return (
        <TableContainer className={classes.container}>
            <Table>
                <TableHead className={classes.head}>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.row_id}>
                            ID
                            <ArrowIcon
                                direction={sortInfo.column === 'id' ? sortInfo.direction : undefined}
                                onClick={() => handleSortData('id')}
                            />
                        </TableCell>
                        <TableCell>
                            Заголовок
                            <ArrowIcon
                                direction={sortInfo.column === 'title' ? sortInfo.direction : undefined}
                                onClick={() => handleSortData('title')}
                            />
                        </TableCell>
                        <TableCell>
                            Описание
                            <ArrowIcon
                                direction={sortInfo.column === 'description' ? sortInfo.direction : undefined}
                                onClick={() => handleSortData('description')}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading && <CircularProgress />}
                    {!isLoading && !tableData.length && <p>No data</p>}
                    {!isLoading && !!tableData.length &&
                        tableData.map((data: any) => <TableRow key={data.id}>
                            <TableCell align="center" className={classes.table_row}>{data.id}</TableCell>
                            <TableCell className={classes.table_row}>{data.title}</TableCell>
                            <TableCell className={classes.table_row}>{data.body}</TableCell>
                        </TableRow>)}
                </TableBody>

            </Table>
            {!!tableData.length && <Pagination
                className={classes.paggination}
                count={pagination.total}
                page={pagination.count}
                onChange={(_, val) => navigate(`/${val}`)}
            />}
        </TableContainer>
    );
}

export default Tables;