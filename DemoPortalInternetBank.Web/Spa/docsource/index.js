const fs = require('fs');

const publishFilePath = 'node_modules/jsdoc/templates/default/publish.js';
const mainpageFilePath = 'node_modules/jsdoc/templates/default/tmpl/mainpage.tmpl'


let data = null;

data = fs.readFileSync(publishFilePath, 'utf8');

data = data.replace(/Home/g, 'Рутокен Демобанк');
data = data.replace(/'Modules'/g, '\'Модули\'');

fs.writeFileSync(publishFilePath, data, 'utf8');


data = null;
data = fs.readFileSync(mainpageFilePath, 'utf8');

let result = data.split(/\r?\n/);

result = result.map(line => {
    if (line.includes('data.name') && line.includes('data.version')) {
        return `<div class="mainpage">
                Документация продукта Рутокен Демобанк. Включает описание методов работы с плагином, ключами, 
                сертификатами, подписью.
            </div>`
    }
    return line;
});

data = result.join('\n');

fs.writeFileSync(mainpageFilePath, data, 'utf8');
