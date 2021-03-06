'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {
	DropDownMenu, BoolDropDownMenuItem, ButtonBar
} from '@softledger/components';
import DataToCSV from './components/DataToCSV';
import { Container, Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import * as FilterMethods from './TableFilters/filterMethods';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

//handles nested headers as well
const buildDropDownColumns = (columns, onToggle, topIdx) => {
	let built = [];
	columns.forEach((c, idx) => {
		if(!c.Header) return;
		if(c.columns) {
			let nested = buildDropDownColumns(c.columns, onToggle, idx);
			built = built.concat(nested);
		} else {
			if(c.show === undefined) c.show = true;
			built.push(
				<BoolDropDownMenuItem key={c.Header}
				value={c.show}
				text={c.Header}
				onToggle={() => {
					if(topIdx) return onToggle(topIdx, idx);
					return onToggle(idx)
				}} />
			);
		}
	});
	return built;
}

export default class SimpleTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			columns: this.buildColumns(props.columns)
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.columns !== this.state.columns) {
			this.setState({
				columns: this.buildColumns(nextProps.columns)
			});
		}
	}

	renderMenu = (data, columns) => {
		if(!this.props.showMenu === false) return;
		return (
			<ButtonBar style={{float:"right"}}
				buttons={[
					this.props.reportFileName && 
					<DataToCSV style={{float:"right"}}
						fileName={this.props.reportFileName}
						data={data}
						columns={columns}
						iconClass="file-alt"
						visibleOnly={true}
						toolTip="Export Visible Columns" />
					,
					this.props.reportFileName && 
					<DataToCSV style={{float:"right"}}
						fileName={this.props.reportFileName}
						data={data}
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
				  	{buildDropDownColumns(this.state.columns, this.toggleColumn)} 
				  </DropDownMenu>
				 ]} />
		)
	}

	toggleColumn = (idx, nestedIdx) => {
		if(nestedIdx > -1) {
			this.setState({
				columns: update(this.state.columns, {
					[idx]: {
						columns: {
							[nestedIdx]: {
								show: {
									$apply: show => !show
								}
							}
						}
					}
				})
			})
		} else {
			this.setState({
				columns: update(this.state.columns, {
					[idx]: {
						show: {
							$apply: show => !show
						}
					}
				})
			})
		}
	}

	buildColumns = columns => columns && columns.map(c => {
		//if not filterable return
		if(!c.hasOwnProperty("filterable") || c.filterable) {
			//see if custom filter function
			if(c.customFilter) {
				c.filterMethod = c.customFilter;
			} else if(c.myFilter) {
				c.filterMethod = FilterMethods[c.myFilter];
			}
		} //else use default

		return c;
	})

	render() {
		const {
			columns
		} = this.state;
		const {
			data,
			loading
		} = this.props;

		return (
			<Container fluid={true}>
				<Row>
					<Col xs={{size:6, offset:6}}>
						{this.renderMenu(data, columns)}
					</Col>
				</Row>
				<ReactTable 
					{...this.props}
					className="-highlight"
					data={data || []}
					columns={columns}
					defaultSorted={this.props.defaultSorted}
					defaultPageSize={25}
					defaultFilterMethod={FilterMethods.Default}
					loading={loading}
					filterable
					SubComponent={this.props.SubComponent}
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
				/>
			</Container>
		)
	}

}

SimpleTable.propTypes = {
	data: PropTypes.array,
	columns: PropTypes.array.isRequired,
	defaultSorted: PropTypes.array,
	showMenu: PropTypes.bool, //default true
	loading: PropTypes.bool,
	SubComponent: PropTypes.func,
	//required ify ou want to export reports
	reportFileName: PropTypes.string
};