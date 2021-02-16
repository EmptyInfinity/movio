import axios from 'axios';

export const upload = (file) => {
  const formData = new FormData();

  formData.append('meta', JSON.stringify(file));
  if (file instanceof File) formData.append('filedata', file);

  return axios({ url: '/api/movies/upload', method: 'post', data: formData });
};

export const save = async (data) => {
  return await axios({ url: '/api/movies', method: 'post', data });
};

export const fetchAll = async () => await axios.get('/api/movies');

export const remove = async (id) => await axios.delete(`/api/movies/${id}`);

export default {
  save,
  fetchAll,
  remove,
  upload,
};
