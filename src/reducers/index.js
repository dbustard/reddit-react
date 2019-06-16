import postReducer from './post-reducer';

var {combineReducers} = require('redux');

export default combineReducers({
    post: postReducer
});