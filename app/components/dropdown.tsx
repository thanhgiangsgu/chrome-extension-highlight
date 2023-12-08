import React from 'react';
import { MoreOutlined, FilePdfOutlined, Html5Outlined, DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const DropdownMenu: React.FC = () => {
    const items: MenuProps['items'] = [
        {
            label: <Space><FilePdfOutlined /><span>Export to PDF</span></Space>,
            key: '0',
        },
        {
            label: <Space><Html5Outlined /><span>Export to HTML</span></Space>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <Space className='text-rose-500'><DeleteOutlined /><span>Delete bookmark</span></Space>,
            key: '3',
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <MoreOutlined rotate={90} />
            </a>
        </Dropdown>
    );
}

export default DropdownMenu;