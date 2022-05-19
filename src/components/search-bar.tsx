import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import styled from '@emotion/styled';
import {
    Box,
    InputBase
} from '@mui/material/index';
import { makeStyles } from '@mui/styles';

import SearchIcon from '../assets/icons/search';
import { setFilterData } from '../store/reducers/tableData';

const SearchBar = styled(Box)({
    width: 631,
    height: 52,
    padding: '0 26px',
    marginLeft: 78,
    background: '#5A5C66',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,

});

const SearchText = styled(InputBase)({
    color: '#B2B7BF',
});

const useStyles = makeStyles({
    input: {
        width: "500px",
    },
});


function Search(): React.ReactElement {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [value, setValue] = useState("");


    return <SearchBar>
        <SearchText
            className={classes.input}
            placeholder='Поиск'
            onChange={(event) => setValue(event.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    dispatch(setFilterData(value))
                    navigate('/1')
                }
            }}
        />
        <SearchIcon onClick={() => {
            dispatch(setFilterData(value))
            navigate('/1')
        }} />
    </SearchBar>
};

export default Search;
