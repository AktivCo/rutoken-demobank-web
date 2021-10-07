const formatMoney = (num) => {
    if (Number.isNaN(num)) {
        return '0';
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

    return `${resultStr}`;
};

const formatDate = (stringDate) => {
    const date = new Date(stringDate);
    const yyyy = date.getFullYear();

    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    return `${dd}.${mm}.${yyyy}`;
};


export { formatMoney, formatDate };
