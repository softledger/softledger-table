'use strict';


exports.Number = (filter, row) => {
	const val = filter.value;
	const rVal = parseFloat(row[filter.id]);
	const vals = val.split(':');
	//case 1 
	if(val.indexOf(':') < 0) {
		return String(row[filter.id]).toLowerCase().indexOf(val.toLowerCase()) != -1
	} else if(val.startsWith(':')) {
		return rVal <= parseFloat(vals[1]);
	} else if (val.endsWith(':')) {
		return parseFloat(vals[0]) <= rVal;
	} else {
		return rVal <= parseFloat(vals[1])
			&& parseFloat(vals[0]) <= rVal;
	}
}


exports.Default = (filter, row) => String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) != -1