import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Card, Col, Row, Typography } from 'antd';

import { CARDS_VALUES } from '../../../constants';

import messages from './messages';

import './Cardboard.css';

type CardboardProps = {
  storyTitle?: string;
  handleVote: (points: number) => void;
};

const { Title } = Typography;

const Cardboard: React.FC<CardboardProps> = ({ storyTitle, handleVote }) => {
  const intl = useIntl();

  const [userVote, setUserVote] = useState<number | boolean>(false);

  const onCardClick = useCallback(
    (points) => {
      handleVote(points);
      setUserVote(points);
    },
    [userVote, handleVote, setUserVote],
  );

  return (
    <div className="Cardboard">
      <Title level={3}>
        {storyTitle || intl.formatMessage(messages.noActiveStory)}
      </Title>
      <div className="Cardboard__Holder">
        <Row gutter={[16, 16]}>
          {CARDS_VALUES.map((point) => (
            <Col span={6} key={point}>
              <Card
                className={`Card${userVote === point ? ' active' : ''}`}
                onClick={() => onCardClick(point)}
                hoverable
              >
                {point === 0.5 ? '½' : point}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Cardboard;
