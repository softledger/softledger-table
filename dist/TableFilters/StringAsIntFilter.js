'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _react = require('react');var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var StringAsIntFilter = function StringAsIntFilter(_ref) {var filter = _ref.filter,_onChange = _ref.onChange;
	var handle = function handle(val) {
		var vals = val.split(':');
		//case 1 
		if (val.indexOf(':') < 0) {
			return {
				$iLike: '%' + val + '%' };

		} else if (val.startsWith(':')) {
			return {
				'$lte': vals[1] };

		} else if (val.endsWith(':')) {
			return {
				'$gte': vals[0] };

		} else {
			return {
				'$gte': vals[0],
				'$lte': vals[1] };

		}
	};


	return (
		_react2.default.createElement('div', null,
			_react2.default.createElement('input', {
				type: 'text',
				style: { width: "100%" },
				placeholder: 'Type to filter...',
				onChange: function onChange(e) {return _onChange(handle(e.target.value));} })));



};exports.default =

StringAsIntFilter;