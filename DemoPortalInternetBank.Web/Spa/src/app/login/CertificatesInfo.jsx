import React from 'react';
import PropTypes from 'prop-types';

const CertificateInfo = ({ subject }) => {
    const subjectMap = {
        INN: 'ИНН',
        KPP: 'КПП',
        OGRN: 'ОГРН',
        OGRNIP: 'ОГРНИП',
    };

    const subjectList = ['organizationName', ...Object.keys(subjectMap)];

    if (!subjectList.some((elem) => Object.prototype.hasOwnProperty.call(subject, elem))) {
        return null;
    }

    const renderINNandKPP = () => Object.keys(subjectMap).reduce((acc, item) => {
        if (acc.length === 2) {
            return acc;
        }

        if (subject[item]) {
            acc.push(<span key={item}>{`${subjectMap[item]} ${subject[item]}`}</span>);
        }
        return acc;
    }, []);

    return (
        <div className="info_organization">
            {
                subject.organizationName
                    ? <span className="info_organization_subject">{subject.organizationName}</span>
                    : null
            }
            {renderINNandKPP()}
        </div>
    );
};


CertificateInfo.propTypes = { subject: PropTypes.shape() };

CertificateInfo.defaultProps = { subject: null };

export default CertificateInfo;
