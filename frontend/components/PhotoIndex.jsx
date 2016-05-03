var React = require('react');
var BusinessStore = require('../stores/business');
var ClientActions = require('../actions/ClientActions');
var UserStore = require('../stores/user');
var FormConstants = require('../constants/FormConstants');
var FormModal = require('../modals/FormModal');
var PhotoIndexItem = require('./PhotoIndexItem');
var PhotoForm = require('./PhotoForm');


var PhotoIndex = React.createClass({
	getInitialState: function () {
		return ({photos: [], modalIsOpen: false});
	},

	componentWillMount: function () {
		this.businessListener = BusinessStore.addListener(this._onChange);
	},

	_onChange: function () {
		var photos = BusinessStore.currentBusiness().photos;
		this.setState({photos: photos});
	},

	render: function() {
		debugger
		var photos = this.state.photos.map(function (photo) {
			return <PhotoIndexItem photo={photo}/>;
		});
		return (
			<div className="photo-index">
				{photos}
				<PhotoForm 
					businessId={this.props.businessId} 
					openModal={this.props.openModal}
					closeModal={this.props.closeModal}
				/>
			</div>
		);
	}

});

module.exports = PhotoIndex;

