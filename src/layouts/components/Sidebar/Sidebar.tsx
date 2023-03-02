import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import config from '../../../config';
import { BsBarChart, BsPersonBadge, BsReceipt } from 'react-icons/bs';
const cx = classNames.bind(styles);
const links = [
  {
    to: config.routes.dashboard,
    icon: <BsBarChart />,
    title: 'Dashboard',
  },
  {
    to: config.routes.order,
    icon: <BsReceipt />,
    title: 'Orders',
  },
  {
    to: config.routes.customer,
    icon: <BsPersonBadge />,
    title: 'Customers',
  },
  {
    to: config.routes.employee,
    icon: <BsPersonBadge />,
    title: 'Employee',
  },
];

const Sidebar = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('menu')}>
        <div className={cx('menu__account')}>
          <img
            src={
              'https://vanthuong-api.up.railway.app/public/avatars/202302071258303c753bebe8cb4557b9a7255640bca043.jpg'
            }
            className={cx('menu__account__img')}
            alt=""
          />
          <div className={cx('menu__account__info')}>
            <h3>Đào Văn Thương</h3>
            <span>Quản lý bán hàng</span>
          </div>
        </div>
        <div className={cx('menu__links')}>
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              className={(nav) =>
                cx('menu__links--item', { active: nav.isActive && link.to !== '#' })
              }
            >
              <span className={cx('icon')}>{link.icon}</span>
              <span>{link.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
