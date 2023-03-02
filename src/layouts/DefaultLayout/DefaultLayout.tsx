import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import React, { ReactNode } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const cx = classNames.bind(styles);
type Props = {
  children: ReactNode;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('sidebar')}>
        <Sidebar />
      </div>
      <div className={cx('right')}>
        <div className={cx('content')}> {children} </div>
      </div>
    </div>
  );
};
export default DefaultLayout;
