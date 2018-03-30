'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _formComponents = require('@softledger/form-components');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var DateFilter = function DateFilter(_ref) {var column = _ref.column,filter = _ref.filter,onChange = _ref.onChange;
	var onDatesChange = function onDatesChange(_ref2) {var startDate = _ref2.startDate,endDate = _ref2.endDate;
		var newFilter = _extends({}, filter);
		if (!newFilter.value) newFilter.value = {};
		if (startDate) {
			newFilter.value['$gte'] = startDate;
		}
		if (endDate) {
			newFilter.value['$lte'] = endDate;
		}
		//handle clear dates
		if (!startDate && !endDate) {
			newFilter.value = null;
		}
		return onChange(newFilter.value);
	};

	return (
		_react2.default.createElement(_formComponents.SLDateRange, {
			id: column.id,
			startDate: filter && filter.value && filter.value['$gte'],
			endDate: filter && filter.value && filter.value['$lte'],
			onChange: onDatesChange }));


};exports.default =

DateFilter;