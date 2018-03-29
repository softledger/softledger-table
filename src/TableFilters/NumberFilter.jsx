'use strict';
import React from 'react';


const NumberFilter = ({filter, onChange}) => {
	const handle = val => {
		const vals = val.split(':');
		//case 1 
		if(val.indexOf(':') < 0) {
			return parseFloat(val);
		} else if(val.startsWith(':')) {
			return {
				'$lte': parseFloat(vals[1])
			};
		} else if (val.endsWith(':')) {
			return {
				'$gte': parseFloat(vals[0])
			};
		} else {
			return {
				'$gte': parseFloat(vals[0]),
				'$lte': parseFloat(vals[1])
			}
		}
	} 


	return (
		<div>
			<input
				type="text"
				style={{width:"100%"}}
				placeholder="Type to filter..."
				onChange={e => onChange(handle(e.target.value))}
			/>
		</div>
	)
}

export default NumberFilter;