"use client"
import { CardComponent } from "@/app/components/card";
import PageContent from "@/app/components/pagecontent";
import { Col, Row } from 'antd';
import data from "../../public/data.json";

export default function Home() {
  return (
    <Row style={{ height: "100vh" }}>
      <Col style={{
        background: '#f8fffe', overflowY: 'scroll', overflowX: "hidden", maxHeight: '100vh',

        scrollbarColor: '#c5cae9',
      }} span={10}>
        <div className='flex justify-center flex-col items-center my-10 ' >

          <CardComponent data={data} />
        </div>

      </Col>
      <Col span={14} style={{
        background: '#f8fffe', overflowY: 'scroll', overflowX: "hidden", maxHeight: '100vh',

        scrollbarColor: '#c5cae9',
      }}>
        <PageContent />
      </Col>

    </Row>
  );
}
