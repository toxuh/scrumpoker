import React from 'react';
import { Layout } from 'antd';

type HeaderProps = {
  title: string;
};

const { Header: AntHeader } = Layout;

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <AntHeader>{title}</AntHeader>;
};

export default Header;
