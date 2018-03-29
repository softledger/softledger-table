'use strict';
import React from 'react';

export default ({filter, onChange}) => {
	const handle = e => e ? ({
		$iLike: `%${e}%`
	}) : null;

	return (
		<input 
			style={{width:"100%"}}
			placeholder="Type to filter..."
			onChange={e => onChange(handle(e.target.value))}
		/>
	)
}