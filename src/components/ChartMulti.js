/**
 * # Chart.js
 *
 */
'use strict';
/**
 * ## Imports
 *
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated
}
    from 'react-native';

const titleize = require('titleize');

/**
 * ## Styles
 */
var globalStyles = require('../components/Stylesheet');
const PADDING = 20;
const FONT_SIZE = 14;
const DEFAULT_BORDER_RADIUS = PADDING / 8;
const styles = StyleSheet.create({
    chartContainer: {
        flex: 4,
        justifyContent: 'flex-start',
        marginBottom: PADDING / 2
    },
    chartHeading: {
        paddingRight: PADDING,
        paddingLeft: PADDING,
        paddingTop: PADDING,
        paddingBottom: PADDING / 2,
        alignItems: 'center'
    },
    chart: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: PADDING,
        paddingLeft: PADDING
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        marginRight: PADDING / 8,
        marginLeft: PADDING / 8,
        borderRadius: DEFAULT_BORDER_RADIUS,
        overflow: 'hidden'
    },
    columnLegend: {
        paddingTop: PADDING / 4,
        paddingBottom: PADDING / 4,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    columnValue: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    columnValueText: {
        color: 'white',
        backgroundColor: 'transparent'
    }
});

const ColumnValue = ({flex, colour, opacity, text}) => {

    let textComponent = text ? <Text style={styles.columnValueText}>
        {text}
    </Text> : <View/>;

    return <Animated.View
        style={[styles.columnValue, {
            backgroundColor: colour,
            flex: flex,
            opacity: opacity
        }]}>
        {textComponent}
    </Animated.View>
};

const Column = ({state, measure, subMeasures, column, showValue, legendText, legendColour}) => (
    <View style={{flex: 1}}>
        <View style={[styles.column, {backgroundColor: state.greyedOutColour}]}>
            {
                subMeasures.map((section) => <ColumnValue
                    key={section.subMeasure}
                    flex={state[column + measure + section.subMeasure]}
                    colour={section.colour}
                    opacity={state[column + measure + 'Opacity']}
                    text={showValue ? state[column + measure + section.subMeasure]._value : null}
                />
                )
            }
            <ColumnValue flex={state[column + measure + 'None']}
                         colour={state.greyedOutColour}
                         opacity={state[column + measure + 'Opacity']}/>
        </View>
        <View style={styles.columnLegend}>
            <Text style={[globalStyles.sansSerifRegularText, {color: legendColour}]}>
                <Text style={{fontSize: FONT_SIZE - 3}}>
                    {titleize(legendText)}
                </Text>
            </Text>
        </View>
    </View>
);

const ColumnGroup = ({state, measure, subMeasures, columns, showValue, legendTexts, legendColour, panHandlers}) => (
    <View style={styles.chart} {...panHandlers}>
        {
            columns.map((column, index) => <Column
                key={[column, measure, index].join('_')}
                state={state}
                measure={measure}
                subMeasures={subMeasures}
                column={column}
                showValue={showValue}
                legendText={legendTexts[index]}
                legendColour={legendColour}
            />)
        }
    </View>
);

var Chart = React.createClass({
    propTypes: {
        state: PropTypes.object,
        measure: PropTypes.string,
        subMeasures: PropTypes.array,
        columns: PropTypes.array,
        showValue: PropTypes.bool,
        headingText: PropTypes.string,
        headingColour: PropTypes.string,
        legendTexts: PropTypes.array,
        legendColour: PropTypes.string,
        panHandlers: PropTypes.object
    },

    render: function () {
        return <View style={styles.chartContainer}>
            <View style={styles.chartHeading}>
                <Text style={[globalStyles.sansSerifRegularText, {color: this.props.headingColour}]}>
                    {titleize(this.props.headingText)}
                </Text>
            </View>
            <ColumnGroup
                state={this.props.state}
                measure={this.props.measure}
                subMeasures={this.props.subMeasures}
                columns={this.props.columns}
                showValue={this.props.showValue}
                legendTexts={this.props.legendTexts}
                legendColour={this.props.legendColour}
                panHandlers={this.props.panHandlers}
            />
        </View>
    }
});

module.exports = Chart;
