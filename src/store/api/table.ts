import axios from 'axios';

import { tableDataType } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getTableData = (): Promise<tableDataType[]> => {
    return axios.get(API_URL).then((resp) => resp.data);
}