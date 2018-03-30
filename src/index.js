//hopefully this works?
import fontawesome from '@fortawesome/fontawesome';
import faColumns from '@fortawesome/fontawesome-free-solid/faColumns';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';
fontawesome.library.add(faColumns, faCaretDown, faFileAlt, faFile);


import SimpleTable from './SimpleTable';
import SLTable from './SLTable';

export {
	SimpleTable,
	SLTable
}