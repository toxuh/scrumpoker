import React from 'react';
import { Card, Col, Row } from 'antd';

import './Cardboard.css';

const Cardboard: React.FC = () => {
  return (
    <div className="Cardboard">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable>0</Card>
        </Col>
        <Col span={6}>
          <Card hoverable>½</Card>
        </Col>
        <Col span={6}>
          <Card hoverable>1</Card>
        </Col>
        <Col span={6}>
          <Card hoverable>2</Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable>3</Card>
        </Col>
        <Col span={6}>
          <Card hoverable>5</Card>
        </Col>
        <Col span={6}>
          <Card hoverable>8</Card>
        </Col>
        <Col span={6}>
          <Card hoverable>?</Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cardboard;
