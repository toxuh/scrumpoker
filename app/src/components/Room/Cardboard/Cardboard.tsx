import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Card, Col, Row, Typography } from 'antd';

import messages from './messages';

import './Cardboard.css';

type CardboardProps = {
  storyTitle?: string;
  handleVote: (points: number) => void;
};

const { Title } = Typography;

const Cardboard: React.FC<CardboardProps> = ({ storyTitle, handleVote }) => {
  const intl = useIntl();

  const [userVoted, setUserVoted] = useState(false);

  const onCardClick = useCallback(
    (points) => {
      if (!userVoted) {
        handleVote(points);
        setUserVoted(true);
      }
    },
    [userVoted, handleVote, setUserVoted],
  );

  return (
    <div className="Cardboard">
      <Title level={3}>
        {storyTitle || intl.formatMessage(messages.noActiveStory)}
      </Title>
      <div className="Cardboard__Holder">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card onClick={() => onCardClick(0)} hoverable>
              0
            </Card>
          </Col>
          <Col span={6}>
            <Card onClick={() => onCardClick(0.5)} hoverable>
              ½
            </Card>
          </Col>
          <Col span={6}>
            <Card onClick={() => onCardClick(1)} hoverable>
              1
            </Card>
          </Col>
          <Col span={6}>
            <Card onClick={() => onCardClick(2)} hoverable>
              2
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card onClick={() => onCardClick(3)} hoverable>
              3
            </Card>
          </Col>
          <Col span={6}>
            <Card onClick={() => onCardClick(4)} hoverable>
              5
            </Card>
          </Col>
          <Col span={6}>
            <Card onClick={() => onCardClick(5)} hoverable>
              8
            </Card>
          </Col>
          <Col span={6}>
            <Card onClick={() => onCardClick(1000)} hoverable>
              ?
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cardboard;
