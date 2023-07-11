import axios from 'axios';

// const addr = 'http://localhost:5000'

// const get = (url, config=null) => axios.get(addr + url, config).then((res) => res.data);
// const post = (url, body=null, config=null) => axios.post(addr + url, body, config).then((res) => res.data);
// const put = (url, body, config=null) => axios.put(addr + url, body, config).then((res) => res.data);
// const deleting = (url, config = null) => axios.delete(addr + url, config).then((res) => res.data);

const get = (url, config=null) => axios.get(url, config).then((res) => res.data);
const post = (url, body=null, config=null) => axios.post(url, body, config).then((res) => res.data);
const put = (url, body, config=null) => axios.put(url, body, config).then((res) => res.data);
const deleting = (url, config=null) => axios.delete(url, config).then((res) => res.data);

// Articles Api
export const getArticles = () => get('/api/articles');
export const getArticleById = (id) => get('/api/articles/' + id);
export const updateArticleById = (id, body, config) => put('/api/articles/' + id, body, config);
export const likeArticleById = (id, config) => post('/api/articles/' + id + '/like', {}, config);
export const createArticle = (body, config) => post('/api/articles', body, config);
export const deleteArticleById = (id, config) => deleting('/api/articles/' + id, config);
export const searchArticle = (searchTerm) => get('/api/articles?searchTerm=' + encodeURIComponent(searchTerm.trim()));

// Categories Api
export const getCategories = () => get('/api/categories');
export const addCategory = (body, config) => post('/api/categories', body, config);

// Tags Api
export const getTags = () => get('/api/tags');
export const addTag = (body, config) => post('/api/tags', body, config);


// Comments Api
export const createComment = (body, config) => post('/api/comments/', body, config);
export const deleteCommentById = (id, config) => deleting('/api/comments/' + id, config);

// Users Api
export const createUser = (body) => post('/api/users/signup', body);
export const loginUser = (body) => post('/api/users/login', body);
export const getUserInfo = (config) => get('/api/users/info', config);