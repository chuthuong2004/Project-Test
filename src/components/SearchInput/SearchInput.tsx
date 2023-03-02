import React from 'react';
import ReactLoading from 'react-loading';
import { BsSearch } from 'react-icons/bs';
import { TfiClose } from 'react-icons/tfi';
import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';

const cx = classNames.bind(styles);
type Props = {
  loading: boolean;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearInput: () => void;
};
const SearchInput: React.FC<Props> = ({
  loading,
  value,
  onChange,
  handleClearInput,
  placeholder = 'Bạn đang tìm gì ...',
}) => {
  return (
    <div>
      <div className={cx('container')}>
        <div className={cx('search-icon')}>
          <BsSearch color="#868D95" />
        </div>
        <input
          className={cx('search-input')}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {!loading && value && (
          <div onClick={handleClearInput} className={cx('loading-icon', 'close-icon')}>
            <TfiClose />
          </div>
        )}
        {loading && (
          <div className={cx('loading-icon')}>
            <ReactLoading type="spinningBubbles" color="#2e2e2e" width={20} height={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
