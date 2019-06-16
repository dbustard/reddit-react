import React from 'react';
import {connect} from 'react-redux';
import PostListItem from './post-list-item';
import {fetchPosts} from '../../actions/post-actions';
import {Row, Col} from 'react-bootstrap';

class PostList extends React.Component
{
    componentDidMount = () =>{
        this.props.fetchPosts(this.props.match.params.subreddit, this.props.match.params.sort);
    }

    render = () =>{
        const posts = this.props.posts[this.props.match.params.subreddit];
        const hasPosts = posts && posts.length > 0;
        return (
            <div>
                {
                hasPosts ? (
                    <Row>
                        {posts.map ((post,key)=>
                        (<Col xs={12} key={key}>
                            <PostListItem post={post} />
                        </Col>)  
                        )}
                    </Row>
                )
                : (
                    <h2>No post to display</h2>
                )
                }
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        posts: state.post.posts
    }
}   

const mapDispatchToProps = dispatch =>{
    return{
        fetchPosts: (subreddit, sort) =>{
            dispatch(fetchPosts(subreddit, sort));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList);