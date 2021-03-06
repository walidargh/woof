var React = require('react');
var BusinessStore = require('../stores/business');
var ClientActions = require('../actions/ClientActions');
var ReviewIndex = require('./ReviewIndex');
var PhotoIndex = require('./PhotoIndex');

var BusinessDetail = React.createClass({

	getInitialState: function () {
		return {business: "", modalIsOpen: false};
	},

	getStatefromStore: function () {
		var business = BusinessStore.find(this.props.routeParams.businessId);
		return {business: business};
	},

	componentWillReceiveProps: function (newProps) {
		ClientActions.fetchSingleBusiness(parseInt(newProps.params.businessId));
	},	

	componentDidMount: function () { 
		var businessId = parseInt(this.props.params.businessId);
		ClientActions.fetchSingleBusiness(businessId);
		this.businessListener = BusinessStore.addListener(this._onChange);
	},

	componentWillUnmount: function () {
		this.businessListener.remove();
	},

	_onChange: function () {
		this.setState(this.getStatefromStore());
	},

	reviewForm: function () {
		if (this.state.business === "") {
			return ;
		} else {
			return (
				<ReviewIndex 
					reviews={this.state.business.reviews} 
					businessId={this.state.business.id}
					businessName={this.state.business.name}
				/>
			);
		}
	},

	photoForm: function () {
		if (this.state.business !== "") {
				return (
					<PhotoIndex 
						photos={this.state.business.photos}
						businessId={this.state.business.id}
					/>

				);
		} else {
				return <div></div>;
			}
	},

	featureImage: function () {
		var business = this.state.business;
		var featureImage = "https://s3-us-west-1.amazonaws.com/owlhowler/howler/default_background.jpg";
		if (business !== "") {
			if (business.featured || business.photos.length > 0) {
				featureImage = business.featured ? 
					business.featured.url : business.photos[0].url;
			}
		}
		// return { backgroundImage: 'url(' + featureImage + ')' };
		return featureImage;
	},

	render: function () {
		var rating = "No Reviews";
		if (this.state.business.rating !== "null") {
			rating = this.state.business.rating;
		}

		var price;
		if (this.state.business) {
			price = Array(this.state.business.price + 1).join("$");
		}

		return (
			<div className="business-detail">

				<div className="business-detail-feature-bar">

					<div className="business-detail-image">
						<img src={this.featureImage()} />
					</div>

						<div className="business-detail-feature-text">
							<li className="business-detail-title">
								{this.state.business.name}
							</li>

							<li className="business-detail-address">
								{this.state.business.address}
							</li>

							<li className="business-detail-hours">
								{this.state.business.hours}
							</li>

							<li className="business-detail-price">
								{price}
							</li>
						</div>

					<div className="business-detail-rating">
						{rating + "      "} <i className={'fa fa-star'}/>
					</div>

			</div>

				{this.photoForm()}
				{this.reviewForm()}

			</div>
		);
	}
});

module.exports = BusinessDetail;