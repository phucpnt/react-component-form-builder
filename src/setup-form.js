import React from 'react';
import { render } from 'react-dom';

import Form from 'react-jsonschema-form';
import buildFormFieldsSchema from './build-form-fields-schema';

window.propBuilderRenderForm = (group = 'defaults') => {
  const formSchema = {
    title: group,
    type: 'object',
    properties: buildFormFieldsSchema(window.propBuilderByGroup[group]),
  };
  const formData = Object.keys(formSchema.properties).reduce((accum, key) => {
    return Object.assign(accum, { [key]: formSchema.properties[key].formData });
  }, {});
  console.log('render form', group, formSchema);

  const containerId = `propBuilderForm---${group}`;
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = `propBuilderForm---${group}`;
    document.body.appendChild(container);
  }

  render(<Form schema= {formSchema} formData={formData} />, container);
};

