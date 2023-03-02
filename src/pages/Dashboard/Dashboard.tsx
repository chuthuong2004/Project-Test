import classNames from 'classnames/bind';

import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);
const test = [{ text: 'test' }, { text: 'test' }, { text: 'test' }];
const Dashboard = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('container-chart')}>
          <div className={cx('sales-chart')}>
            <span className={cx('title')}>Chart</span>
            <div className={cx('chart')}> Chart</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
