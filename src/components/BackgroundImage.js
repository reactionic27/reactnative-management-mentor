/**
 * # GradientOverlay.js
 *
 */
'use strict';
/**
 * ## Imports
 *
 */
import React, {PropTypes} from 'react';
import {Image} from 'react-native';

var GradientOverlay = React.createClass({
    propTypes: {
        opacity: PropTypes.number,
        source: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number
        ])
    },

    render: function () {

        let source = this.props.source || require('../images/gradient-overlay.png');
        return <Image
            source={source}
            resizeMode='cover'
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                // Fix https://github.com/facebook/react-native/issues/950#issuecomment-210758358
                height: null,
                width: null,
                opacity: this.props.opacity || 0.3
            }}
        />
    }
});

module.exports = GradientOverlay;
