'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.SLTable = exports.SimpleTable = exports.SelectTable = undefined;

require('react-table/react-table.css');
require('@softledger/components/dist/styles.scss');
require('@softledger/form-components/dist/styles.scss');
require('./styles.scss');


var _fontawesome = require('@fortawesome/fontawesome');var _fontawesome2 = _interopRequireDefault(_fontawesome);
var _faColumns = require('@fortawesome/fontawesome-free-solid/faColumns');var _faColumns2 = _interopRequireDefault(_faColumns);
var _faCaretDown = require('@fortawesome/fontawesome-free-solid/faCaretDown');var _faCaretDown2 = _interopRequireDefault(_faCaretDown);
var _faFileAlt = require('@fortawesome/fontawesome-free-solid/faFileAlt');var _faFileAlt2 = _interopRequireDefault(_faFileAlt);
var _faFile = require('@fortawesome/fontawesome-free-solid/faFile');var _faFile2 = _interopRequireDefault(_faFile);
var _faSave = require('@fortawesome/fontawesome-free-solid/faSave');var _faSave2 = _interopRequireDefault(_faSave);


var _SelectTable = require('./SelectTable');var _SelectTable2 = _interopRequireDefault(_SelectTable);
var _SimpleTable = require('./SimpleTable');var _SimpleTable2 = _interopRequireDefault(_SimpleTable);
var _SLTable = require('./SLTable');var _SLTable2 = _interopRequireDefault(_SLTable);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //hopefully this works?
//styles
_fontawesome2.default.library.add(_faColumns2.default, _faCaretDown2.default, _faFileAlt2.default, _faFile2.default, _faSave2.default);exports.
SelectTable = _SelectTable2.default;exports.
SimpleTable = _SimpleTable2.default;exports.
SLTable = _SLTable2.default;