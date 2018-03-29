'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _react = require('react');var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var NumberFilter = function NumberFilter(_ref) {var filter = _ref.filter,_onChange = _ref.onChange;
	var handle = function handle(val) {
		var vals = val.split(':');
		//case 1 
		if (val.indexOf(':') < 0) {
			return parseFloat(val);
		} else if (val.startsWith(':')) {
			return {
				'$lte': parseFloat(vals[1]) };

		} else if (val.endsWith(':')) {
			return {
				'$gte': parseFloat(vals[0]) };

		} else {
			return {
				'$gte': parseFloat(vals[0]),
				'$lte': parseFloat(vals[1]) };

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

NumberFilter;