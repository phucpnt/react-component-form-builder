/* eslint-disable no-underscore-dangle */

import reduce from 'lodash/reduce';
import compose from './compose';
//
import mapOneOf from './map-type-oneOf';

const idType = x => ({ type: x });

export const getSchemaBuilder = (mapType = idType) => propTypes => reduce(propTypes, (accum, val, key) => {
  const type = val.__pb__;
  if (type) {
    return Object.assign(accum, {
      [key]: Object.assign({
        title: key,
        originType: type,
      }, mapType(type.toString(), type.args())),
    });
  }
  return accum;
}, {});

const mapType = compose(mapOneOf,
  next => (type) => {
    if (type === 'bool') return { type: 'boolean' };
    return next(type);
  }
)(idType);

export default getSchemaBuilder(mapType);
