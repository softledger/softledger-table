'use strict';

//import Date from './DateFilter';
Object.defineProperty(exports, "__esModule", { value: true });var _IntegerFilter = require('./IntegerFilter');var _IntegerFilter2 = _interopRequireDefault(_IntegerFilter);
var _NameAndNumberFilter = require('./NameAndNumberFilter');var _NameAndNumberFilter2 = _interopRequireDefault(_NameAndNumberFilter);
var _NumberFilter = require('./NumberFilter');var _NumberFilter2 = _interopRequireDefault(_NumberFilter);
var _StringAsIntFilter = require('./StringAsIntFilter');var _StringAsIntFilter2 = _interopRequireDefault(_StringAsIntFilter);
var _TextFilter = require('./TextFilter');var _TextFilter2 = _interopRequireDefault(_TextFilter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =


{
	//Date,
	Integer: _IntegerFilter2.default,
	NameAndNumber: _NameAndNumberFilter2.default,
	Number: _NumberFilter2.default,
	StringAsInt: _StringAsIntFilter2.default,
	Text: _TextFilter2.default };