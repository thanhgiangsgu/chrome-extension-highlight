import { Card, Space, Avatar, Row, Col, Image } from 'antd';
import { ClockCircleOutlined, UserOutlined, MoreOutlined } from '@ant-design/icons';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import DropdownMenu from './dropdown'
interface DataModel {
    id: string;
    username: string;
    date: string;
    website_address: string;
    description: string;
    preview_image: string;
}

const CardComponent: React.FC<{ data: DataModel[] }> = ({ data }) => {
    const maxLength = 50;
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const handleClick = (id: string) => {
        console.log("push to: " + id);
        router.push(`admin?id=${id}`);
    }

    return (
        <Row gutter={[16, 16]} className='w-100'>
            {data.map(item => (
                <Col xs={24} sm={24} md={12} lg={24} xl={20}
                    className='mx-auto shadow-md cursor-pointer'
                    style={{ padding: "0" }} key={item.id}>
                    <Card
                        style={{ width: '100%' }} // Thiết lập chiều rộng mặc định cho mọi kích thước màn hình
                        title={
                            <div className='header flex items-center'>
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                <p className='text-xs mx-1'>{item.username}</p>
                                <p className='text-xs mx-1'>{item.date}</p>
                                <ClockCircleOutlined />
                            </div>
                        }
                        className={`bg-white hover:bg-slate-50 ${item.id === id && 'border-cyan-500 border-2'}`}
                        extra={<DropdownMenu />}
                    >
                        <Row className='items-center justify-between' onClick={() => handleClick(item.id)}>
                            <Col xs={24} sm={24} md={12} lg={8} xl={12}>

                                <h4 className='text-lg'>{item.website_address}</h4>
                                <p className='description'>{item.description}</p>
                                <p className='link'></p>
                            </Col>
                            <Col>
                                <Image
                                    width={150}
                                    height={100}
                                    className='object-cover'
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                                <p className='text-xs text-gray-400'>2 Highlight & 0 Notes</p>
                            </Col>
                        </Row>

                    </Card>
                </Col>
            ))}
        </Row>
    )

}
export { CardComponent }