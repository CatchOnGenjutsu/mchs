import React from 'react';
import styles from './ArrowIcon.module.css';
import PropTypes from 'prop-types';

export default class ArrowIcon extends React.Component {
	static defaultProps = {
		fill: 'currentColor',
		width: '21.3px',
		height: '21.3px',
		display: 'inline-block',
		fontSize: '1.1em',
		// viewBox="0 0 16.000000 16.000000",
		// transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		userSelect: 'none',
		flexShrink: 0,
	};

	render() {
		const { rotated } = this.props;
		return (
			<svg
				className={rotated ? styles['rotated-image'] : ''}
				fill={this.props.fill}
				width={this.props.width}
				height={this.props.height}
				fontSize={this.props.fontSize}
				display={this.props.display}
				// viewBox={this.props.viewBox}
				// transition={this.props.transition}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 576 512">
				<path
					d="M30 103 c1 -10 11 -20 25 -33 l25 -23 25 23 c14 13 25 28 25 33 0 6
-11 0 -25 -13 l-25 -23 -25 23 c-14 13 -25 19 -25 13z"
				/>
			</svg>
		);
	}
}

ArrowIcon.propTypes = {
	rotated: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	userInfo: PropTypes.object.isRequired,
};
