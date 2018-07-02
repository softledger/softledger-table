
## SLTable

From [`src/SLTable.jsx`](src/SLTable.jsx)

Extension of react-table to simplify for our standard use case

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**SubComponent** | `Function` |  | :x: | Subcomponent to display when a table is expanded
**columns** | `Array` |  | :white_check_mark: | array describing how to display each key in data see react-table for full description
**columns[].customFilter** | `*` |  | :x: | custom filter defined per react-table
**columns[].myFilter** | `Enum('Integer','Number','Date','StringAsInt','Text')` |  | :x: | Predefined filter to use, defaults to 'Text';
**data** | `Array` |  | :x: | array of objects to display in the table
**defaultSorted** | `Array` |  | :x: | default column to sort by
**fetchData** | `Function` |  | :white_check_mark: | function to be called when we need to fetch new data ie, when page/limit is changed or filtered
**getReport** | `Function` |  | :x: | function which will return a csv of the data if blank, will hide menu buttons
**onSaveTableFields** | `Function` |  | :x: | callback which returns all visible headers useful to store default headers
**pageSize** | `Number` |  | :x: | number of items to show per page
**pages** | `Number` |  | :x: | total # of pages
**showMenu** | `Boolean` | `true` | :x: | whether or not to display the column toggle menu
**showOverflow** | `Boolean` | `false` | :x: | true will allow inputs such as dropdowns etc to show




## SelectTable

From [`src/SelectTable.jsx`](src/SelectTable.jsx)

Extension of react-table to simplify for our standard use case

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**SubComponent** | `Function` |  | :x: | Subcomponent to display when a table is expanded
**columns** | `Array` |  | :white_check_mark: | array describing how to display each key in data see react-table for full description
**columns[].customFilter** | `*` |  | :x: | custom filter defined per react-table
**columns[].myFilter** | `Enum('Integer','Number','Date','StringAsInt','Text')` |  | :x: | Predefined filter to use, defaults to 'Text';
**data** | `Array` |  | :x: | array of objects to display in the table
**defaultSorted** | `Array` |  | :x: | default column to sort by
**fetchData** | `Function` |  | :white_check_mark: | function to be called when we need to fetch new data ie, when page/limit is changed or filtered
**getReport** | `Function` |  | :x: | function which will return a csv of the data if blank, will hide menu buttons
**keyField** | `String` |  | :white_check_mark: | column index to store in selection set
**onSaveTableFields** | `Function` |  | :x: | callback which returns all visible headers useful to store default headers
**onToggleSelect** | `Function` |  | :white_check_mark: | function to call when a row selection is toggled
**onToggleSelectAll** | `Function` |  | :white_check_mark: | funciton to call when select all is toggled called with 'true' when table data is changed
**pageSize** | `Number` |  | :x: | number of items to show per page
**pages** | `Number` |  | :x: | total # of pages
**selectAll** | `Boolean` |  | :x: | true/false if select all is set
**selection** | `Array` |  | :white_check_mark: | array containing selected 'key' values
**selectionColor** | `String` | `'inherit'` | :x: | css color to highlight row when selected
**showMenu** | `Boolean` | `true` | :x: | whether or not to display the column toggle menu
**showOverflow** | `Boolean` | `false` | :x: | true will allow inputs such as dropdowns etc to show




## SimpleTable

From [`src/SimpleTable.jsx`](src/SimpleTable.jsx)



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**SubComponent** | `Function` |  | :x: | 
**columns** | `Array` |  | :white_check_mark: | 
**data** | `Array` |  | :x: | 
**defaultSorted** | `Array` |  | :x: | 
**loading** | `Boolean` |  | :x: | 
**reportFileName** | `String` |  | :x: | 
**showMenu** | `Boolean` |  | :x: | 



