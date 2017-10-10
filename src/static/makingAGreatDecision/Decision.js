/**
 * # makingAGreatDecision/Scores.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Animated
}
    from 'react-native';

import Chart from '../../components/Chart'

import _ from 'underscore'

const styles = require('./Stylesheet');
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const GREEN_COLOUR = '#65d39a';
const YELLOW_COLOUR = '#efc95f';
const RED_COLOUR = '#f67877';

var PureRenderMixin = require('react-addons-pure-render-mixin');
var ImmutablePropTypes = require('react-immutable-proptypes');

const NUMBER_OF_OPTIONS = 8;
const NUMBER_OF_CRITERIA = 5;
const MAXIMUM_SCORE = 10;

var Component = React.createClass({

    mixins: [PureRenderMixin],

    propTypes: {
        id: PropTypes.string,
        rootFolder: PropTypes.string,
        file: PropTypes.string,
        data: ImmutablePropTypes.map,
        onToolFieldChange: PropTypes.func,
        position: PropTypes.number,
        thisPrimaryColour: PropTypes.string,
        thisSecondaryColour: PropTypes.string,
        currentUser: PropTypes.object,
        currentTab: PropTypes.number,
        getCurrentTab: PropTypes.func
    },

    _getState(props) {
        let data = props.data.toJS(),
            options = [],
            criteria = [],
            state = {};

        for (var i = 1; i <= NUMBER_OF_OPTIONS; i++) {
            if (data['option' + i]) options.push(data['option' + i]);
        }

        let maximumTotal = 0;
        for (var j = 1; j <= NUMBER_OF_CRITERIA; j++) {
            if (data['criterion' + j]) {
                criteria.push(data['criterion' + j]);
                maximumTotal += data['weight' + j] ? MAXIMUM_SCORE * data['weight' + j] : MAXIMUM_SCORE
            }
        }

        options.forEach((option, index) => {
            let decisionScore = 0;
            criteria.forEach((criterion, jndex) => {
                if (!data['score' + (index+1) + "_" + (jndex + 1)]) data['score' + (index+1) + "_" + (jndex + 1)] = 1;
                if (!data['weight' + (jndex+1)]) data['weight' + (jndex+1)] = 1;

                decisionScore += parseInt(data['score' + (index+1) + "_" + (jndex + 1)]) * parseInt(data['weight' + (jndex+1)]);
            });
            state[option.split(' ').join('') + "Decision"] = new Animated.Value(decisionScore);
            state[option.split(' ').join('') + "Decision" + 'None'] = new Animated.Value(maximumTotal - decisionScore);
        });

        state.data = data;
        state.options = options;
        state.criteria = criteria;
        state.maximumTotal = maximumTotal;

        return state;
    },

    getInitialState: function () {
        return this._getState(this.props);
    },

    componentWillReceiveProps(nextProps) {
        // console.log("Scores componentWillReceiveProps: ", nextProps.data.toJS());
        this.setState(this._getState(nextProps));
    },

    componentDidMount() {
    },

    render: function () {

        return <View>
            <Text
                style={[styles.heading1, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                Decision scores
            </Text>
            <View
                style={{height: 200}}
            >
                <Chart
                    state={this.state}
                    columns={this.state.options.map((option) => option.split(' ').join(''))}
                    showValue={true}
                    measure='Decision'
                    colourInterpolation={{
                            inputRange: [
                               0,
                               this.state.maximumTotal / 2,
                               this.state.maximumTotal
                            ],
                            outputRange: [
                               RED_COLOUR,
                               YELLOW_COLOUR,
                               GREEN_COLOUR
                            ]
                        }}
                    headingText={this.props.data.toJS().topic || 'Topic'}
                    headingColour={DARK_GREY_COLOUR}
                    legendTexts={this.state.options}
                    legendColour={DARK_GREY_COLOUR}
                    panHandlers={null}
                />
            </View>
        </View>;
    }
});

module.exports = Component;
