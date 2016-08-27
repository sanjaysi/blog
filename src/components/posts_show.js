import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	};

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
			.then(() => { 
				this.context.router.push("/");
			});
	};

	renderPost(post) {
		if (!post || post.id != this.props.params.id) {
			return <div>Loading...</div>;
		}

		return (
		<div>
			<h3>{post.title}</h3>
			<h6>{post.categories}</h6>
			<p>{post.content}</p>
		</div>
		);
	};

	render() {
		const {post} = this.props;

		return(
			<div>
				<Link to="/">Back To Index</Link>
				<button 
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)} >
					Delete Post
				</button>
				{this.renderPost(post)}
			</div>
		);
	};
}

function mapStateToProps(state) {
	return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);