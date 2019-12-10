const formatMoney = (num) => {
    if (Number.isNaN(num)) {
        return '';
    }

    const rank = 10;

    let resultStr = '';

    let modulusNum = Math.abs(num);
    let counter = 0;

    while (modulusNum !== 0) {
        const res = modulusNum % rank;
        modulusNum = Math.floor(modulusNum / rank);

        if (counter !== 0 && counter % 3 === 0) {
            resultStr = `${res} ${resultStr}`;
        } else {
            resultStr = res + resultStr;
        }
        counter += 1;
    }

    if (num < 0) {
        resultStr = `-${resultStr}`;
    }

    return `${resultStr} ₽`;
};


/* eslint-disable-next-line import/prefer-default-export */
export { formatMoney };
