import React from 'react';

class Square extends React.Component {
	render() {
		return (
			<button style={{background:this.props.value}} className="square">
				{this.props.value}
			</button>
		);
	}
}

export default Square