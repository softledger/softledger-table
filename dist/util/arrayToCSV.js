'use strict';

function convertArrayOfObjectsToCSV(_ref)




{var data = _ref.data,headers = _ref.headers,columnDelimiter = _ref.columnDelimiter,lineDelimiter = _ref.lineDelimiter;
  var result = void 0,ctr = void 0,keys = void 0;

  data = data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = columnDelimiter || ',';
  lineDelimiter = lineDelimiter || '\n';

  //if headers passed, use those instead
  keys = headers ? headers : Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data && data.forEach(function (item) {
    ctr = 0;
    keys && keys.forEach(function (key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

/**
   * [description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
exports.downloadCSV = function (fileName, data, headers) {

  var csv = convertArrayOfObjectsToCSV({
    data: data,
    headers: headers });

  if (csv == null) return;

  fileName = fileName || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  var link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', fileName);
  link.click();
};