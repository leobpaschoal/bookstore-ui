import axios from 'axios';

export default () => {
  const api = 'https://leopaschoalbookstore.herokuapp.com/';
  return axios.create({ baseURL: api });
};
