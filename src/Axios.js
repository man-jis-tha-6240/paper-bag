import axios from 'axios';
const instance=axios.create({
	baseURL: 'https://paper-bag.onrender.com',
});
export default instance;