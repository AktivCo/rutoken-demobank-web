import React from 'react';
import cn from 'classnames';

class Input extends React.Component {
    state = { type: 'password' }

    renderEyeIconClass = (fieldType) => cn({
        'input-img__eye': true,
        active: fieldType === 'text',
    });

    showPassword = () =>
        this.setState((state) => ({ type: state.type === 'password' ? 'text' : 'password' }));

    render() {
        const { type } = this.state;
        return (
            <div style={{ position: 'relative' }}>
                <input {...this.props} type={type} autoComplete="new-password" />
                <span
                    role="button"
                    tabIndex="0"
                    className={this.renderEyeIconClass(type)}
                    onClick={this.showPassword}
                />
            </div>
        );
    }
}

export default Input;
