import {ACTIONS} from '../actions/post-actions';

const initialState={
    posts: [],
    post:{},
    subreddit:"", 
    errorFetching: false,
    isFetching: false 
}

const postReducer = (state=initialState, action) =>{
    switch (action.type){
        case ACTIONS.REQUEST_POSTS:
        case ACTIONS.REQUEST_POST:{
            return {...state, isFetching: true}
        }
        case ACTIONS.RECEIVE_POSTS:{
            return {...state, 
                posts: {...state.post, [action.payload.subreddit] : action.payload.posts}, 
                subreddit: `r/${action.payload.subreddit}`,
                isFetching: false};
        }
        case ACTIONS.RECEIVE_POST: {
            return {...state, 
                subreddit: action.payload ? action.payload.subreddit_name_prefixed : "",
                post: action.payload, 
                isFetching: false
            }
        }
        case ACTIONS.ERROR_FETCHING: {
            return {...state,
            errorFetching: true,
            isFetching: false}
        }
        default:
            return state;
    }
}


export default postReducer;