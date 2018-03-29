'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _react = require('react');var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}exports.default =

function (idx) {
	//returns filter component
	return function (_ref) {var filter = _ref.filter,_onChange = _ref.onChange;
		var handle = function handle(e) {var _$or;return e ? {
				overrideId: true,
				filter: {
					$or: (_$or = {}, _defineProperty(_$or, '$' +
					idx + '.name$', { $iLike: '%' + e + '%' }), _defineProperty(_$or, '$' +
					idx + '.number$', { $iLike: '%' + e + '%' }), _$or) } } :


			null;};

		return (
			_react2.default.createElement('input', {
				style: { width: "100%" },
				placeholder: 'Type to filter...',
				onChange: function onChange(e) {return _onChange(handle(e.target.value));} }));


	};
};