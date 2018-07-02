//styles

import 'react-table/react-table.css'
import '@softledger/components/dist/styles.scss';
import '@softledger/form-components/dist/styles.scss';
import './styles.scss';

//hopefully this works?
import fontawesome from '@fortawesome/fontawesome';
import faColumns from '@fortawesome/fontawesome-free-solid/faColumns';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';
import faSave from '@fortawesome/fontawesome-free-solid/faSave';
fontawesome.library.add(faColumns, faCaretDown, faFileAlt, faFile, faSave);

import SelectTable from './SelectTable';
import SimpleTable from './SimpleTable';
import SLTable from './SLTable';

export {
	SelectTable,
	SimpleTable,
	SLTable
}