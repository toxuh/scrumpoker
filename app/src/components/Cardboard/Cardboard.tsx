import React from 'react';
import { Card, Col, Popover, Row, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { CARDS_VALUES } from '../../constants';

import { StoryType } from '../../types';

import './Cardboard.css';

type CardboardProps = {
  currentStory?: StoryType;
  isActive: boolean;
  userVote: string | boolean;
  onCardClick: (point: string) => void;
};

const { Title } = Typography;

const Cardboard: React.FC<CardboardProps> = ({
  currentStory,
  isActive,
  userVote,
  onCardClick,
}) => {
  return (
    <div className="Cardboard">
      <Title level={3}>
        {currentStory ? currentStory.name : ''}
        {currentStory && currentStory.description && (
          <Popover
            className="CardBoard__StoryDescription"
            content={currentStory.description}
            trigger="click"
          >
            <InfoCircleOutlined />
          </Popover>
        )}
      </Title>
      <div className="Cardboard__Holder">
        {!isActive && <div className="Cardboard__Blocker" />}
        <Row gutter={[16, 16]}>
          {CARDS_VALUES.map((point) => (
            <Col span={6} key={point}>
              <Card
                className={`Card${
                  userVote.toString() === point.toString() ? ' active' : ''
                }`}
                onClick={() => onCardClick(point)}
                hoverable
              >
                {point === '0.5' ? '½' : point}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Cardboard;
