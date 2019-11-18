import React from 'react';
import PropTypes from 'prop-types';
import CertificateCard from './CertificatesCard';


const CertificateList = ({ certificates }) => (
    <div className="info_container main_certificatecard">
        <div className="certificatecard_certificatelist">
            <p className="certificatelist_title">Выберите личный сертификат</p>
            {
                certificates.map((cert) => <CertificateCard key={cert.certId} certificate={cert} />)
            }
        </div>
    </div>
);

CertificateList.propTypes = { certificates: PropTypes.arrayOf(PropTypes.shape()) };

CertificateList.defaultProps = { certificates: [] };

export default CertificateList;
