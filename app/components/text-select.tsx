"use client"
import { DeleteOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Space } from "antd";

function TextSelect({ color, content }: { color: string, content: string }) {

  const shareBookmark = () => {

  }

  const deleteBookmark = () => {

  }

  return (
    <div className={`border-l-[6px] border-${color} pl-4 relative`}>
      <p>Flex box grid </p>
      <p>Grid Template Columns</p>
      <p>Utilities for specifying the columns in a grid layout</p>
      <Space className="absolute top-0 right-0 text-lg">
        <ShareAltOutlined className="hover:text-sky-500" onClick={shareBookmark} />
        <DeleteOutlined className="hover:text-rose-500" onClick={deleteBookmark} />
      </Space>
    </div>
  );
}

export default TextSelect;
