import React from 'react';

class Square extends React.Component {
	render() {
		return (
			<button onClick={this.props.onClick}style={{background:this.props.value}} className="square">
			</button>
		);
	}
}

export default Square