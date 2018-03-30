'use strict';
import {SLDateRange} from '@softledger/form-components';
import React from 'react';

const DateFilter = ({column, filter, onChange}) => {
	const onDatesChange = ({startDate, endDate}) => {
		let newFilter = {...filter};
		if(!newFilter.value) newFilter.value = {};
		if(startDate) {
			newFilter.value['$gte'] = startDate;
		}
		if(endDate) {
			newFilter.value['$lte'] = endDate;
		}
		//handle clear dates
		if(!startDate && !endDate) {
			newFilter.value = null;
		}
		return onChange(newFilter.value);
	}

	return (
		<SLDateRange
			id={column.id}
			startDate={filter && filter.value && filter.value['$gte']}
			endDate={filter && filter.value && filter.value['$lte']}
			onChange={onDatesChange}
		/>
	)
}

export default DateFilter;