import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import withLoader from './withLoader';
import { sign as signAction } from '../actions/sign';
import OBJECT_TYPES from '../personalViewStates';
import getObjectsListAction from '../actions/getObjectsList';

import PersonalBlock from './PersonalBlock';

import PersonalBlockModal from './PersonalBlockModal';
import PersonalBlockConfirmModal from './PersonalBlockConfirmModal';

import PersonalBlockMultipleModal from './PersonalBlockMultipleModal';
import PersonalBlockMultipleConfirmModal from './PersonalBlockMultipleConfirmModal';

import PersonalSelectedInfo from './PersonalSelectedInfo';
import Range from '../controls/Range';

class PaymentList extends React.Component {
    state = {
        selectedItems: [],
        multipleSelection: false,
    }

    onSelect = (index) => {
        const { OBJECTS_LIST, sign } = this.props;
        const { selectedItems, multipleSelection } = this.state;

        if (!multipleSelection) {
            sign([OBJECTS_LIST[index]]);
            return;
        }

        if (selectedItems.includes(index)) {
            this.setState({ selectedItems: selectedItems.filter((el) => el !== index) });
            return;
        }

        this.setState({ selectedItems: selectedItems.concat([index]) });
    }

    onSelectionModeChange = (t) => {
        const multipleSelection = !!t;
        let { selectedItems } = this.state;

        if (!multipleSelection) {
            selectedItems = [];
        }

        this.setState({ multipleSelection, selectedItems });
    }

    onMultipleSign = (payments) => {
        const { sign } = this.props;
        sign(payments);
    }

    render() {
        const { selectedItems, multipleSelection } = this.state;
        const { OBJECTS_LIST, OBJECT_TYPE } = this.props;

        const renderList = [];

        if (OBJECT_TYPE === OBJECT_TYPES.OUTGOING) {
            renderList
                .push(
                    <span key="multisign--trigger">
                        <Range onChange={this.onSelectionModeChange} />
                        <span className="personal__multisign--trigger">
                            <FormattedMessage id="personal.multisign" />
                        </span>
                    </span>,
                );

            const selectedPayments = OBJECTS_LIST.filter((el, index) => selectedItems.includes(index));


            if (multipleSelection) {
                renderList
                    .push(
                        <PersonalSelectedInfo
                            key="personal-info"
                            payments={selectedPayments}
                            onMultipleSign={this.onMultipleSign}
                        />,
                    );
            }
        }

        renderList.push(
            <div className="personal-blocks" key="personal-blocks">
                {
                    OBJECTS_LIST.map((el, index) => (
                        <PersonalBlock
                            key={el.id}
                            element={el}
                            isSelected={selectedItems.includes(index)}
                            onSelect={() => this.onSelect(index)}
                        />
                    ))
                }
            </div>,
        );

        return renderList;
    }
}

PaymentList.propTypes = {
    OBJECTS_LIST: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    OBJECT_TYPE: PropTypes.number.isRequired,
    sign: PropTypes.func.isRequired,
};

const mapStateToProps = (objectType) => (store) => (
    {
        OBJECTS_LIST: store.OBJECTS_LIST[objectType],
        OBJECT_TYPE: objectType,
    }
);

const mapActionsToProps = (dispatch) =>
    ({
        sign: (payment) => dispatch(signAction(payment, {
            PaymentModal: PersonalBlockModal,
            PaymentModalConfirm: PersonalBlockConfirmModal,
            PaymentMultipleModal: PersonalBlockMultipleModal,
            PaymentMultipleModalConfirm: PersonalBlockMultipleConfirmModal,
        })),
    });

const mapBeforeLoadActions = (objectType) => (dispatch) => (
    { action: () => dispatch(getObjectsListAction(objectType)) }
);

const mapBeforeLoadState = (objType) => (store) => (
    { data: (store.OBJECTS_LIST && store.OBJECTS_LIST[objType]) ? store.OBJECTS_LIST : null }
);

export default (objectType) =>
    withLoader(mapBeforeLoadState(objectType), mapBeforeLoadActions(objectType))(
        connect(mapStateToProps(objectType), mapActionsToProps)(PaymentList),
    );
