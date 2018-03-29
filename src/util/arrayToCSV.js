'use strict';

function convertArrayOfObjectsToCSV({
	data, 
	headers,
	columnDelimiter,
	lineDelimiter
}) {
  let result, ctr, keys;

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

  data && data.forEach(item => {
    ctr = 0;
    keys && keys.forEach(key => {
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
exports.downloadCSV = (fileName, data, headers) => {
  
  let csv = convertArrayOfObjectsToCSV({
    data,
    headers
  });
  if (csv == null) return;

  fileName = fileName || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  let link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', fileName);
  link.click();
}