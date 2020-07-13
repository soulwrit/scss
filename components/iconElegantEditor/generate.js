const fs = require('fs');
const iconfont = require('./demo/iconfont.json');

const iconUnicodes = [];

iconfont.glyphs.forEach(function (icon) {
    iconUnicodes.push(`${icon.font_class}:"\\${icon.unicode}"`);
});

const sassList = `$icon-list: (\n ${iconUnicodes.join(',\n ')}\n);`;

fs.writeFileSync('./_list.scss', sassList);