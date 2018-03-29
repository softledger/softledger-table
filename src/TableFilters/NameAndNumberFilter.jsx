'use strict';
import React from 'react';

export default idx => {
	//returns filter component
	return ({filter, onChange}) => {
		const handle = e => e ? ({
				overrideId: true,
				filter: {
					$or: {
						[`$${idx}.name$`]: { $iLike: `%${e}%` },
						[`$${idx}.number$`]: { $iLike: `%${e}%` }
					}
				}
			}) : null;

		return (
			<input 
				style={{width:"100%"}}
				placeholder="Type to filter..."
				onChange={e => onChange(handle(e.target.value))}
			/>
		)
	}
}