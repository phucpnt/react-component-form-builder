import React from 'react';
import { render } from 'react-dom';
import makePropTypesFormBuilder from './src/index';


import DatePicker from 'react-datepicker/lib/datepicker'; // eslint-disable-line


// const FormBuilderDemo = makeFormBuilder(Demo);
const FormBuilderDemo = makePropTypesFormBuilder(DatePicker);

const container = document.getElementById('demo');
setTimeout(() => {
  render(<FormBuilderDemo getFormPropTypes={() => DatePicker.propTypes} formData={DatePicker.defaultProps}/>, container);
}, 0);

