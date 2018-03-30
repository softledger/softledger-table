import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withState } from '@dump247/storybook-state';

import { SimpleTable, SLTable } from '../src';
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
