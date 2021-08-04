import React from 'react';

const PostInfo = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>

      <h4 className="mt-lg-3">Thông tin mô tả</h4>
      <p
        dangerouslySetInnerHTML={{ __html: post.description }}
        className="mb-lg-3"
      ></p>
    </div>
  );
};

export default PostInfo;
