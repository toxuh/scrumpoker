import React, { ReactElement, ReactNode, memo, useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import ruMessages from './translations/ru.json';

interface Provider {
  children: ReactNode;
}

const I18nProvider = ({ children }: Provider): ReactElement => {
  const messages = useMemo(() => ruMessages, []);

  return (
    <IntlProvider locale="ru" messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default memo(I18nProvider);
