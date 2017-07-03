import React, { Component } from 'react';
import RjsfSchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';

function supportTab(SchemaField) {
  class SchemaFieldTab extends Component {

    constructor(props){
      super(props);
      const tabs = this.props.uiSchema ? this.getTabs() : [];
      this.state = {
        tabs,
        activeTab: 0,
      };
    }

    getTabs() {
      const schema = this.props.schema.properties;
      const uiSchema = this.props.uiSchema;
      const tabs = Object.keys(uiSchema)
        .filter(key => uiSchema[key]['ui:field'] === 'tab')
        .map(key => ({
          title: key,
          uiSchema: null, //uiSchema[key],
          schema: Object.keys(uiSchema[key]).filter(sKey => sKey !== 'ui:field')
            .reduce((accum, sKey) => {
              // accum[skey] = schema[sKey];
              // const skey = schema[sKey];
              return Object.assign(accum, { [sKey]: schema[sKey] });
            }, {}),
        }));
      return tabs;
    }

    render() {
      // console.info('tabs props', this.props.schema, this.props.uiSchema);
      const tabs = this.state.tabs;
      if (tabs.length === 0) {
        return (<SchemaField {...this.props} />);
      }
      return (
        <div>
          <ul className="nav nav-tabs">{
            tabs.map((tab, i) => (<li id={i}
              onClick={(event) => { event.preventDefault(); this.setState({ activeTab: i }) }}
              className={i === this.state.activeTab ? 'active' : null}>
              <a href="#">{tab.title}</a>
            </li>))
          }</ul>
          {this.renderTabContents(this.state.activeTab)}
        </div>
      );
    }

    onPropertyChange(name){
      return (value, options) => {
        const newFormData = { ...this.props.formData, [name]: value };
        this.props.onChange(newFormData, options);
      };
    };

    renderTabContents(activeTab) {
      const content = this.state.tabs.map((tab, i) => {
        const tabContent = Object.keys(tab.schema)
          .map(key => (<SchemaField id={key} {...this.props}
            onChange={this.onPropertyChange(key)}
            idSchema={{$id: key}}
            formData={this.props.formData[key]}
            schema={tab.schema[key]}
            uiSchema={tab.uiSchema ? tab.uiSchema[key] : undefined} />));
        return (<div className={["tab-content"].concat(activeTab !== i ? 'hide' : '').join(' ')} id={tab.title}>{tabContent}</div>);
      });
      return (<div className="tab-container">{content}</div>);
    }
  }

  return SchemaFieldTab;
}

export default supportTab(RjsfSchemaField);
