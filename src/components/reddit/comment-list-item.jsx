import React from 'react';
import ReactHtmlParser  from 'react-html-parser';
import CommentList from './comment-list';
import {Accordion, Button} from 'react-bootstrap';

const CommentListItem = ({comment, level}) =>{
    const body = ReactHtmlParser(comment.body);
    return (
        <div className={`comment-item comment-level-${level}`}>
            <div>
                <div className="comment-name">
                    u/{comment.author.name}
                </div>
                <div>
                    {body}
                </div>
                {comment.replies && comment.replies.length > 0 && 
                    <Accordion>
                        <Accordion.Toggle as={Button}  variant="link" eventKey="0">
                            Show {comment.replies.length} comments
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div className="comment-group">
                                <CommentList comments={comment.replies} level={level+1} />
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                }
            </div>
                
        </div>
    )
};

export default CommentListItem;