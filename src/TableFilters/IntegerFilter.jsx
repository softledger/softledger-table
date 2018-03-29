'use strict';
import React from 'react';

export default ({ filter, onChange }) => {
	const handle = e => parseInt(e);
	return (
		<input 
			type="number"
			placeholder="Type to filter..."
			style={{width:"100%"}}
			onChange={e => onChange(handle(e.target.value))}
		/>
	)
}