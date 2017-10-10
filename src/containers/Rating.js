/**
 * # Rating.js
 *
 * This component provides an interface for a logged in user to change
 * their email.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**
 * The actions we need
 */
import * as appHistoryActions from '../reducers/appHistory/appHistoryActions';
import * as toolSavesListActions from '../reducers/toolSavesList/toolSavesListActions';
import * as toolsListActions from '../reducers/toolsList/toolsListActions';
import * as ratingActions from '../reducers/rating/ratingActions';
import * as globalActions from '../reducers/global/globalActions';
import * as profileActions from '../reducers/profile/profileActions';

/**
 * Immutable Mapn
 */
import {Map} from 'immutable';

/**
 * The ErrorAlert will display any and all errors
 */
import ErrorAlert from '../components/ErrorAlert';
/**
 * The FormButton will respond to the press
 */
import FormButton from '../components/FormButton';

/**
 * ### icons
 *
 * Add icon support for use in Drawer
 *
 */
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    Slider,
    StatusBar,
    InteractionManager
}
    from 'react-native';

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

import NavBarWithProps from '../components/NavBarWithProps'

/**
 * The form processing component
 */
import t from 'tcomb-form-native';

let Form = t.form.Form;


/**
 * ## Redux boilerplate
 */
const actions = [
    appHistoryActions,
    toolSavesListActions,
    toolsListActions,
    ratingActions,
    globalActions,
    profileActions
];

function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();

    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}

/**
 * The FormButton will respond to the press
 */
import ParallaxView from '../components/ParallaxView';

/**
 * ## Styles
 */
import GradientOverlay from '../components/BackgroundImage'
import Colour from '../lib/colour'
const DEFAULT_TRACK_COLOUR = 'hsl(206, 12%, 88%)';
const PADDING = 20;
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
var globalStyles = require('../components/Stylesheet');
var styles = StyleSheet.create({
    scrollContainer: {
        marginTop: NAVBAR_PADDING
    },
    scrollView: {},
    scrollableView: {},
    scrollableViewText: {
        paddingTop: PADDING * 2,
        paddingBottom: PADDING * 2,
        paddingLeft: PADDING,
        paddingRight: PADDING
    },
    inputs: {
        marginBottom: PADDING
    }
});

import Helpers from '../lib/helpers'

class Rating extends Component {

    /**
     * ## Rating class
     * Set the initial state and prepare the errorAlert
     */
    constructor(props) {
        super(props);
        this.errorAlert = new ErrorAlert();
        var thisPrimaryColour = Helpers.getPrimaryColour(props),
            thisSecondaryColour = Helpers.getSecondaryColour(props),
            thisCurrentUser = Helpers.getCurrentUser(props);
        this.state = {
            formValues: {
                productivity: '',
                enthusiasm: ''
            },
            colors: {
                primary: Colour.get(thisPrimaryColour).buttonPrimary,
                secondary: Colour.get(thisSecondaryColour).buttonPrimary
            },
            currentUser: {
                avatar: thisCurrentUser.avatar,
                name: thisCurrentUser.name,
                iLeader: thisCurrentUser.iLeader,
                myILeader: thisCurrentUser.myILeader
            },
            organisationLogo: props.profile.organisation.logo,
            submitButtonStyles: {
                color: Colour.get(thisSecondaryColour).drawerTextColour
            },
            visited: true
        };
    }

    /**
     * ### onChange
     *
     * When any fields change in the form, fire this action so they can
     * be validated.
     *
     */
    onChange(value) {
        // console.log(value);
        this.props.actions.onRatingFormFieldChange('productivity', value.productivity);
        this.props.actions.onRatingFormFieldChange('enthusiasm', value.enthusiasm);

        this.setState({
            formValues: {
                productivity: value.productivity ? value.productivity : 0,
                enthusiasm: value.enthusiasm ? value.enthusiasm : 0
            }
        });
    }

    /**
     * ### componentWillReceiveProps
     *
     * Since the Forms are looking at the state for the values of the
     * fields, when we we need to set them
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.global.currentUser !== null) {
            this.props.actions.getRatingPageVisits(nextProps.global.currentUser.id);
        }

        this.setState({
            formValues: {
                productivity: nextProps.rating.form.fields.productivity,
                enthusiasm: nextProps.rating.form.fields.enthusiasm
            },
            visited: nextProps.appHistory.toJS().visitedRatingPage
        });
    }

    /**
     * ### componentDidMount
     *
     * During Hot Loading, when the component mounts due the state
     * immediately being in a "logged in" state, we need to just set the
     * form fields.  Otherwise, we need to go fetch the fields
     */
    componentDidMount() {
        // console.log("componentDidMount() -> this.props", this.props);
        InteractionManager.runAfterInteractions(() => {
            // Ratings
            this.props.actions.getLocalRatings();
            this.props.actions.getRatings(this.props.global.currentUserToken);

            // Profile
            this.setTimeout(() => {
                this.props.actions.getLocalProfile();
                this.props.actions.getProfile(this.props.global.currentUserToken);
            }, 350);

            // Tools
            this.setTimeout(() => {
                this.props.actions.getLocalTools();
                this.props.actions.getTools(this.props.global.currentUserToken);
            }, 700);

            // Tool Saves
            this.setTimeout(() => {
                this.props.actions.getLocalToolSaves();
                this.props.actions.getToolSaves(this.props.global.currentUserToken);
            }, 1050);
        });
    }

    _visitRatingPage() {
        this.props.actions.visitRatingPage(this.props.global.currentUser.id);
    }

    /**
     * ### renderNavigationBar
     * Pass props to the React Native Router Flux NavBar
     */
    static renderNavigationBar(props) {
        return <NavBarWithProps {...props}/>;
    }

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        this.errorAlert.checkError(this.props.rating.form.error);

        let self = this;

        let Percentage = t.refinement(t.Number, function (n) {
            return n >= 0 && n <= 100;
        });

        let RatingForm = t.struct({
            productivity: Percentage,
            enthusiasm: Percentage
        });

        function slider(locals) {
            var stylesheet = locals.stylesheet;
            var formGroupStyle = stylesheet.formGroup.normal;
            var controlLabelStyle = globalStyles.sliderLabel;
            // var sliderStyle = stylesheet.slider.normal;
            var helpBlockStyle = stylesheet.helpBlock.normal;
            var errorBlockStyle = stylesheet.errorBlock;

            if (locals.hasError) {
                formGroupStyle = stylesheet.formGroup.error;
                controlLabelStyle = globalStyles.sliderLabel;
                // sliderStyle = stylesheet.slider.error;
                helpBlockStyle = stylesheet.helpBlock.error;
            }

            var label = locals.label ? <Text style={controlLabelStyle}><Text
                style={globalStyles.sansSerifRegularText}>{locals.label}</Text></Text> : null;
            var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
            var error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;

            var value = locals.value === "" ? 0 : parseInt(locals.value);

            return (
                <View style={formGroupStyle}>
                    {label}
                    <Slider
                        ref="input"
                        minimumValue={1}
                        maximumValue={100}
                        step={1}
                        minimumTrackTintColor={locals.config.color}
                        maximumTrackTintColor={locals.config.track}
                        // style={sliderStyle}
                        onSlidingComplete={(value) => locals.onChange(value)}
                        value={value}
                    />
                    {help}
                    {error}
                </View>
            );
        }

        let productivityLabel = <Text style={globalStyles.baseTextColour}>
            How <Text style={globalStyles.sansSerifRegularText}>
            <Text style={{color: this.state.colors.primary}}>PRODUCTIVE</Text>
        </Text> was the team today?
        </Text>;

        let enthusiasmLabel = <Text style={globalStyles.baseTextColour}>
            How <Text style={globalStyles.sansSerifRegularText}>
            <Text style={{color: this.state.colors.secondary}}>ENTHUSIASTIC</Text>
        </Text> was the team today?
        </Text>;

        /**
         * Set up the field definitions.  If we're fetching, the fields
         * are disabled.
         */
        let options = {
            auto: 'placeholders',
            fields: {
                productivity: {
                    label: productivityLabel,
                    editable: !this.props.rating.form.isFetching,
                    config: {
                        color: this.state.colors.primary,
                        track: DEFAULT_TRACK_COLOUR
                    },
                    template: slider
                },
                enthusiasm: {
                    label: enthusiasmLabel,
                    editable: !this.props.rating.form.isFetching,
                    config: {
                        color: this.state.colors.secondary,
                        track: DEFAULT_TRACK_COLOUR
                    },
                    template: slider
                }
            }
        };

        /**
         * When the button is pressed, send the users info including the
         * ```currrentUserToken``` object as it contains the sessionToken and
         * user objectId which AMP requires
         */
        let ratingButtonText = <View>
            <View style={globalStyles.iconAndText}>
                <View style={globalStyles.buttonIconContainer}>
                    <Icon style={this.state.submitButtonStyles} name='cloud-upload' size={18}/>
                </View>
                <View style={globalStyles.buttonTextContainer}>
                    <Text style={globalStyles.sansSerifRegularText}>
                        <Text style={[globalStyles.bodyText, this.state.submitButtonStyles]}>
                            { this.props.rating.form.originalRecord.productivity && this.props.rating.form.originalRecord.productivity ? 'UPDATE RATING' : 'SUBMIT RATING' }
                        </Text>
                    </Text>
                </View>
            </View>
        </View>;

        let onButtonPress = () => {
            this.props.actions.createLocalRating(
                this.props.global.currentUser.id,
                this.props.rating.form.fields.productivity,
                this.props.rating.form.fields.enthusiasm
            );
            this.props.actions.createRating(
                this.props.rating.form.fields.productivity,
                this.props.rating.form.fields.enthusiasm,
                this.props.global.currentUserToken
            );
        };

        var thisPrimaryColour = Helpers.getPrimaryColour(this.props),
            thisSecondaryColour = Helpers.getSecondaryColour(this.props);

        let infoBlock = this.state.visited ? <View/> : <View
            style={[globalStyles.infoBlock, {
                backgroundColor: Colour.get(thisSecondaryColour).buttonPrimary
            }]}
        >
            <GradientOverlay/>
            <Text
                style={[globalStyles.infoBlockText, {
                    color: 'white',
                    backgroundColor: 'transparent'
                }]}
            >
                How Productive and Enthusiastic has your team been in the last 24 hours?
                {'\n\n'}
                Move the sliders below to indicate where on the scale you feel the overall Productivity and Enthusiasm among the team has been.
                {'\n\n'}
                The rest of your team will not see your ratings, so feel free to score honestly. Your ratings will help your team leader to understand how they can improve the wellbeing of the team.
            </Text>

            <View
                style={[globalStyles.infoBlockClose, {backgroundColor: 'transparent'}]}
            >
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={this._visitRatingPage.bind(this)}
                >
                    <Icon style={{color: 'white'}} name='close' size={18}/>
                </TouchableOpacity>
            </View>

        </View>;

        /**
         * Wrap the form with the scrollView and append button.
         */
        return (
            <View style={globalStyles.scrollContainer}>
                <StatusBar
                    barStyle="light-content"
                />

                <GradientOverlay/>
                <ParallaxView
                    header={(
                        <View style={styles.scrollableViewText}>
                            <Text style={[globalStyles.serifBoldText, globalStyles.captionTitle, {marginBottom: PADDING, color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                                Daily Feedback
                            </Text>

                            <Text style={[globalStyles.sansSerifLightText, globalStyles.captionText, {color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                                Let the iLeader know how
                                {'\n'}
                                productive and enthusiastic
                                {'\n'}
                                the team was today
                            </Text>
                        </View>
                    )}
                    backgroundSource={require('../images/today.png')}
                    windowHeight={180}
                    fadeRatio={2}
                    scrollContainerStyle={[styles.scrollContainer]}
                    scrollViewStyle={[styles.scrollView]}
                    scrollableViewStyle={[styles.scrollableView]}
                >

                    <GradientOverlay/>
                    {infoBlock}

                    <View style={[globalStyles.container, {
                        paddingTop: this.state.visited ? PADDING * 2 : PADDING,
                        backgroundColor: 'transparent'
                    }]}>

                        <View style={[styles.inputs, {paddingTop: this.state.visited ? 0 : PADDING}]}>
                            <Form
                                ref="form"
                                type={RatingForm}
                                options={options}
                                value={this.state.formValues}
                                onChange={this.onChange.bind(self)}
                            />
                        </View>

                        <FormButton
                            isFetching={this.props.rating.form.isFetching}
                            isDisabled={!this.props.rating.form.isValid || this.props.rating.form.isFetching}
                            onPress={onButtonPress.bind(self)}
                            buttonText={ratingButtonText}
                            color={Colour.get(Helpers.getSecondaryColour(this.props)).base}
                        />

                    </View>
                </ParallaxView>
            </View>
        );
    }
}

reactMixin(Rating.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
