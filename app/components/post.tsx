"use client";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Space } from "antd";
import React, { useState } from "react";

interface PostProps {
  item: {
    username: string;
    avatarUser: string;
    title: string;
    date: string;
    content: string;
    likeCount: number;
    isLiked: boolean;
    listAvatar: string[];
    listTag: string[];
    link_preview: string;
  };
}

const Post: React.FC<PostProps> = ({ item }) => {
  const [liked, setLiked] = useState<boolean>(item.isLiked);
  const [likeCount, setLikeCount] = useState<number>(item.likeCount);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    // You may want to send a request to update the server with the new like status and count
  };

  return (
    <Card
      title={
        <Space>
          <Avatar src={item.avatarUser} />
          <div>{item.username}</div>
          <div className="date text-xs text-gray-400">{item.date}</div>
        </Space>
      }
      className="sm:min-w-[100px] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[600px]"
      hoverable
    >
      <div className="text-2xl font-semibold mb-3">{item.title}</div>
      <div>{item.content}</div>
      <Space className="mt-5">
        <HeartFilled
          className={`text-lg ${liked ? "text-rose-500" : ""}`}
          onClick={handleLike}
        />
        {item.listAvatar.map((avatar, index) => (
          <img
            key={index}
            className="avatar"
            src={avatar}
            style={{
              zIndex: index + 1,
              marginLeft: index > 0 ? `-15px` : "0",
            }}
            alt={`Avatar ${index + 1}`}
          />
        ))}
        <div>
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </div>
      </Space>
      <p className="w-full h-15 text-xs text-gray-600 animate-pulse">
        {item.link_preview}
      </p>

      <div className="tags">
        {item.listTag.slice(0, 2).map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
        {item.listTag.length > 2 && (
          <span className="tag">{item.listTag.length - 2} more</span>
        )}
      </div>
    </Card>
  );
};

export default Post;
