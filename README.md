
## SLTable

From [`src/SLTable.jsx`](src/SLTable.jsx)

Extension of react-table to simplify for our standard use case

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**SubComponent** | `Function` |  | :x: | Subcomponent to display when a table is expanded
**columns** | `Array` |  | :white_check_mark: | array describing how to display each key in data see react-table for full description
**columns[].customFilter** | `*` |  | :x: | custom filter defined per react-table
**columns[].myFilter** | `Enum('Integer','NameAndNumber','Date','StringAsInt','Text')` |  | :x: | Predefined filter to use, defaults to 'Text';
**data** | `Array` |  | :x: | array of objects to display in the table
**defaultSorted** | `Array` |  | :x: | default column to sort by
**fetchData** | `Function` |  | :white_check_mark: | function to be called when we need to fetch new data ie, when page/limit is changed or filtered
**getReport** | `Function` |  | :x: | function which will return a csv of the data if blank, will hide menu buttons
**pageSize** | `Number` |  | :x: | number of items to show per page
**pages** | `Number` |  | :x: | total # of pages
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



