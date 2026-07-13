import { Component } from 'react';
import { UserContext } from '../context/UserContext';

export default class ClassContextConsumer extends Component {
  static contextType = UserContext;

  render() {
    const contextValue = this.context;

    if (!contextValue) {
      return (
        <p className="classContextError">
          UserContext is unavailable.
        </p>
      );
    }

    const { user } = contextValue;

    return (
      <div className="classContextDemo">
        <span className="classContextLabel">
          Value received through class context
        </span>

        <strong className="classContextName">
          {user.displayName || 'StudyFlow User'}
        </strong>

        <span className="classContextMeta">
          {user.programme || 'No programme selected'}
        </span>

        <span className="classContextMeta">
          {user.university || 'No university selected'}
        </span>
      </div>
    );
  }
}