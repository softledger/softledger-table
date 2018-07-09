'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _components = require('@softledger/components');


var _DataToCSV = require('./components/DataToCSV');var _DataToCSV2 = _interopRequireDefault(_DataToCSV);
var _reactstrap = require('reactstrap');
var _reactTable = require('react-table');var _reactTable2 = _interopRequireDefault(_reactTable);
var _filterMethods = require('./TableFilters/filterMethods');var FilterMethods = _interopRequireWildcard(_filterMethods);
var _reactFontawesome = require('@fortawesome/react-fontawesome');var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

//handles nested headers as well
var buildDropDownColumns = function buildDropDownColumns(columns, _onToggle, topIdx) {
	var built = [];
	columns.forEach(function (c, idx) {
		if (!c.Header) return;
		if (c.columns) {
			var nested = buildDropDownColumns(c.columns, _onToggle, idx);
			built = built.concat(nested);
		} else {
			if (c.show === undefined) c.show = true;
			built.push(
			_react2.default.createElement(_components.BoolDropDownMenuItem, { key: c.Header,
				value: c.show,
				text: c.Header,
				onToggle: function onToggle() {
					if (topIdx) return _onToggle(topIdx, idx);
					return _onToggle(idx);
				} }));

		}
	});
	return built;
};var

SimpleTable = function (_React$Component) {_inherits(SimpleTable, _React$Component);
	function SimpleTable(props) {_classCallCheck(this, SimpleTable);var _this = _possibleConstructorReturn(this, (SimpleTable.__proto__ || Object.getPrototypeOf(SimpleTable)).call(this,
		props));_this.














		renderMenu = function (data, columns) {
			if (!_this.props.showMenu === false) return;
			return (
				_react2.default.createElement(_components.ButtonBar, { style: { float: "right" },
					buttons: [
					_this.props.reportFileName &&
					_react2.default.createElement(_DataToCSV2.default, { style: { float: "right" },
						fileName: _this.props.reportFileName,
						data: data,
						columns: columns,
						iconClass: 'file-alt',
						visibleOnly: true,
						toolTip: 'Export Visible Columns' }),

					_this.props.reportFileName &&
					_react2.default.createElement(_DataToCSV2.default, { style: { float: "right" },
						fileName: _this.props.reportFileName,
						data: data,
						toolTip: 'Export All Columns' }),

					_react2.default.createElement(_components.DropDownMenu, {
							'class': 'float-right',
							toggleTag:
							_react2.default.createElement('div', { style: { margin: "-1px" } },
								_react2.default.createElement(_reactFontawesome2.default, { icon: 'columns' }),
								_react2.default.createElement(_reactFontawesome2.default, { icon: 'caret-down',
									style: { marginLeft: ".5rem" } })) },



						buildDropDownColumns(_this.state.columns, _this.toggleColumn))] }));



		};_this.

		toggleColumn = function (idx, nestedIdx) {
			if (nestedIdx > -1) {
				_this.setState({
					columns: update(_this.state.columns, _defineProperty({},
					idx, {
						columns: _defineProperty({},
						nestedIdx, {
							show: {
								$apply: function $apply(show) {return !show;} } }) })) });






			} else {
				_this.setState({
					columns: update(_this.state.columns, _defineProperty({},
					idx, {
						show: {
							$apply: function $apply(show) {return !show;} } })) });




			}
		};_this.

		buildColumns = function (columns) {return columns && columns.map(function (c) {
				//if not filterable return
				if (!c.hasOwnProperty("filterable") || c.filterable) {
					//see if custom filter function
					if (c.customFilter) {
						c.filterMethod = c.customFilter;
					} else if (c.myFilter) {
						c.filterMethod = FilterMethods[c.myFilter];
					}
				} //else use default

				return c;
			});};_this.state = { loading: true, columns: _this.buildColumns(props.columns) };return _this;}_createClass(SimpleTable, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(nextProps) {if (nextProps.columns !== this.state.columns) {this.setState({ columns: this.buildColumns(nextProps.columns) });}} }, { key: 'render', value: function render()

		{var _this2 = this;var

			columns =
			this.state.columns;var _props =



			this.props,data = _props.data,loading = _props.loading;

			return (
				_react2.default.createElement(_reactstrap.Container, { fluid: true },
					_react2.default.createElement(_reactstrap.Row, null,
						_react2.default.createElement(_reactstrap.Col, { xs: { size: 6, offset: 6 } },
							this.renderMenu(data, columns))),


					_react2.default.createElement(_reactTable2.default, _extends({},
					this.props, {
						className: '-highlight',
						data: data || [],
						columns: columns,
						defaultSorted: this.props.defaultSorted,
						defaultPageSize: 25,
						defaultFilterMethod: FilterMethods.Default,
						loading: loading,
						filterable: true,
						SubComponent: this.props.SubComponent,
						getTrProps: function getTrProps(state, rowInfo, column) {
							//if expanded add class
							if (rowInfo && state.expanded[rowInfo.index]) {
								return {
									style: {
										backgroundColor: '#eaedef' } };


							} else {
								return {};
							}
						},
						getTdProps: function getTdProps() {
							return {
								style: {
									overflow: _this2.props.showOverflow || 'hidden' } };


						} }))));



		} }]);return SimpleTable;}(_react2.default.Component);exports.default = SimpleTable;



SimpleTable.propTypes = {
	data: _propTypes2.default.array,
	columns: _propTypes2.default.array.isRequired,
	defaultSorted: _propTypes2.default.array,
	showMenu: _propTypes2.default.bool, //default true
	loading: _propTypes2.default.bool,
	SubComponent: _propTypes2.default.func,
	//required ify ou want to export reports
	reportFileName: _propTypes2.default.string };