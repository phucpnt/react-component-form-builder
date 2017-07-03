/**
 * Why choose proptypes? <- It is support from react and simple to use
 */
import PropTypes from 'prop-types';

const SupportPropType = {
  string: 'string',
  number: 'number',
  oneOf: 'oneOf',
  bool: 'bool',
};

Object.keys(SupportPropType).forEach(val => {
  const origin = PropTypes[val];
  const originIsRequired = PropTypes[val].isRequired;
  PropTypes[val] = (...args) => {
    const r = origin(...args);
    if (typeof r === 'function') {
      const enhancement = enhance(val, ...args);
      r.__pb__ = enhancement;
      if (r.isRequired) {
        r.isRequired.__pb__ = enhancement;
      }
    }
    return r;
  };
  if (!!originIsRequired) {
    PropTypes[val].isRequired = originIsRequired;
    PropTypes[val].isRequired.__pb__ = val;
  }

  PropTypes[val].__pb__ = val;
});


function enhance(val, ...args) {
  return { toString() { return val; }, args };
}

export default function pickFieldType(propType) {
  if (!propType.__pb__) {
    return undefined;
  }
  switch (propType.__pb__.toString()) {
  case SupportPropType.string:
    return 'string';
  case SupportPropType.number:
    return 'number';
  case SupportPropType.bool:
    return 'boolean';
  case SupportPropType.oneOf:
    return 'oneOf';
  default:
    return undefined;
  }
}

