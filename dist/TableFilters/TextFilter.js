'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _react = require('react');var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (_ref) {var filter = _ref.filter,_onChange = _ref.onChange;
	var handle = function handle(e) {return e ? {
			$iLike: '%' + e + '%' } :
		null;};

	return (
		_react2.default.createElement('input', {
			style: { width: "100%" },
			placeholder: 'Type to filter...',
			onChange: function onChange(e) {return _onChange(handle(e.target.value));} }));


};