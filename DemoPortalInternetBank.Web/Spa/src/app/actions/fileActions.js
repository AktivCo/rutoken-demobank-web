const save = (text, filename, type) => () => {
    const dlattr = 'download' in document.createElement('a');
    const URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    navigator.saveBlob = navigator.saveBlob
        || navigator.msSaveBlob
        || navigator.mozSaveBlob
        || navigator.webkitSaveBlob;

    function getBinaryContent(inputText) {
        const saveType = 'text/plain';
        const txt = inputText;
        return new Blob([txt], { type: saveType });
    }

    // ie
    if (window.Blob && navigator.saveBlob) {
        navigator.saveBlob(getBinaryContent(text, type), filename);
    } else if (window.Blob && URL) {
        const blob = getBinaryContent(text, type);
        let url;
        if (dlattr) {
            url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            const event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
        } else {
            url = URL.createObjectURL(blob);
            window.open(url, '_blank', '');
        }
        setTimeout(() => URL.revokeObjectURL(url), 200);
    }
};

export default save;
