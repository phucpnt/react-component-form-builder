/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';

const SupportPropType = {
  string: 'string',
  number: 'number',
  oneOf: 'oneOf',
  bool: 'bool',
};

Object.keys(SupportPropType).forEach((val) => {
  const origin = PropTypes[val];
  const originIsRequired = PropTypes[val].isRequired;
  let enhancement = enhance(val);

  PropTypes[val] = (...args) => {
    const r = origin(...args);
    if (typeof r === 'function') {
      enhancement = enhance(val, ...args);
      r.__pb__ = enhancement;
      if (r.isRequired) {
        r.isRequired.__pb__ = enhancement;
      }
    }
    return r;
  };
  if (originIsRequired) {
    PropTypes[val].isRequired = originIsRequired;
    PropTypes[val].isRequired.__pb__ = enhancement;
  }

  PropTypes[val].__pb__ = enhancement;
});

function enhance(val, ...args) {
  return { toString() { return val; }, args: () => args };
}

