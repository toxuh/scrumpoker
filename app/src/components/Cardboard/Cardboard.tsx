import React from 'react';
import { useIntl } from 'react-intl';
import { Card, Col, Row, Typography } from 'antd';

import { CARDS_VALUES } from '../../constants';

import messages from './messages';

import './Cardboard.css';

type CardboardProps = {
  storyTitle?: string;
  isActive: boolean;
  userVote: string | boolean;
  onCardClick: (point: string) => void;
};

const { Title } = Typography;

const Cardboard: React.FC<CardboardProps> = ({
  storyTitle,
  isActive,
  userVote,
  onCardClick,
}) => {
  const intl = useIntl();

  return (
    <div className="Cardboard">
      <Title level={3}>
        {storyTitle || intl.formatMessage(messages.noActiveStory)}
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
