import React from 'react';
import { FormattedMessage } from 'react-intl';

const Loader = () => (
    <div className="info_container">
        <div className="certificatecard_loader" />
        <p>
            <FormattedMessage id="auth.certs-loading" />
        </p>
    </div>
);

export default Loader;
