import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';


class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            options: props.options,
            isOpen: false,
            selectedOption: props.selectedOption,
            showIcon: props.showIcon,
            iconClass: props.iconClass,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setIsOpen = () => {
        const { isOpen } = this.state;

        this.setState({ isOpen: !isOpen });
    }

    setSelectedOption = (option) => {
        this.setState({ selectedOption: option });
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    toggling = () => {
        const { setIsOpen } = this;

        setIsOpen();
    }

    handleClickOutside = (event) => {
        const { isOpen } = this.state;
        const { toggling } = this;

        if (this.wrapperRef
            && this.wrapperRef.current
            && !this.wrapperRef.current.contains(event.target)
            && isOpen) {
            toggling();
        }
    }

    handleClick = (value) => () => {
        const { setSelectedOption, setIsOpen } = this;
        const { onOptionClicked } = this.props;

        setSelectedOption(value);
        setIsOpen();
        onOptionClicked(value);
    };

    renderDropdownIconBeforeSelectedItemClass = (iconClass) =>
        `${iconClass.toString()}`

    renderDropdownArrowIconClass = (isOpen) => cn({
        'dropdown-icon--up': isOpen,
        'dropdown-icon--down': !isOpen,
        'dropdown-icon': true,
    });

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
                    <div className="dropdown-options" ref={this.wrapperRef}>
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
