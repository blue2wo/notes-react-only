import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://knotes-d2406-default-rtdb.firebaseio.com/'
})

export default instance;