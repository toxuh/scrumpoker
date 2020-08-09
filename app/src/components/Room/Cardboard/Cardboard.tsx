import React from 'react';
import { useIntl } from 'react-intl';
import { Card, Col, Row, Typography } from 'antd';

import messages from './messages';

import './Cardboard.css';

type CardboardProps = {
  storyTitle?: string;
};

const { Title } = Typography;

const Cardboard: React.FC<CardboardProps> = ({ storyTitle }) => {
  const intl = useIntl();

  return (
    <div className="Cardboard">
      <Title level={3}>
        {storyTitle || intl.formatMessage(messages.noActiveStory)}
      </Title>
      <div className="Cardboard__Holder">
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
    </div>
  );
};

export default Cardboard;
