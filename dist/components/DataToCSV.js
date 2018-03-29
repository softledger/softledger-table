'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _arrayToCSV = require('../util/arrayToCSV');
var _components = require('@softledger/components');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var DataToCSV = function DataToCSV(props) {
	var getHeaders = function getHeaders() {
		if (!props.columns) return false;
		if (!props.visibleOnly) return false;
		var headers = [];
		props.columns.forEach(function (c) {
			if (c.hasOwnProperty('show') && !c.show) return;
			if (!c.accessor) return;
			headers.push(c.accessor);
		});
		return headers;
	};

	return (
		_react2.default.createElement(_components.LoadingButton, {
			onClick: function onClick() {return (0, _arrayToCSV.downloadCSV)(props.fileName, props.data, getHeaders());},
			style: props.style,
			toolTip: props.toolTip,
			iconClass: props.iconClass || "file",
			buttonClass: props.buttonClass || "btn-secondary",
			disabled: !props.data || !props.data.length,
			notPromise: true }));


};

DataToCSV.proptypes = {
	fileName: _propTypes2.default.string.isRequired,
	data: _propTypes2.default.array.isRequired,
	//required if visible only = true
	columns: _propTypes2.default.array,
	visibleOnly: _propTypes2.default.bool,
	buttonClass: _propTypes2.default.string,
	iconClass: _propTypes2.default.string,
	toolTip: _propTypes2.default.string };exports.default =


DataToCSV;