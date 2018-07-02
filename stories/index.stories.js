import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withState } from '@dump247/storybook-state';

import { SelectTable, SimpleTable, SLTable } from '../src';
import data from './fakeDate.json';

const columns = [{
		Header: "ID",
		accessor: "_id"
	}, {
		Header: "Index",
		accessor: 'index'
	}, {
		Header: 'GUID',
		accessor: 'guid'
	}, {
		Header: 'Active',
		accessor: 'isActive'
	}, {
		Header: 'Balance',
		accessor: 'balance'
	}, {
		Header: 'Age',
		accessor: 'age'
	}, {
		Header: 'Company',
		accessor: 'company'
	}];

storiesOf('SimpleTable', module)
	.add('default', () => 
		<SimpleTable 
			columns={columns}
			data={data}
		/>
	)
	.add('With CSV download', () => 
		<SimpleTable
			columns={columns}
			data={data}
			reportFileName="text.csv"
		/>
	);

storiesOf('SLTable', module)
	.add('default', withState({
		data: []
	}, store => {
		const fetchData = ({pageSize, page, sorted, filtered}) => fetch(` https://api.punkapi.com/v2/beers?page=${page+1}&per_page=${[pageSize]}`)
			.then(r => r.json())
			.then(data => 
				store.set({
					data
				})
			)

		return (
			<SLTable
				fetchData={fetchData}
				data={store.state.data}
				pages={10} //not really sture how many
				columns={[{
					Header: 'ID',
					accessor: 'id'
				}, {
					Header: 'Name',
					accessor: 'name'
				}, {
					Header: 'Description',
					accessor: 'description',
					myFilter: 'Date'
				}, {
					Header: 'ABV',
					accessor: 'abv'
				}, {
					Header: 'IBU',
					accessor: 'ibu'
				}, {
					Header: "Brewer's Tips",
					accessor: 'brewers_tips'
				}]}
			/>
		);
	}))
	.add('with Footer', withState({
		data: []
	}, store => {
		const fetchData = ({pageSize, page, sorted, filtered}) => fetch(` https://api.punkapi.com/v2/beers?page=${page+1}&per_page=${[pageSize]}`)
			.then(r => r.json())
			.then(data => 
				store.set({
					data
				})
			)

		return (
			<SLTable
				fetchData={fetchData}
				data={store.state.data}
				pages={10} //not really sture how many
				columns={[{
					Header: 'ID',
					accessor: 'id',
					Footer: 
						<div>
							Footer Text!!!
						</div>
				}, {
					Header: 'Name',
					accessor: 'name'
				}, {
					Header: 'Description',
					accessor: 'description'
				}, {
					Header: 'ABV',
					accessor: 'abv'
				}, {
					Header: 'IBU',
					accessor: 'ibu'
				}, {
					Header: "Brewer's Tips",
					accessor: 'brewers_tips'
				}]}
			/>
		);
	}))
	.add('with Save Table Fields', withState({
		data: [],
		headers: null
	}, store => {
		const fetchData = ({pageSize, page, sorted, filtered}) => fetch(` https://api.punkapi.com/v2/beers?page=${page+1}&per_page=${[pageSize]}`)
			.then(r => r.json())
			.then(data => 
				store.set({
					data
				})
			)

		const onSaveTableFields = ({headers}) => store.set({headers});

		return (
			<div>
				<SLTable
					onSaveTableFields={onSaveTableFields}
					fetchData={fetchData}
					data={store.state.data}
					pageSize={5}
					pages={10} //not really sture how many
					columns={[{
						Header: 'ID',
						accessor: 'id'
					}, {
						Header: 'Name',
						accessor: 'name'
					}, {
						Header: 'Description',
						accessor: 'description'
					}, {
						Header: 'ABV',
						accessor: 'abv'
					}, {
						Header: 'IBU',
						accessor: 'ibu'
					}, {
						Header: "Brewer's Tips",
						accessor: 'brewers_tips'
					}]}
				/>
				<p>
					{store.state.headers}
				</p>
			</div>
		);
	}))


storiesOf('SelectTable', module)
	.add('default', withState({
		data: [],
		selection: [],
		selectAll: false,
	}, store => {
		const fetchData = ({pageSize, page, sorted, filtered}) => fetch(` https://api.punkapi.com/v2/beers?page=${page+1}&per_page=${[pageSize]}`)
			.then(r => r.json())
			.then(data => 
				store.set({
					data
				})
			)

		const onToggleSelectAll = (dataChanged) => {
			if(dataChanged) {
				return store.set({
					selectAll: false,
					selection: []
				})
			}
			let selection = [];
			let selectAll = !store.state.selectAll;
			if(selectAll) {
				//add everything in
				store.state.data.forEach(a => selection.push(a.id));
			}
			store.set({
				selectAll,
				selection
			});
		}

		const onToggleSelect = key => {
			let selection = [...store.state.selection];
			let idx = selection.indexOf(key);
			if(idx === -1) {
				//add it in
				selection.push(key);
			} else {
				selection.splice(idx, -1);
			}
			store.set({
				selection
			});
		}

		return (
			<div>
				Selection: {JSON.stringify(store.state.selection)}
				<SelectTable
					onToggleSelectAll={onToggleSelectAll}
					onToggleSelect={onToggleSelect}
					selection={store.state.selection}
					selectAll={store.state.selectAll}
					fetchData={fetchData}
					data={store.state.data}
					keyField="id"
					pages={10} //not really sture how many
					columns={[{
						Header: 'ID',
						accessor: 'id'
					}, {
						Header: 'Name',
						accessor: 'name'
					}, {
						Header: 'Description',
						accessor: 'description',
						myFilter: 'Date'
					}, {
						Header: 'ABV',
						accessor: 'abv'
					}, {
						Header: 'IBU',
						accessor: 'ibu'
					}, {
						Header: "Brewer's Tips",
						accessor: 'brewers_tips'
					}]}
				/>
			</div>
		);
	}));
