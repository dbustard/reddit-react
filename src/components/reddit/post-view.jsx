import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, Dropdown} from 'react-bootstrap';
import ReactHtmlParser  from 'react-html-parser';
import CommentList from './comment-list';
import {fetchPost} from '../../actions/post-actions';
import Clipboard from 'react-clipboard.js';

const PostView = props =>{
    if (props.isFetching){
        return (
            <div>loading...</div>
        )
    }
    
    const id = props.match.params.id;
    if (!props.post || props.post.id !== id){
        props.fetchPost(id);
        return null;
    }

    console.log('props.post', props.post);

    const {title,is_self, selftext_html, media_embed, url, created, author, permalink} =  props.post || {} ;
    const html = is_self ? ReactHtmlParser(selftext_html) : null;
    const media = media_embed ? ReactHtmlParser(media_embed.content) : null;
    const comments = props.post.comments && props.post.comments.length > 0 ? props.post.comments : [];
    const posted = new Date(created).toISOString().split('T')[0];
    const isImage = url.match(/.(jpg|jpeg|png|gif)$/i);

    return(
    <div className="post-view">
        <Row>
            <Col xs={12} md={8}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={8}>
                                Posted by u/{author.name} on {posted}
                            </Col>
                            <Col xs={4} className="text-right">
                                <div  className='options'>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Share
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item  as={Clipboard} data-clipboard-text={`https://reddit.com${permalink}`} onSuccess={()=>{alert('Copied link!')}}>Copy link</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Card.Title>
                            <h2>{title}</h2>
                        </Card.Title>
                        <div>

                            {html &&
                                <div>
                                    {html}
                                </div>
                            }

                            {url && !is_self &&
                                <a href={url} target="_blank" rel="noopener noreferrer" >{url}</a>
                            }

                            {media && 
                                <div className="media_embed">
                                    <div>
                                        {media}
                                    </div>
                                </div>
                            }

                            { isImage &&
                                <div className="image_embed">
                                    <img src={url} alt={title} />
                                </div>
                            }

                        </div>
                        {
                            comments.length > 0 &&
                            <div className="comments">
                                <h3>Comments:</h3>
                                <div className="comment-group">
                                    <CommentList comments={comments} level={0} />
                                </div>
                            </div>
                        }
                    </Card.Body>
                </Card>
               

            </Col>
        </Row>

    </div>
)}

const mapStateToProps = state =>{
    return {
        post: state.post.post,
        isFetching: state.post.isFetching
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchPost: (id)=>{
            dispatch(fetchPost(id));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PostView);