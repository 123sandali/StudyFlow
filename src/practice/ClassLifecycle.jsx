import React from 'react';

export default class ClassLifecycle extends React.Component {
  componentDidMount() {
    console.log('ClassLifecycle mounted');
  }

  componentDidUpdate(previousProps) {
    console.log('ClassLifecycle updated');
    console.log('Previous label:', previousProps.label);
    console.log('Current label:', this.props.label);
  }

  componentWillUnmount() {
    console.log('ClassLifecycle cleanup');
  }

  render() {
    return (
      <div className="lifecycleDemoBox">
        <p className="lifecycleSmallText">Class lifecycle child component</p>
        <h3>{this.props.label}</h3>
        <p>
          Open the browser console. Then update or unmount this component to
          observe lifecycle logs.
        </p>
      </div>
    );
  }
}