import { createSlice } from '@reduxjs/toolkit';

const tableDataSlice = createSlice({
    name: 'tableData',
    initialState: {
        isLoading: true,
        data: [],
        allData: [],
        filterData: [],
        pagination: {
            total: 0,
            count: 1,
        }
    },
    reducers: {
        getTableData(state, action) {
            return {
                ...state,
                allData: action.payload,
                filterData: action.payload,
                data: action.payload.slice(0, 10),
                pagination: {
                    ...state.pagination,
                    total: Math.ceil(action.payload.length / 10),
                }
            }
        },
        setFilterData(state, action) {
            const filterData = state.allData.filter((d) =>
                String(d.id).includes(action.payload)
                || String(d.title).includes(action.payload)
                || String(d.descriprion).includes(action.payload));
            const data = filterData.slice(0, 10);
            return {
                ...state,
                data,
                filterData,
                pagination: {
                    ...state.pagination,
                    total: Math.ceil(filterData.length / 10),
                }
            }
        },
        setPaginationCount(state, action) {
            const startIndex = (action.payload - 1) * 10;
            return {
                ...state,
                data: state.filterData.slice(startIndex, startIndex + 10),
                pagination: {
                    ...state.pagination,
                    count: action.payload,
                }
            }
        },
        setLoading(state, action) {
            return {
                ...state,
                isLoading: action.payload
            }
        },
        sortData(state, action) {
            const { direction, column } = action.payload;

            const sortData = [...state.filterData].sort((a, b) => {
                switch (direction) {
                    case "asc":
                        return a[column] > b[column] ? 1 : -1;
                    case "desc":
                        return a[column] > b[column] ? -1 : 1;
                    default:
                        return 0;
                }
            });

            return {
                ...state,
                filterData: sortData,
                data: sortData.slice(0, 10),
            }
        },
    }
})

export const {
    getTableData,
    setPaginationCount,
    setLoading,
    setFilterData,
    sortData
} = tableDataSlice.actions;
export default tableDataSlice.reducer