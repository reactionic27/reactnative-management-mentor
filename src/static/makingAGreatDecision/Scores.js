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
    Picker
}
    from 'react-native';

const Item = Picker.Item;

import _ from 'underscore'

const styles = require('./Stylesheet');
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';

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

    getInitialState: function () {
        // console.log(this.props.data);

        let data = this.props.data.toJS(),
            state = {
                scores: []
            };

        for (var i = 1; i <= NUMBER_OF_OPTIONS; i++) {
            for (var j = 1; j <= NUMBER_OF_CRITERIA; j++) {
                state['score' + i + '_' + j] = data['score' + i + '_' + j];
            }
        }

        for (var k = 1; k <= MAXIMUM_SCORE; k++) {
            state.scores[k - 1] = {
                value: k,
                text: k.toString()
            };
        }

        return state;
    },

    componentWillReceiveProps(nextProps) {
        // console.log("Scores componentWillReceiveProps: ", nextProps.data.toJS());

        let data = nextProps.data.toJS(),
            nextState = {};

        for (var i = 1; i <= NUMBER_OF_OPTIONS; i++) {
            for (var j = 1; j <= NUMBER_OF_CRITERIA; j++) {
                nextState['score' + i + '_' + j] = data['score' + i + '_' + j];
            }
        }

        this.setState(nextState);
    },

    componentDidMount() {
    },

    render: function () {

        let data = this.props.data.toJS(),
            options = [],
            criteria = [];

        for (var i = 1; i <= NUMBER_OF_OPTIONS; i++) {
            if (data['option' + i]) options.push(data['option' + i]);
        }

        for (var j = 1; j <= NUMBER_OF_CRITERIA; j++) {
            if (data['criterion' + j]) criteria.push(data['criterion' + j]);
        }

        let missingText = !options.length ? 'options' : (!criteria.length ? 'criteria' : ''),
            missingSlide = !options.length ? 'Main Options' : (!criteria.length ? 'Criteria' : ''),
            scores = <View>
            <Text
                style={[styles.paragraph, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                {
                    'You have not selected any '
                    + missingText +
                    ', go back to '
                    + missingSlide
                    + '.'
                }
            </Text>
        </View>;

        if (options.length && criteria.length) {
            scores = <View>
                <Text
                    style={[styles.paragraph, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                    {
                        'Now, for each option, score them 1 - ' +
                        MAXIMUM_SCORE +
                        ' for each of the criteria.'
                    }
                </Text>
                {
                    options.map((option, i) => {
                        return [
                            <Text
                                style={[styles.heading3, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                                {option}
                            </Text>,
                            criteria.map((criterion, j) => {
                                return <View
                                    key={"score_" + i + '_' + j}
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 5,
                                            paddingRight: 20,
                                            justifyContent: 'center'

                                        }}
                                    >
                                        <Text
                                            style={[styles.label, {marginBottom: 0}]}>
                                            {criterion}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 2
                                        }}
                                    >
                                        <Picker
                                            style={styles.picker}
                                            itemStyle={styles.pickerItem}
                                            selectedValue={this.state['score' + (i+1) + '_' + (j+1)]}
                                            onValueChange={(itemValue, itemPosition) => this._onPickerChange(itemValue, itemPosition, i+1, j+1)}>
                                            {
                                                this.state.scores.map((option) => {
                                                    return <Item
                                                        key={option.text}
                                                        label={option.text}
                                                        value={option.value}
                                                    />;
                                                })
                                            }
                                        </Picker>
                                    </View>
                                </View>;
                            })
                        ]
                    })
                }
            </View>
        }

        return <View>
            <Text
                style={[styles.heading1, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                Option scores
            </Text>
            <Text
                style={[styles.heading3, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                {this.props.data.toJS().topic || 'Topic'}
            </Text>
            {scores}
        </View>;
    },

    _onPickerChange(itemValue, itemPosition, i, j) {
        // console.log(itemValue, itemPosition, i, j);

        let newState = {};
        newState['score' + i + '_' + j] = itemValue;

        this.setState(newState);

        this.props.onToolFieldChange(newState);
    }
});

module.exports = Component;
