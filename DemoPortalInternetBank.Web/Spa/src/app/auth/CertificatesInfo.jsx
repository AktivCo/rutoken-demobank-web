import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const CertificateInfo = ({ subject }) => {
    const subjectMap = {
        INN: 'certInfo-INN',
        KPP: 'certInfo-KPP',
        OGRN: 'certInfo-OGRN',
        OGRNIP: 'certInfo-OGRNIP',
    };

    if (!['organizationName', ...Object.keys(subjectMap)].some((elem) => Object.prototype.hasOwnProperty.call(subject, elem))) {
        return null;
    }

    const renderINNandKPP = () => Object.keys(subjectMap).reduce((acc, item) => {
        if (acc.length === 2) {
            return acc;
        }

        if (subject[item]) {
            acc.push(
                <span key={item}>
                    <FormattedMessage id={subjectMap[item]} />
                    &nbsp;
                    {subject[item]}
                </span>,
            );
        }
        return acc;
    }, []);

    return (
        <div className="info_organization">
            {subject.organizationName ? <span className="info_organization_subject">{subject.organizationName}</span> : null}
            {renderINNandKPP()}
        </div>
    );
};


CertificateInfo.propTypes = { subject: PropTypes.shape() };

CertificateInfo.defaultProps = { subject: null };

export default CertificateInfo;
