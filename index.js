import React from 'react';
import { render } from 'react-dom';
import makePropTypesFormBuilder from './src/index';


import DatePicker from 'react-datepicker/lib/datepicker'; // eslint-disable-line
import DemoApp from './demo/app';


// const FormBuilderDemo = makeFormBuilder(Demo);
const FormBuilderDemo = makePropTypesFormBuilder(DemoApp);

const container = document.getElementById('demo');
setTimeout(() => {
  render(<FormBuilderDemo getFormPropTypes={() => DemoApp.propTypes} formData={DemoApp.defaultProps}/>, container);
}, 0);

