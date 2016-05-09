var React = require('react');
var TagStore = require('../stores/tag');
var ClientActions = require('../actions/ClientActions');

var TagFilter = React.createClass({
	getInitialState: function () {
		return ({tags: []});
	},

	componentWillMount: function () {
		ClientActions.fetchTags();
		this.tagListener = TagStore.addListener(this._onChange);
	},

	componentWillUnmount: function () {
		this.tagListener.remove();
	},

	_onChange: function () {
		this.setState({tags: TagStore.all()});
	},

	clearTags: function () {
		$('input:checkbox').removeAttr('checked');
		this.props.clearTags();
	},

	render: function() {
		var updateTags = this.props.updateTags;
		var tags;
		if (this.state.tags.length) {
			tags = this.state.tags.map(function (tag) {
				return (
						<label key={tag.id} >
							<input type="checkbox" 
									 onChange={updateTags} 
									 value={tag.id}
							/>
							{tag.name}
						</label>
				);
			});
		} else {
			return <div/>;
		}
		return (
			<div className={"tag-filter-index"}>
				<h2>Filter</h2>
				{tags}
				<button onClick={this.props.searchBusiness}>Filter</button>
				<button onClick={this.clearTags}>Clear Tags</button>
			</div>
		);
	}

});

module.exports = TagFilter;