var ServerActions = require('../actions/ServerActions');

var ApiUtil = {
	fetchBusinesses: function () {
		$.ajax({
			url: '/api/businesses',
			type: 'GET',
			success: ServerActions.receiveAll,
			error: ServerActions.handleError,
		});
		// TODO: create handleError and receiveBusinesses
	},
	createBusiness: function (data) {
			$.ajax({
			url: '/api/businesses',
			type: 'POST',
			data: {business: data},
			success: ServerActions.receiveSingleBusiness,
			// make sure receiveSingleBusiness takes a business as an argument
			error: ServerActions.handleError
		});
	}

};

module.exports = ApiUtil;