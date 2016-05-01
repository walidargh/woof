var React = require('react');
var Modal = require('react-modal');
var UserStore = require('../stores/user');
var BusinessStore = require('../stores/business');
var FormConstants = require('../constants/FormConstants');
var LoginForm = require('../components/LoginForm');
var BusinessForm = require('../components/BusinessForm');
var ReviewForm = require('../components/ReviewForm');

Modal.setAppElement(document.body);

var formModal = React.createClass({
	getInitialState: function () {
		return ({modalIsOpen: false});
	},

	componentWillMount: function () {
		this.businessListener = BusinessStore.addListener(this._onChange);
		this.userListener = UserStore.addListener(this._onChange);
	},

	componentWillReceiveProps: function (newProps) {
		this.setState({modalIsOpen : newProps.modalIsOpen});
	},

	_onChange: function () {
		this.closeModal();
	},

	openModal: function () {
		this.setState({modalIsOpen: true});
	},

	closeModal: function () {
		this.setState({modalIsOpen: false});
	},

 	form: function () {
		if (UserStore.currentUser()) {
			console.log('here is the business form');
			var form;
			switch(this.props.modalFormType) {
				case FormConstants.LOGINFORM:
					form = <LoginForm />;
				break;

				case FormConstants.BUSINESSFORM:
					form = <BusinessForm />;
				break;

				case FormConstants.REVIEWFORM:
					form = <ReviewForm />;
				break;
			}
			return form;
		} else {
			console.log('sorry please log in to see the business form');
				return (<LoginForm formType="Log In"/>);
			}
 	},

 	render: function () {

 		return (
 			<Modal
				isOpen={this.state.modalIsOpen} 
				onRequestClose={this.closeModal}>
				{this.form()}
			</Modal>
		);
 	}
});

module.exports = formModal;