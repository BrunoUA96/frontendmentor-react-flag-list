import Select from 'react-select';

import styled from 'styled-components';

export const CustomSelect = styled(Select).attrs({
  styles: {
    control: provided => ({
      ...provided,
      backgroundColor: 'var(--bg-element)',
      color: 'var(--text-color)',
      borderRadius: 'var(--b-radius)',
      padding: '0.5rem 1.7rem',
      border: 'none',
      boxShadow: 'var(--shadow)',
      height: 'auto',
      cursor: 'pointer',
      transition: 'var(--transition)',
      width: '250px',
    }),
    menu: styles => ({
      ...styles,
      borderRadius: 'var(--b-radius)',
      overflow: 'hidden',
    }),
    menuList: styles => ({
      ...styles,
      padding: 0,

      backgroundColor: 'var(--bg-color)',
      border: 0,
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      margin: '0 !important',
      cursor: 'pointer',
      color: 'var(--text-color)',
      fontSize: 'var(--fs-sm)',
      padding: '0.8rem 2.2rem',
      backgroundColor: `var(${isSelected ? '--bg-color' : '--bg-element'})`,
      border: 0,
      ':active': {
        backgroundColor: `var(${isFocused ? '--bg-color' : '--bg-element'})`,
      },
      ':hover': {
        backgroundColor: 'var(--bg-color)',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    placeholder: styles => ({
      ...styles,
      color: 'var(--text-color)',
      fontFamily: 'var(--font-family)',
      fontWeight: 'var(--fw-light)',
      fontSize: 'var(--fs-sm)',
    }),
    singleValue: styles => ({
      ...styles,
      color: 'var(--text-color)',
      fontFamily: 'var(--font-family)',
      fontWeight: 'var(--fw-light)',
      fontSize: 'var(--fs-sm)',
      paddingLeft: '',
    }),
  },
})``;
