import React, {
    Component,
    PropTypes,
} from 'react';

import {
    View,
    TouchableOpacity,
} from 'react-native';

import Collapsible from '../../node_modules/react-native-collapsible/Collapsible';

const COLLAPSIBLE_PROPS = Object.keys(Collapsible.propTypes);
const VIEW_PROPS = Object.keys(View.propTypes);

class Accordion extends Component {
    static propTypes = {
        renderHeader: PropTypes.func.isRequired,
        renderContent: PropTypes.func.isRequired,
        onChange: PropTypes.func,
        align: PropTypes.oneOf(['top', 'center', 'bottom']),
        duration: PropTypes.number,
        easing: PropTypes.string,
        activeOpacity: PropTypes.number,
        initiallyActive: PropTypes.bool
    };

    static defaultProps = {
        activeOpacity: '0.75'
    };

    constructor(props) {
        super(props);

        this.state = {
            active: props.initiallyActive
        };
    }

    _toggleSection() {
        const active = this.state.active ? false : true;
        this.setState({active});
        if (this.props.onChange) {
            this.props.onChange(active);
        }
    }

    render() {
        let viewProps = {};
        let collapsibleProps = {};
        Object.keys(this.props).forEach((key) => {
            if (COLLAPSIBLE_PROPS.indexOf(key) !== -1) {
                collapsibleProps[key] = this.props[key];
            } else if (VIEW_PROPS.indexOf(key) !== -1) {
                viewProps[key] = this.props[key];
            }
        });

        return (
            <View {...viewProps}>
                <TouchableOpacity onPress={() => this._toggleSection()}
                                  activeOpacity={this.props.activeOpacity || defaultProps.activeOpacity}
                >
                    {this.props.renderHeader()}
                </TouchableOpacity>
                <Collapsible collapsed={this.state.active} {...collapsibleProps}>
                    {this.props.renderContent()}
                </Collapsible>
            </View>
        );
    }
}

module.exports = Accordion;
