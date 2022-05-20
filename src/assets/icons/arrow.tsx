import React, { MouseEventHandler } from 'react';

import { makeStyles } from '@mui/styles';

import { directionType } from '../../store/types';

interface ArrowIconProps {
    onClick?: MouseEventHandler;
    direction?: directionType;
}

const useStyles = makeStyles({
    arrow: {
        marginLeft: 10,
        marginRight: 10,
        cursor: "pointer"
    },
    arrow_up: {
        transform: 'rotate(180deg)'
    },
    arrow_disactive: {
        opacity: 0.5
    },
})

function ArrowIcon({ onClick, direction }: ArrowIconProps): React.ReactElement {
    const classes = useStyles();
    return <svg
        className={`${classes.arrow} ${direction === "asc" && classes.arrow_up} ${!direction && classes.arrow_disactive}`}
        onClick={onClick}
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
    >
        <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC" />
        <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white" />
    </svg>
}

export default ArrowIcon;