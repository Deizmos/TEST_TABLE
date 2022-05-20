import React from 'react';

import { useNavigate } from 'react-router-dom';

import {
  TableCell,
  TableHead as TableHeadMui,
  TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import ArrowIcon from '../../assets/icons/arrow';
import {
  columnName,
  sortInfoType,
} from '../../store/types';

const useStyles = makeStyles({
    head: {
        backgroundColor: '#474955',
    },

    row: {
        borderStyle: 'none',
        background: '#474955',

        '& .MuiTableCell-head': {
            color: 'white',
            background: '#474955',
        },
    },

    column_id: {
        width: '8%',
    },

    column_title: {
        width: '45%',
    },
});

interface TableHeadProps {
    sortInfo: sortInfoType;
    setSortInfo: React.Dispatch<React.SetStateAction<sortInfoType>>;
}


function TableHead({ sortInfo, setSortInfo }: TableHeadProps): React.ReactElement {
    const navigate = useNavigate();
    const classes = useStyles();

    /**
     * Функция которая записывает в переменную sortInfo данные о столбце и типе сортировки
     * @param column - название столбца для сортировки
     */
    const handleSortData = (column: columnName) => {
        if (sortInfo.column === column) {
            setSortInfo((sort) => ({
                column,
                direction: sort.direction === 'asc' ? 'desc' : 'asc'
            }))
        } else {
            setSortInfo(() => ({
                column,
                direction: 'asc'
            }))
        }
        navigate('/1')
    }

    return (
        <TableHeadMui className={classes.head}>
            <TableRow className={classes.row}>
                <TableCell className={classes.column_id}>
                    ID
                    <ArrowIcon
                        direction={sortInfo.column === 'id' ? sortInfo.direction : undefined}
                        onClick={() => handleSortData('id')}
                    />
                </TableCell>
                <TableCell className={classes.column_title}>
                    Заголовок
                    <ArrowIcon
                        direction={sortInfo.column === 'title' ? sortInfo.direction : undefined}
                        onClick={() => handleSortData('title')}
                    />
                </TableCell>
                <TableCell>
                    Описание
                    <ArrowIcon
                        direction={sortInfo.column === 'body' ? sortInfo.direction : undefined}
                        onClick={() => handleSortData('body')}
                    />
                </TableCell>
            </TableRow>
        </TableHeadMui>
    );
}

export default TableHead;