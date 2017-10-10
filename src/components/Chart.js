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
const BORDER_COLOUR = 'white';
const styles = StyleSheet.create({
    chartContainer: {
        flex: 4,
        justifyContent: 'flex-start',
        marginBottom: PADDING / 2
    },
    chartHeading: {
        paddingRight: PADDING,
        paddingLeft: PADDING,
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2,
        backgroundColor: 'transparent',
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
        backgroundColor: BORDER_COLOUR,
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
        backgroundColor: BORDER_COLOUR,
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
            flex: flex
        }]}>
        {textComponent}
    </Animated.View>
};

const Column = ({state, measure, colourInterpolation, column, showValue, legendText, legendColour}) => {

    // console.log(state, measure, colourInterpolation, column, legendText, legendColour);

    let valueColumnsNone = <View/>;
    let valueColumns = <View/>;

    if (state[column + measure]) {
        valueColumnsNone = <ColumnValue flex={state[column + measure + 'None']}
                                        colour={BORDER_COLOUR}
        />;
        valueColumns = <ColumnValue flex={state[column + measure]}
                                    colour={state[column + measure].interpolate(colourInterpolation)}
                                    text={showValue ? state[column + measure]._value : null}
        />;
    }

    return <View style={{flex: 1}}>
        <View style={styles.column}>
            {valueColumnsNone}
            {valueColumns}
        </View>
        <View style={styles.columnLegend}>
            <Text numberOfLines={1} style={[globalStyles.sansSerifRegularText, {color: legendColour}]}>
                <Text style={{fontSize: FONT_SIZE - 3}}>
                    {titleize(legendText)}
                </Text>
            </Text>
        </View>
    </View>
};

const ColumnGroup = ({state, measure, colourInterpolation, columns, showValue, legendTexts, legendColour, panHandlers}) => (
    <View style={styles.chart} {...panHandlers}>
        {
            columns.map((column, index) => <Column
                key={[column, measure, index].join('_')}
                state={state}
                measure={measure}
                colourInterpolation={colourInterpolation}
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
        colourInterpolation: PropTypes.object,
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
                colourInterpolation={this.props.colourInterpolation}
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
