import { options } from 'preact';

const propBuilderByGroup = {};
window.propBuilderByGroup = propBuilderByGroup;

const nextAfterMount = options.afterMount;
options.afterMount = (component) => {
  if (component.context && component.context.propBuilderGroup) {
    const group = component.context.propBuilderGroup;
    group(component);
  }
  if (nextAfterMount) nextAfterMount(component);
};
