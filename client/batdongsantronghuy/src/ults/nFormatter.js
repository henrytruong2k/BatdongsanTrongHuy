export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'ngàn' },
    { value: 1e6, symbol: 'triệu' },
    { value: 1e9, symbol: 'tỉ' },
    { value: 1e12, symbol: 'ngàn tỉ' },
    // { value: 1e15, symbol: 'P' },
    // { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + ' ' + item.symbol
    : '0';
}
