import React from 'react';
import { Spin } from 'antd';
import { useIntl } from 'react-intl';

import messages from './messages';

import './Loading.css';

const Loading: React.FC = () => {
  const intl = useIntl();

  return (
    <div className="Loading">
      <Spin size="large" tip={intl.formatMessage(messages.loading)} />
    </div>
  );
};

export default Loading;
