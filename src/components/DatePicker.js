/**
 * # DateTime.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    TouchableHighlight,
    DatePickerAndroid,
    TimePickerAndroid,
    DatePickerIOS,
    Platform,
    Animated,
    StyleSheet
} from 'react-native';

import moment from 'moment';

const FORMATS = {
    'date': 'YYYY-MM-DD',
    'datetime': 'YYYY-MM-DD HH:mm',
    'time': 'HH:mm'
};

const styles = StyleSheet.create({
    dateTouch: {
        width: 142
    },
    dateTouchBody: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateIcon: {
        width: 32,
        height: 32,
        marginLeft: 5,
        marginRight: 5
    },
    dateInput: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        color: '#333'
    },
    datePickerMask: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00000077'
    },
    datePickerCon: {
        backgroundColor: '#fff',
        height: 0,
        overflow: 'hidden'
    },
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTextText: {
        fontSize: 16,
        color: '#46cf98'
    },
    btnTextCancel: {
        color: '#666'
    },
    btnCancel: {
        left: 0
    },
    btnConfirm: {
        right: 0
    },
    datePicker: {
        alignItems: 'center',
        marginTop: 42,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    disabled: {
        backgroundColor: '#eee'
    }
});

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.datePicked = this.datePicked.bind(this);
        this.onPressDate = this.onPressDate.bind(this);
        this.onPressCancel = this.onPressCancel.bind(this);
        this.onPressConfirm = this.onPressConfirm.bind(this);
        this.onDatePicked = this.onDatePicked.bind(this);
        this.onTimePicked = this.onTimePicked.bind(this);
        this.onDatetimePicked = this.onDatetimePicked.bind(this);
        this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    format = this.props.format;
    mode = this.props.mode || 'date';
    height = 259;
    // slide animation duration time, default to 300ms, IOS only
    duration = this.props.duration || 300;

    confirmBtnText = this.props.confirmBtnText || 'OK';
    cancelBtnText = this.props.cancelBtnText || 'Cancel';

    iconSource = this.props.iconSource || {uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAr1JREFUeAHt2E2u6ygQgFFwiEMc/9T+V9vT7skVvHBbeuZ8K0BHuLAqSdI8LfWnFif6dyV+qjgRLFjjgwULFixYsGDBgtUcLFiwYMGCBQsWLFiwYMGCBQsWLFiwYJWy1v+2xU9t9f+t/0Rr+Q2+Zf2ccc/ObV0GSuX1iHt3rHkQVb3i/l11BFe9Yo6u17dUjyPm6Xh8ZfWKuXp9YbXFbG1/SpX3mK89/xnWETN2ZN9ge5/UX41Ze3dblZi3Z6dVvmLermxg/dbYesTclR6sPebuMN07KiZWe3uzVQ4trVhr6N2K9QkdrVihiKX9LdSzfT2q2r5v0N7++66jA0uwhmNd0RysECxYsGDBgiVYsGDBggVLsGDBggULlmDBggULFizBggULFixYggULFixYsAQLFixYsGBpENa536fzt7Fquk8VFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYQ6oxqAoLFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYE2AtZVDLBFjjgwULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDNiXXu9+kchSVYw7HOiNDZhrVHhPY2rHdE6N2GtYYi1jasRyhiSW2doTM1toXerVgl9EitneErbG4Nb2Fz+XKx2ltdrI6OmLkjdVU8hR3VmLfarGT38End5SPm7Mipv8fFql+LVUv5YNVe/sRcbTl90euKebqe6buWj2vVUdljhvaShvTYrrh317akcT23M+7auT3T6HJ51fv1Kjn9NUn6BygVcM+dUZ7TAAAAAElFTkSuQmCC'};
    customStyles = this.props.customStyles || {};

    state = {
        date: this.getDate(),
        modalVisible: false,
        disabled: this.props.disabled,
        animatedHeight: new Animated.Value(0)
    };

    componentWillMount() {
        // ignore the warning of Failed propType for date of DatePickerIOS, will remove after being fixed by official
        console.ignoredYellowBox = [
            'Warning: Failed propType'
            // Other warnings you don't want like 'jsSchedulingOverhead',
        ];

        // init format according to mode
        if (!this.format) {
            this.format = FORMATS[this.mode];
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});

        // slide animation
        if (visible) {
            Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: this.height,
                    duration: this.duration
                }
            ).start();
        } else {
            this.setState({
                animatedHeight: new Animated.Value(0)
            });
        }
    }

    onPressCancel() {
        this.setModalVisible(false);
    }

    onPressConfirm() {
        this.datePicked();
        this.setModalVisible(false);
    }

    getDate(date = this.props.date) {
        if (date instanceof Date) {
            return date;
        } else {
            return moment(date, this.format).toDate();
        }
    }

    getDateStr(date = this.props.date) {
        if (date instanceof Date) {
            return moment(date).format(this.format);
        } else {
            return moment(this.getDate(date)).format(this.format);
        }
    }

    datePicked() {
        if (typeof this.props.onDateChange === 'function') {
            this.props.onDateChange(this.getDateStr(this.state.date));
        }
    }

    onDatePicked({action, year, month, day}) {
        if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
                date: new Date(year, month, day)
            });
            this.datePicked();
        }
    }

    onTimePicked({action, hour, minute}) {
        if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
                date: moment().hour(hour).minute(minute).toDate()
            });
            this.datePicked();
        }
    }

    onDatetimePicked({action, year, month, day}) {
        if (action !== DatePickerAndroid.dismissedAction) {
            let timeMoment = moment(this.state.date);

            TimePickerAndroid.open({
                hour: timeMoment.hour(),
                minute: timeMoment.minutes(),
                is24Hour: !this.format.match(/h|a/)
            }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
        }
    }

    onDatetimeTimePicked(year, month, day, {action, hour, minute}) {
        if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
                date: new Date(year, month, day, hour, minute)
            });
            this.datePicked();
        }
    }

    onPressDate() {
        if (this.state.disabled) {
            return true;
        }

        // reset state
        this.setState({
            date: this.getDate()
        });

        if (Platform.OS === 'ios') {
            this.setModalVisible(true);
        } else {

            if (this.mode === 'date') {
                DatePickerAndroid.open({
                    date: this.state.date,
                    minDate: this.props.minDate && this.getDate(this.props.minDate),
                    maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
                }).then(this.onDatePicked);
            } else if (this.mode === 'time') {
                let timeMoment = moment(this.state.date);

                TimePickerAndroid.open({
                    hour: timeMoment.hour(),
                    minute: timeMoment.minutes(),
                    is24Hour: !this.format.match(/h|a/)
                }).then(this.onTimePicked);
            } else if (this.mode === 'datetime') {
                DatePickerAndroid.open({
                    date: this.state.date,
                    minDate: this.props.minDate && this.getDate(this.props.minDate),
                    maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
                }).then(this.onDatetimePicked);
            } else {
                throw new Error('The specified mode is not supported');
            }
        }
    }

    render() {

        return (
            <TouchableHighlight
                style={[styles.dateTouch, this.props.style]}
                underlayColor={'transparent'}
                onPress={this.onPressDate}
            >
                <View style={[styles.dateTouchBody, this.customStyles.dateTouchBody]}>
                    <View style={[styles.dateInput, this.customStyles.dateInput, this.state.disabled && styles.disabled]}>
                        <Text style={[styles.dateText, this.customStyles.dateText]}>{this.getDateStr()}</Text>
                    </View>
                    <Image
                        style={[styles.dateIcon, this.customStyles.dateIcon]}
                        source={this.iconSource}
                    />
                    {Platform.OS === 'ios' && <Modal
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setModalVisible(false);}}
                    >
                        <TouchableHighlight
                            style={styles.datePickerMask}
                            activeOpacity={1}
                            underlayColor={'#00000077'}
                            onPress={this.onPressCancel}
                        >
                            <TouchableHighlight
                                underlayColor={'#fff'}
                                style={{flex: 1}}
                            >
                                <Animated.View
                                    style={[styles.datePickerCon, {height: this.state.animatedHeight}, this.customStyles.datePickerCon]}
                                >
                                    <DatePickerIOS
                                        date={this.state.date}
                                        mode={this.mode}
                                        minimumDate={this.props.minDate && this.getDate(this.props.minDate)}
                                        maximumDate={this.props.maxDate && this.getDate(this.props.maxDate)}
                                        onDateChange={(date) => this.setState({date: date})}
                                    />
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={this.onPressCancel}
                                        style={[styles.btnText, styles.btnCancel, this.customStyles.btnCancel]}
                                    >
                                        <Text
                                            style={[styles.btnTextText, styles.btnTextCancel, this.customStyles.btnTextCancel]}
                                        >
                                            {this.cancelBtnText}
                                        </Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={this.onPressConfirm}
                                        style={[styles.btnText, styles.btnConfirm, this.customStyles.btnConfirm]}
                                    >
                                        <Text
                                            style={[styles.btnTextText, this.customStyles.btnTextConfirm]}>{this.confirmBtnText}</Text>
                                    </TouchableHighlight>
                                </Animated.View>
                            </TouchableHighlight>
                        </TouchableHighlight>
                    </Modal>}
                </View>
            </TouchableHighlight>
        );
    }
}

export default DatePicker;