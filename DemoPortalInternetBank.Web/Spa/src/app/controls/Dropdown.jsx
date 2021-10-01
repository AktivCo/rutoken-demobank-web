import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';


class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            isOpen: false,
            selectedOption: props.selectedOption,
            showIcon: props.showIcon,
            iconClass: props.iconClass,
        };
    }

    renderDropdownIconBeforeSelectedItemClass = (iconClass) =>
        `${iconClass.toString()}`

    renderDropdownArrowIconClass = (isOpen) => cn({
        'dropdown-icon--up': isOpen,
        'dropdown-icon--down': !isOpen,
        'dropdown-icon': true,
    });

    setIsOpen = () => {
        const { isOpen } = this.state;

        this.setState({ isOpen: !isOpen });
    }

    setSelectedOption = (option: number) => {
        this.setState({ selectedOption: option });
    }

    toggling = () => {
        const { setIsOpen } = this;

        setIsOpen();
    }

    handleClick = (value) => () => {
        const { setSelectedOption, setIsOpen } = this;
        const { onOptionClicked } = this.props;

        setSelectedOption(value);
        setIsOpen();
        onOptionClicked(value);
    };

    render() {
        const { isOpen, selectedOption, options, showIcon, iconClass } = this.state;
        const { toggling, handleClick, renderDropdownArrowIconClass, renderDropdownIconBeforeSelectedItemClass } = this;

        return (
            <div className="dropdown">
                <div
                    className="dropdown-header d-flex flex-row align-items-center justify-content-start"
                    onClick={toggling}
                    role="button"
                    aria-hidden
                >
                    {
                        showIcon && (
                            <div className={renderDropdownIconBeforeSelectedItemClass(iconClass)} />
                        )
                    }
                    {selectedOption.name}
                    <div className={renderDropdownArrowIconClass(isOpen)} />
                </div>
                {isOpen && (
                    <div className="dropdown-options">
                        <div className="options-wrapper">
                            {options.map((option) => (
                                <div
                                    className="option"
                                    role="button"
                                    onClick={handleClick(option)}
                                    key={Math.random()}
                                    aria-hidden
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Dropdown.propTypes = {
    selectedOption: PropTypes.shape().isRequired,
    options: PropTypes.arrayOf(PropTypes.any).isRequired,
    onOptionClicked: PropTypes.func.isRequired,
    showIcon: PropTypes.bool,
    iconClass: PropTypes.string,
};

Dropdown.defaultProps = {
    showIcon: false,
    iconClass: 'language-icon',
};

export default Dropdown;
