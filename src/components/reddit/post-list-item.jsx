import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Row, Col} from 'react-bootstrap';
import reddit from '../../style/images/reddit.svg';

const PostListItem = props =>{
    const hasThumbnail = props.post.thumbnail && !props.post.is_self && props.post.thumbnail !== "self" && props.post.thumbnail !== "nsfw" ;
    return (
        <Link to={`/view/${props.post.id}`} className="submission-link">
        <Card className="submission">
            <Row>
                
                <Col xs={12} md={2} className={hasThumbnail? 'd-block':'d-none d-md-block'}>
                    <img src={hasThumbnail? props.post.thumbnail : reddit} className='thumbnail' alt="thumbnail"/>
                </Col>
                
                <Col xs={12} md={10}>
                    <div className="title">
                        <h3>{props.post.title}</h3>
                    </div>
                    <div className="author">
                        Post by {props.post.author.name}
                    </div>
                    
                    <div className="comment-group">
                        {props.post.num_comments} Comments
                    </div>
                </Col>
            </Row>

        </Card>
    </Link>
)}

export default PostListItem;