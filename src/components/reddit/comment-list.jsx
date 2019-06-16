import React from 'react';
import CommentListItem from './comment-list-item';

const CommentList = ({comments, level}) =>{

    return(
        <div>
            {comments.map((comment,key) =>(
                <div key={`comment-${level}-${key}`}>
                    {
                        <CommentListItem comment={comment} level={level} />
                    }
                </div>   
            ))}
        </div>
    )
};

export default CommentList;