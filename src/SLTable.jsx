'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {
	DropDownMenu, ButtonBar, BoolDropDownMenuItem, LoadingButton
} from '@softledger/components';
import Filters from './TableFilters';
import { Container, Row, Col, DropdownItem } from 'reactstrap';
import ReactTable from 'react-table';
import {debounce} from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const getHeaders = (columns, visibleOnly) => {
	if(!columns) return false;
	//if(!visibleOnly) return false;
	let headers = [];
	columns.forEach(c => {
		if(visibleOnly) {
			if(c.hasOwnProperty('show') && !c.show) return;
		};
		if(!c.accessor) return;
		headers.push(c.accessor);
	});
	return headers;
}

/**
 * Extension of react-table to simplify for our standard use case
 */
export default class SLTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filtering: false,
			columns: this.buildColumns(props.columns)
		}
	}

	renderMenu = () => {
		if(this.props.showMenu === false) return;
		return (
			<ButtonBar style={{float: "right"}}
				buttons={[
					this.props.getReport && 
					<LoadingButton 
						onClick={() => this.props.getReport({
							headers: getHeaders(this.state.columns, true)
						})}
						iconClass="file-alt"
						buttonClass="btn-secondary"
						toolTip="Export Visible Columns" />
					,
					this.props.getReport && 
					<LoadingButton 
						onClick={() => this.props.getReport({
							headers: getHeaders(this.state.columns, false)
						})}
						iconClass="file"
						buttonClass="btn-secondary"
						toolTip="Export All Columns" />
					,
					<DropDownMenu 
						class="float-right"
						toggleTag={(
							<div style={{margin:"-1px"}}>
								<FontAwesomeIcon icon="columns" />
								<FontAwesomeIcon icon="caret-down" 
									style={{marginLeft:".5rem"}} />
							</div>
						)}
					>
				  	{
				  		this.state.columns.map((c, idx) => {
					  		if(!c.Header) return;
					  		if(c.show === undefined) c.show = true;
					  		return (
					  			<BoolDropDownMenuItem key={c.Header}
						  			value={c.show}
						  			text={c.Header}
						  			onToggle={() => this.toggleColumn(idx)} 
						  		/>
					  		)
					  	})
				  	} 
				  	{
				  		this.props.onSaveTableFields &&
				  			<span>
				  				<DropdownItem divider />
						  		<DropdownItem
						  			key="saveTableFields"
						  			onClick={() => this.props.onSaveTableFields({
						  				headers: getHeaders(this.state.columns, true)
						  			})}
						  		>
						  			<FontAwesomeIcon icon="save" />
								    <span style={{paddingLeft:"5px",paddingRight:"5px"}}>&#124;</span>
								    Save Table Fields 
								  </DropdownItem>
						  	</span>
				  	}
				  </DropDownMenu>
				]}
		  />
		)
	}

	toggleColumn = idx => this.setState({
		columns: update(this.state.columns, {
			[idx]: {
				show: {
					$apply: show => !show
				}
			}
		})
	})

	buildColumns = columns => columns.map(c => {
		//if not filterable return
		if(!c.hasOwnProperty("filterable") || c.filterable) {
			//see if custom filter function
			if(c.customFilter) {
				c.Filter = c.customFilter;
			}	else {
				//set filterable type
				c.Filter = Filters[c.myFilter || 'Text'];
			}
		}

		return c;
	})

	onFilteredChange = (column, value) => this.filtering = true

	fetchStrategy = tableState => {
		//console.log("filtering", this.filtering);
		if(this.filtering) {
			return this.fetchWithDebounce(tableState);
		} else {
			this.filtering = false;
			return this.props.fetchData(tableState);
		}
	}

	//250ms debounce time (human response limit)
	fetchWithDebounce = debounce(this.props.fetchData, 250)

	render() {
		const {
			columns
		} = this.state;
		const {
			loading,
			data,
			pages,
			pageSize
		} = this.props;

		return (
			<Container fluid={true}>
				<Row>
					<Col>
						{this.renderMenu()}
					</Col>
				</Row>
				<ReactTable 
					{...this.props}
					className="-highlight"
					columns={columns}
					manual
					defaultPageSize={pageSize || 25}
					onFetchData={this.fetchStrategy}
					onFilteredChange={this.onFilteredChange}
					filterable
					// Any Tr element will be green if its (row.age > 20)
				  getTrProps={(state, rowInfo, column) => {
				  	//if expanded add class
				  	if (rowInfo && state.expanded[rowInfo.index]) {
					    return {
					      style: {
					        backgroundColor: '#eaedef'
					      }
					    }
					  }else {
					  	return {};
					  }
				  }}
				  getTdProps={() => {
				  	return {
				  		style: {
				  			overflow: this.props.showOverflow || 'hidden'
				  		}
				  	}
				  }}
				  //for date filters
				  getTheadFilterThProps={() => {
				  	return {style: {overflow:'visible'}}
				  }}
				/>
			</Container>
		)
	}

}

SLTable.propTypes = {
	/**
	 * array of objects to display in the table
	 */
	data: PropTypes.array,
	/**
	 * total # of pages
	 */
	pages: PropTypes.number,
	/**
	 * number of items to show per page
	 */
	pageSize: PropTypes.number,
	/**
	 * array describing how to display each key in data
	 * see react-table for full description
	 */
	columns: PropTypes.array.isRequired,
	/**
	 * custom filter defined per react-table
	 */
	'columns[].customFilter': PropTypes.any,
	/**
	 * Predefined filter to use, defaults to 'Text';
	 */
	'columns[].myFilter': PropTypes.oneOf([
		'Integer',
		'Number',
		'Date',
		'StringAsInt',
		'Text'
	]),
	/**
	 * function to be called when we need to fetch new data
	 * ie, when page/limit is changed or filtered
	 */
	fetchData: PropTypes.func.isRequired,
	/**
	 * Subcomponent to display when a table is expanded
	 */
	SubComponent: PropTypes.func,
	/**
	 * default column to sort by
	 */
	defaultSorted: PropTypes.array,
	/**
	 * whether or not to display the column toggle menu
	 */
	showMenu: PropTypes.bool,
	/**
	 * true will allow inputs such as dropdowns etc to show
	 */
	showOverflow: PropTypes.bool,
	/**
	 * function which will return a csv of the data
	 * if blank, will hide menu buttons
	 */
	getReport: PropTypes.func,
	/**
	 * callback which returns all visible headers
	 * useful to store default headers
	 */
	onSaveTableFields: PropTypes.func
};

SLTable.defaultProps = {
	showMenu: true,
	showOverflow: false
}