import axios from 'axios';

export default axios.create({
  baseURL: `http://caringpmrapi.spurtreetech.com/api/v1/`
});