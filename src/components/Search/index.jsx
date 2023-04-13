import React from 'react';

import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

function Search() {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  function onClickClear() {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  }

  // eslint-disable-next-line
  const updateInputValues = React.useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 300),
    [],
  );

  const changeInput = (str) => {
    setValue(str);
    updateInputValues(str);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        onChange={(event) => changeInput(event.target.value)}
        type="text"
        placeholder="Поиск пицц..."
        value={value}
      />
      {value && (
        <div onClick={onClickClear} className={styles.deleteText}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
            <path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default Search;
