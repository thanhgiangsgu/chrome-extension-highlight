import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Empty, Layout, Row } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import singleData from "../../public/singleData.json";
import DropdownMenu from "./dropdown";
import TextSelect from './text-select';

interface DataModel {
    id: string;
    username: string;
    date: string;
    website_address: string;
    description: string;
    preview_image: string;
}

function PageContent() {
    const [data, setData] = useState<DataModel>()
    const searchParams = useSearchParams();
    const search = searchParams.get("id");

    useEffect(() => {
        // axios.get("apicacthu")
        if (!search) {
            console.log("Có dữ liệu đâu mà xem ba");
        } else {
            setData(singleData)
            console.log("Đã fetch data nha đại vương");
        }
    }, [search])

    return (
        <Layout.Content>
            {!data
                ? (<div className='flex items-center justify-center h-screen'>
                    <Empty description="Không có dữ liệu, hãy chọn bookmark cần xem" />
                </div>)
                : (
                    <div className='w-full'>
                        <img
                            style={{ width: "100% ", height: "200px" }}
                            alt=""
                            className='object-cover'
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={24} xl={24} className='mx-auto  shadow-md cursor-pointer' style={{ padding: "0", height: "100vh" }}>
                                <Card
                                    style={{ width: '100%', height: '100%' }}
                                    title={
                                        <div className='header flex items-center '>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            <p className='text-xs mx-1'>{data.username}</p>
                                            <p className='text-xs mx-1'>{data.date}</p>
                                            <ClockCircleOutlined />
                                        </div>
                                    }
                                    className='bg-white px-20 flex flex-col hover:bg-slate-50'
                                    extra={<DropdownMenu />}
                                >
                                    <Row className=' justify-between flex-col'>
                                        <Col xs={24} sm={24} md={12} lg={8} xl={24}>

                                            <h4 className='text-lg'>{data.website_address}</h4>
                                            <p className='description'>{data.description}</p>
                                            <p className='link'></p>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={8} xl={24} style={{ marginTop: "30px" }}>
                                            <h1 className='font-bold text-lg'>Description</h1>
                                            <p>{data.description}</p>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={8} xl={24} style={{ marginTop: "30px" }}>
                                            <h1 className='font-bold text-lg'>Tags & Directories</h1>
                                            <p>Not tags found </p>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={8} xl={24} style={{ marginTop: "30px" }}>
                                            <h1 className='font-bold text-lg'>Highlight & Notes</h1>
                                            <TextSelect color='rose-300' content='Nothing here' />
                                        </Col>

                                    </Row>

                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}

        </Layout.Content>
    )
}

export default PageContent