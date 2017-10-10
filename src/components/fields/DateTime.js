/**
 * # DateTime.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

const {is} = require('immutable');

import DatePicker from 'react-native-datepicker';

import Colour from '../../lib/colour'
var globalStyles = require('../../components/Stylesheet');
const PADDING = 20;
const CALENDAR_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAM1BMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPKmszLAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAArpJREFUeAHt2FGSpCoQQFFQy6Is0dz/at/vm58O6LI7ZuTcFRAnEtMgSdI4TeWrJif6f0t81eJEsGBdHyxYsGDBggULFqzmYMGCBQsWLFiwYMGCBQsWLFiwYMGCBWtZ1vJnW3zVVn6/vhOty0/wTev7iHt2bOt0oVRea9y7uuaLqMoZ9+8sV3CVM8bofH5KNdcYpzp/ZPWMsXp+YLXFaG3fpcp7jNeev4dVY8Rqdgfbe6f+Sozaq9tqiXF7dFrlM8btzD5Y7b1dwo6WHqw9xq4arI4WX6z29marHJpasdbQqxXrHaqtWKGIqX0X6tH+PKrShvUKReztv++qHVi6HAtWCBYsWLBgwRIsWLBgwYIlWLBgwYIFS7BgwYIFC5ZgwYIFCxYswYIFCxYsWIIFCxYsWLAE6/exjv0+HT+NVdJ9KmNjwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLCm5aKmAbBKXFQZAAsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiw/rJgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYJ17PfpuApLsC7HOiJCRxvWHhHa27BeEaFXG9YailjbsOZQxJTaOkJHamwLvVqx5tCcWjvCLWxuDbuwvdNgtbcarI5qjFxNXc1WYUclxq00K3l7eKfuco0xqzn1N5+saLVb9ZQrq/byO8Zqy+mDnmeM0/lInzW9jVVHyx4jtC/pkubtjHt3blO6rsd2xF07tke6urw8y/16LjlJ+mf6D/vOcM9792z6AAAAAElFTkSuQmCC';
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    fakeInputLabel: {
        marginBottom: 2
    },
    fakeInput: {
        width: width - (PADDING * 3),
        height: 32,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 0,
        borderBottomColor: 'hsl(210, 13%, 91%)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 15
    },
    fakeInputText: {
        color: DARK_GREY_COLOUR,
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 14
    }
});

const moment = require('moment');

var DateTime = React.createClass({

    propTypes: {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        field: PropTypes.object,
        thisPrimaryColour: PropTypes.string,
        thisSecondaryColour: PropTypes.string,
        cardBackgroundColour: PropTypes.string
    },

    getInitialState: function () {
        return {
            loading: true,
            selected: '',
            placeholder: '',
            type: '',
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state, nextProps.cardFieldValues.toJS()[nextProps.id]);
        if (nextProps.cardFields) {
            let id = nextProps.id,
                cardFieldValues = nextProps.cardFieldValues.toJS(),
                tableFieldValues = nextProps.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                selected = fieldValues[id] ? fieldValues[id] : this._formatDate(new Date());

            this.setState({
                selected: selected
            });
        }
    },

    componentDidMount: function () {
        if (this.props.cardFields) {
            let id = this.props.id,
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id],
                cardFieldValues = this.props.cardFieldValues.toJS(),
                tableFieldValues = this.props.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                selected = fieldValues[id] ? fieldValues[id] : this._formatDate(new Date());

            this.setState({
                loading: false,
                selected: selected,
                placeholder: field.label || field.placeholder,
                type: field.dateTimeType.toLowerCase()
            });
        }
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.state.loading,
        //     this.props.prefix === 'cards'
        //     && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false,
        //     this.props.prefix === 'tables'
        //     && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false);
        return this.state.loading
            || (this.props.prefix === 'cards'
            && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false)
            || (this.props.prefix === 'tables'
            && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false)
            || is(nextState.selected, this.state.selected) === false;
    },

    render() {
        // console.log("===RENDER===");
        var format = this._datePickerFormat();
        var dateValue = this.state.selected ? this.state.selected : this._formatDate(new Date());

        var picker = null;
        if (this.state.type != '' && this.state.selected != '') {
          picker = <DatePicker
              style={styles.fakeInput}
              customStyles={{
                  datePicker: {
                      alignItems: 'stretch'
                  },
                  fakeInputText: styles.fakeInputText
              }}
              date={dateValue}
              format={format}
              mode={this.state.type}
              confirmBtnText="OK"
              cancelBtnText="Cancel"
              iconSource={{uri: CALENDAR_ICON}}
              onDateChange={this._onValueChange}
          />
        }
        return <View>
            <Text
                style={[globalStyles.sansSerifLightText, globalStyles.bodyText, styles.fakeInputLabel, {color: '#939393'}]}>
                {this.state.placeholder}
            </Text>
            {picker}
        </View>
    },

    _formatDate(date) {
        switch (this.state.type) {
            case 'date':
                return moment(date).format('YYYY-MM-DD');
            case 'time':
                return moment(date).format('hh:mm a');
            case 'datetime':
                return moment(date).format('YYYY-MM-DD [at] hh:mm a');
        }
    },

    _datePickerFormat() {
      switch (this.state.type) {
          case 'date':
              return "YYYY-MM-DD";
          case 'time':
              return "hh:mm a";
          case 'datetime':
              return "YYYY-MM-DD [at] hh:mm a";
      }
    },

    _onValueChange(date) {
        this.setState({
            selected: date
        });

        let prefix = (typeof this.props.id === "string" && this.props.id.split('_').length > 1) ? 'tables' : 'cards';
        this.props.onToolFieldChange(prefix, this.props.id, date, date);
    }
});

module.exports = DateTime;
