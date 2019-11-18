import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import CertificateInfo from './CertificatesInfo';

const CertificateCard = ({ certificate }) => (
    <div className="certificatelist_certificate" role="button" tabIndex={0}>
        <div className="certificate_body">
            <div className="certificate_icon" />
            <div className="certificate_info">
                <CertificateInfo subject={certificate.subject} />
                <div className="info_owner">
                    <span>{certificate.subject.commonName}</span>
                </div>
                <div className="info_center">
                    <span>
                        Выдал:&nbsp;
                        {certificate.issuer.commonName}
                    </span>
                </div>
                <div className="info_date">
                    <span>
                        Годен до&nbsp;
                        <FormattedDate
                            value={certificate.validNotAfter}
                            day="numeric"
                            month="long"
                            year="numeric"
                        />
                    </span>
                </div>
            </div>
        </div>
    </div>
);

CertificateCard.propTypes = { certificate: PropTypes.shape().isRequired };


export default CertificateCard;
