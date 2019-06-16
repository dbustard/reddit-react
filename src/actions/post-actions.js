import snoowrap from 'snoowrap';
import config from '../config';

export const ACTIONS = {
    REQUEST_POSTS:'REQUEST_POSTS',
    RECEIVE_POSTS: 'RECEIVE_POSTS',
    REQUEST_POST: 'REQUEST_POST',
    RECEIVE_POST: 'RECEIVE_POST',
    ERROR_FETCHING: 'ERROR_FETCHING'
}

export const requestPosts = () =>
{
    return { type: ACTIONS.REQUEST_POSTS }
}

export const fetchPosts = (subreddit, sort) =>{
    return (dispatch, getState) =>{
        const state = getState();
        if (couldFetchPosts(state)){
            dispatch (requestPosts());
            const r = new snoowrap(config.snoowrap);
            const sortKey = sort ? `get${sort.charAt(0).toUpperCase() + sort.toLowerCase().slice(1)}` : 'getHot';
            r.getSubreddit(subreddit)[sortKey]().then(
                result=>{
                    dispatch(recievePosts(subreddit, result));
                }
            ).catch(
                error =>{
                    dispatch(errorFetching());
                }
            )
        }
    }
}

export const couldFetchPosts = (state) =>{
    const {isFetching} = state.post.isFetching;
    return !isFetching;
}

export const recievePosts = (subreddit, posts) =>{
    return {
        type: ACTIONS.RECEIVE_POSTS,
        payload: {
            subreddit,
            posts
        }
    }
}

export const requestPost = () =>{
    return {
        type: ACTIONS.REQUEST_POST,
    }
}

export const receivePost = (post) =>{
    return {
        type: ACTIONS.RECEIVE_POST,
        payload: post
    }
}


export const errorFetching = () =>{
    return {
        type: ACTIONS.ERROR_FETCHING
    }
}
export const fetchPost = (id) =>{
    return (dispatch, getState) =>{
        const state = getState();
        dispatch(requestPost());
        if (couldFetchPosts(state)){
            const r = new snoowrap(config.snoowrap);
            r.getSubmission(id).fetch().then(
                result=>{
                    dispatch(receivePost(result));
                }
            ).catch(
                error =>{
                    dispatch(errorFetching());
                }
            )
        }
    }
}