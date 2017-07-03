
import mapPropTypeToFieldType from './map-proptype-fieldtype';

export default function componentsToJsonSchema(comList = []) {
  let jsonSchema = comList.reduce((accum, com) => {
    const comName = com.constructor.name;
    if (!accum[comName]) {
      return Object.assign(accum, {
        [comName]: mapPropTypesToJsonSchema(com.constructor.propTypes, com.props, comName),
      });
    }
    return accum;
  }, {});

  jsonSchema = Object.keys(jsonSchema).reduce((accum, comName) => {
    return Object.assign(accum, jsonSchema[comName]);
  }, {});

  return jsonSchema;
}

function buildFieldSchemaFromPropType(key, propType, currentVal, transformers = {
  title: propName => propName,
}) {
  return {
    type: mapPropTypeToFieldType(propType),
    title: transformers.title(key),
    formData: currentVal,
  };
}

const enhanceBuildingField = buildFn => (key, propType, ...args) => {
  let schema = buildFn(key, propType, ...args);
  if (schema.type === 'oneOf') {
    schema = Object.assign(schema, {
      type: 'string',
      originType: 'oneOf',
      enum: propType.__pb__.args[0],
    });
  }
  return schema;
};


export function mapPropTypesToJsonSchema(propTypes = {}, valueList = {}, prefix='defaults') {
  return Object.keys(propTypes).reduce((accum, key) => {
    const fieldSchema = enhanceBuildingField(buildFieldSchemaFromPropType)(key, propTypes[key], valueList[key], {
      title(propName) {return `${prefix}.${propName}`;},
    });
    if(fieldSchema.type){
      return Object.assign(accum , {[key]: fieldSchema});
    }
    return accum;
  }, {});
}
