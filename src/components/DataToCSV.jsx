'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {downloadCSV} from '../util/arrayToCSV';
import { LoadingButton } from '@softledger/components';


const DataToCSV = props => {
	const getHeaders = () => {
		if(!props.columns) return false;
		if(!props.visibleOnly) return false;
		let headers = [];
		props.columns.forEach(c => {
			if(c.hasOwnProperty('show') && !c.show) return;
			if(!c.accessor) return;
			headers.push(c.accessor);
		});
		return headers;
	}

	return (
		<LoadingButton 
			onClick={() => downloadCSV(props.fileName, props.data, getHeaders())}
			style={props.style}
			toolTip={props.toolTip}
			iconClass={props.iconClass || "file"}
			buttonClass={props.buttonClass || "btn-secondary"}
			disabled={!props.data || !props.data.length} 
			notPromise={true}
		/>
	);
}

DataToCSV.proptypes = {
	fileName: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	//required if visible only = true
	columns: PropTypes.array,
	visibleOnly: PropTypes.bool,
	buttonClass: PropTypes.string,
	iconClass: PropTypes.string,
	toolTip: PropTypes.string
}

export default DataToCSV;

