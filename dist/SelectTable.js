'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _immutabilityHelper = require('immutability-helper');var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);
var _components = require('@softledger/components');


var _TableFilters = require('./TableFilters');var _TableFilters2 = _interopRequireDefault(_TableFilters);
var _reactstrap = require('reactstrap');
var _reactTable = require('react-table');var _reactTable2 = _interopRequireDefault(_reactTable);
var _lodash = require('lodash');
var _reactFontawesome = require('@fortawesome/react-fontawesome');var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
var _selectTable = require('react-table/lib/hoc/selectTable');var _selectTable2 = _interopRequireDefault(_selectTable);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var CheckboxTable = (0, _selectTable2.default)(_reactTable2.default);

var getHeaders = function getHeaders(columns, visibleOnly) {
	if (!columns) return false;
	//if(!visibleOnly) return false;
	var headers = [];
	columns.forEach(function (c) {
		if (visibleOnly) {
			if (c.hasOwnProperty('show') && !c.show) return;
		};
		if (!c.accessor) return;
		headers.push(c.accessor);
	});
	return headers;
};

/**
    * Extension of react-table to simplify for our standard use case
    */var
SelectTable = function (_React$Component) {_inherits(SelectTable, _React$Component);
	function SelectTable(props) {_classCallCheck(this, SelectTable);var _this = _possibleConstructorReturn(this, (SelectTable.__proto__ || Object.getPrototypeOf(SelectTable)).call(this,
		props));_this.






		renderMenu = function () {
			if (_this.props.showMenu === false) return;
			return (
				_react2.default.createElement(_components.ButtonBar, { style: { float: "right" },
					buttons: [
					_this.props.getReport &&
					_react2.default.createElement(_components.LoadingButton, {
						onClick: function onClick() {return _this.props.getReport({
								headers: getHeaders(_this.state.columns, true) });},

						iconClass: 'file-alt',
						buttonClass: 'btn-secondary',
						toolTip: 'Export Visible Columns' }),

					_this.props.getReport &&
					_react2.default.createElement(_components.LoadingButton, {
						onClick: function onClick() {return _this.props.getReport({
								headers: getHeaders(_this.state.columns, false) });},

						iconClass: 'file',
						buttonClass: 'btn-secondary',
						toolTip: 'Export All Columns' }),

					_react2.default.createElement(_components.DropDownMenu, {
							'class': 'float-right',
							toggleTag:
							_react2.default.createElement('div', { style: { margin: "-1px" } },
								_react2.default.createElement(_reactFontawesome2.default, { icon: 'columns' }),
								_react2.default.createElement(_reactFontawesome2.default, { icon: 'caret-down',
									style: { marginLeft: ".5rem" } })) },




						_this.state.columns.map(function (c, idx) {
							if (!c.Header) return;
							if (c.show === undefined) c.show = true;
							return (
								_react2.default.createElement(_components.BoolDropDownMenuItem, { key: c.Header,
									value: c.show,
									text: c.Header,
									onToggle: function onToggle() {return _this.toggleColumn(idx);} }));


						}),


						_this.props.onSaveTableFields &&
						_react2.default.createElement('span', null,
							_react2.default.createElement(_reactstrap.DropdownItem, { divider: true }),
							_react2.default.createElement(_reactstrap.DropdownItem, {
									key: 'saveTableFields',
									onClick: function onClick() {return _this.props.onSaveTableFields({
											headers: getHeaders(_this.state.columns, true) });} },


								_react2.default.createElement(_reactFontawesome2.default, { icon: 'save' }),
								_react2.default.createElement('span', { style: { paddingLeft: "5px", paddingRight: "5px" } }, '|'), 'Save Table Fields')))] }));








		};_this.

		toggleColumn = function (idx) {return _this.setState({
				columns: (0, _immutabilityHelper2.default)(_this.state.columns, _defineProperty({},
				idx, {
					show: {
						$apply: function $apply(show) {return !show;} } })) });};_this.





		buildColumns = function (columns) {return columns.map(function (c) {
				//if not filterable return
				if (!c.hasOwnProperty("filterable") || c.filterable) {
					//see if custom filter function
					if (c.customFilter) {
						c.Filter = c.customFilter;
					} else {
						//set filterable type
						c.Filter = _TableFilters2.default[c.myFilter || 'Text'];
					}
				}

				return c;
			});};_this.

		onFilteredChange = function (column, value) {return _this.filtering = true;};_this.

		fetchStrategy = function (tableState) {
			//console.log("filtering", this.filtering);
			if (_this.filtering) {
				return _this.fetchWithDebounce(tableState);
			} else {
				_this.filtering = false;
				_this.props.onToggleSelectAll(true);
				return _this.props.fetchData(tableState);
			}
		};_this.


		fetchWithDebounce = (0, _lodash.debounce)(_this.props.fetchData, 250);_this.

		checkSelectAll = function () {var _this$props =



			_this.props,selection = _this$props.selection,data = _this$props.data;
			var selectAll = true;
			data.forEach(function (d) {
				if (selection.indexOf(d) === -1) selectAll = false;
			});
			return selectAll;
		};_this.

		isSelected = function (key) {return _this.props.selection.indexOf(key) !== -1;};_this.state = { filtering: false, columns: _this.buildColumns(props.columns) };return _this;} //250ms debounce time (human response limit)
	_createClass(SelectTable, [{ key: 'render', value: function render()


		{var _this2 = this;var

			columns =
			this.state.columns;var _props =











			this.props,loading = _props.loading,data = _props.data,pages = _props.pages,pageSize = _props.pageSize,selection = _props.selection,keyField = _props.keyField,selectionColor = _props.selectionColor,selectAll = _props.selectAll,onToggleSelect = _props.onToggleSelect,onToggleSelectAll = _props.onToggleSelectAll;

			return (
				_react2.default.createElement(_reactstrap.Container, { fluid: true },
					_react2.default.createElement(_reactstrap.Row, null,
						_react2.default.createElement(_reactstrap.Col, { xs: { size: 6, offset: 6 } },
							this.renderMenu())),


					_react2.default.createElement(CheckboxTable, _extends({},
					this.props, {
						toggleAll: onToggleSelectAll,
						toggleSelection: onToggleSelect,
						selectAll: selectAll,
						isSelected: this.isSelected,
						selectType: 'checkbox',
						className: '-highlight',
						columns: columns,
						manual: true,
						defaultPageSize: pageSize || 25,
						onFetchData: this.fetchStrategy,
						onFilteredChange: this.onFilteredChange,
						filterable: true
						// Any Tr element will be green if its (row.age > 20)
						, getTrProps: function getTrProps(state, row, column) {
							var css = {
								style: {
									backgroundColor: 'inherit' } };


							if (selection.includes(row && row.original[keyField])) {
								//add selection color
								css.style.backgroundColor = selectionColor;
								//if expanded add class
							} else if (row && state.expanded[row.index]) {
								css.style.backgroundColor = '#eaedef';
							}

							return css;
						},
						getTdProps: function getTdProps() {
							return {
								style: {
									overflow: _this2.props.showOverflow || 'hidden' } };


						}
						//for date filters
						, getTheadFilterThProps: function getTheadFilterThProps() {
							return { style: { overflow: 'visible' } };
						} }))));



		} }]);return SelectTable;}(_react2.default.Component);



SelectTable.propTypes = {
	/**
                           * function to call when a row selection is toggled
                           */
	onToggleSelect: _propTypes2.default.func.isRequired,
	/**
                                                       * funciton to call when select all is toggled
                                                       * called with 'true' when table data is changed
                                                       */
	onToggleSelectAll: _propTypes2.default.func.isRequired,
	/**
                                                          * array containing selected 'key' values
                                                          */
	selection: _propTypes2.default.array.isRequired,
	/**
                                                   * true/false if select all is set
                                                   */
	selectAll: _propTypes2.default.bool,
	/**
                                       * column index to store in selection set
                                       */
	keyField: _propTypes2.default.string.isRequired,
	/**
                                                   * css color to highlight row when selected
                                                   */
	selectionColor: _propTypes2.default.string,
	/**
                                              * array of objects to display in the table
                                              */
	data: _propTypes2.default.array,
	/**
                                   * total # of pages
                                   */
	pages: _propTypes2.default.number,
	/**
                                     * number of items to show per page
                                     */
	pageSize: _propTypes2.default.number,
	/**
                                        * array describing how to display each key in data
                                        * see react-table for full description
                                        */
	columns: _propTypes2.default.array.isRequired,
	/**
                                                 * custom filter defined per react-table
                                                 */
	'columns[].customFilter': _propTypes2.default.any,
	/**
                                                     * Predefined filter to use, defaults to 'Text';
                                                     */
	'columns[].myFilter': _propTypes2.default.oneOf([
	'Integer',
	'Number',
	'Date',
	'StringAsInt',
	'Text']),

	/**
            * function to be called when we need to fetch new data
            * ie, when page/limit is changed or filtered
            */
	fetchData: _propTypes2.default.func.isRequired,
	/**
                                                  * Subcomponent to display when a table is expanded
                                                  */
	SubComponent: _propTypes2.default.func,
	/**
                                          * default column to sort by
                                          */
	defaultSorted: _propTypes2.default.array,
	/**
                                            * whether or not to display the column toggle menu
                                            */
	showMenu: _propTypes2.default.bool,
	/**
                                      * true will allow inputs such as dropdowns etc to show
                                      */
	showOverflow: _propTypes2.default.bool,
	/**
                                          * function which will return a csv of the data
                                          * if blank, will hide menu buttons
                                          */
	getReport: _propTypes2.default.func,
	/**
                                       * callback which returns all visible headers
                                       * useful to store default headers
                                       */
	onSaveTableFields: _propTypes2.default.func };


SelectTable.defaultProps = {
	showMenu: true,
	showOverflow: false,
	selectionColor: 'inherit' };exports.default =


SelectTable;