import Immutable from 'immutable';
const moment = require('moment');

const _ = require('underscore');
const STATIC_TOOLS = require('../static/tools');

const DEFAULT_AVATAR = 'data:image/png;base64,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';
const DEFAULT_PRIMARY_COLOUR = 'hsl(204, 73%, 23%)';
const DEFAULT_SECONDARY_COLOUR = 'hsl(18, 79%, 52%)';

export default class Helpers {
    /**
     * ## Helpers
     *
     */
    constructor() {
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getPrimaryColour(props) {
        if (props.profile.organisation && props.profile.organisation.appConfig.primaryColour) {
            return props.profile.organisation.appConfig.primaryColour;
        }
        if (props.global.currentOrganisation && props.global.currentOrganisation.appConfig.primaryColour) {
            return props.global.currentOrganisation.appConfig.primaryColour;
        }
        return DEFAULT_PRIMARY_COLOUR;
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getDecisionMatrix(props) {
        if (props.profile.organisation && props.profile.organisation.appConfig) {
            return {
                overall1: props.profile.organisation.appConfig.decisionMatrixOverall1,
                overall2: props.profile.organisation.appConfig.decisionMatrixOverall2,
                overall3: props.profile.organisation.appConfig.decisionMatrixOverall3,
                overall4: props.profile.organisation.appConfig.decisionMatrixOverall4,
                productivity1: props.profile.organisation.appConfig.decisionMatrixProductivity1,
                productivity2: props.profile.organisation.appConfig.decisionMatrixProductivity2,
                productivity3: props.profile.organisation.appConfig.decisionMatrixProductivity3,
                productivity4: props.profile.organisation.appConfig.decisionMatrixProductivity4,
                productivity5: props.profile.organisation.appConfig.decisionMatrixProductivity5,
                productivity6: props.profile.organisation.appConfig.decisionMatrixProductivity6,
                productivity7: props.profile.organisation.appConfig.decisionMatrixProductivity7,
                enthusiasm1: props.profile.organisation.appConfig.decisionMatrixEnthusiasm1,
                enthusiasm2: props.profile.organisation.appConfig.decisionMatrixEnthusiasm2,
                enthusiasm3: props.profile.organisation.appConfig.decisionMatrixEnthusiasm3,
                enthusiasm4: props.profile.organisation.appConfig.decisionMatrixEnthusiasm4,
                enthusiasm5: props.profile.organisation.appConfig.decisionMatrixEnthusiasm5,
                enthusiasm6: props.profile.organisation.appConfig.decisionMatrixEnthusiasm6,
                enthusiasm7: props.profile.organisation.appConfig.decisionMatrixEnthusiasm7
            };
        }
        if (props.global.currentOrganisation && props.global.currentOrganisation.appConfig) {
            return {
                overall1: props.global.currentOrganisation.appConfig.decisionMatrixOverall1,
                overall2: props.global.currentOrganisation.appConfig.decisionMatrixOverall2,
                overall3: props.global.currentOrganisation.appConfig.decisionMatrixOverall3,
                overall4: props.global.currentOrganisation.appConfig.decisionMatrixOverall4,
                productivity1: props.global.currentOrganisation.appConfig.decisionMatrixProductivity1,
                productivity2: props.global.currentOrganisation.appConfig.decisionMatrixProductivity2,
                productivity3: props.global.currentOrganisation.appConfig.decisionMatrixProductivity3,
                productivity4: props.global.currentOrganisation.appConfig.decisionMatrixProductivity4,
                productivity5: props.global.currentOrganisation.appConfig.decisionMatrixProductivity5,
                productivity6: props.global.currentOrganisation.appConfig.decisionMatrixProductivity6,
                productivity7: props.global.currentOrganisation.appConfig.decisionMatrixProductivity7,
                enthusiasm1: props.global.currentOrganisation.appConfig.decisionMatrixEnthusiasm1,
                enthusiasm2: props.global.currentOrganisation.appConfig.decisionMatrixEnthusiasm2,
                enthusiasm3: props.global.currentOrganisation.appConfig.decisionMatrixEnthusiasm3,
                enthusiasm4: props.global.currentOrganisation.appConfig.decisionMatrixEnthusiasm4,
                enthusiasm5: props.global.currentOrganisation.appConfig.decisionMatrixEnthusiasm5,
                enthusiasm6: props.global.currentOrganisation.appConfig.decisionMatrixEnthusiasm6,
                enthusiasm7: props.global.currentOrganisation.appConfig.decisionMatrixEnthusiasm7
            };
        }
        return {
            overall1: null,
            overall2: null,
            overall3: null,
            overall4: null,
            productivity1: null,
            productivity2: null,
            productivity3: null,
            productivity4: null,
            productivity5: null,
            productivity6: null,
            productivity7: null,
            enthusiasm1: null,
            enthusiasm2: null,
            enthusiasm3: null,
            enthusiasm4: null,
            enthusiasm5: null,
            enthusiasm6: null,
            enthusiasm7: null
        };
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getSecondaryColour(props) {
        if (props.profile.organisation && props.profile.organisation.appConfig.secondaryColour) {
            return props.profile.organisation.appConfig.secondaryColour;
        }
        if (props.global.currentOrganisation && props.global.currentOrganisation.appConfig.secondaryColour) {
            return props.global.currentOrganisation.appConfig.secondaryColour;
        }
        return DEFAULT_SECONDARY_COLOUR;
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getCurrentOrganisation(props) {
        if (props.profile.organisation) {
            return props.profile.organisation;
        }
        if (props.global.currentOrganisation) {
            return props.global.currentOrganisation;
        }
        return {
          logo: '',
          name: ''
        };
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getCurrentUser(props) {
        if (props.profile.form && props.profile.form.originalProfile.avatar) {
            return {
                avatar: props.profile.form.originalProfile.avatar,
                name: props.profile.form.originalProfile.firstName + ' ' + props.profile.form.originalProfile.lastName,
                iLeader: props.profile.iLeader,
                myILeader: props.profile.myILeader,
                email: props.profile.form.originalProfile.email,
                nationality: props.profile.form.originalProfile.nationality,
                title: props.profile.form.originalProfile.title
            };
        }
        if (props.global.currentUser && props.global.currentUser.avatar) {
            return {
                avatar: props.global.currentUser.avatar,
                name: props.global.currentUser.firstName + ' ' + props.global.currentUser.lastName,
                iLeader: props.global.currentUser.iLeader,
                myILeader: props.global.currentUser.myILeader,
                email: props.global.currentUser.email,
                nationality: props.global.currentUser.nationality,
                title: props.global.currentUser.title
            };
        }
        return {
            avatar: DEFAULT_AVATAR,
            name: '',
            iLeader: null,
            myILeader: null,
            email: '',
            nationality: '',
            title: ''
        };
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getCurrentTeam(props) {
        if (props.profile.team.name) {
            return props.profile.team;
        }
        if (props.global.currentUser.team) {
            return props.global.currentUser.team;
        }
        return '';
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getMembers(props) {
        if (props.profile.members.size > 0) {
            return props.profile.members;
        }
        if (props.global.currentUser) {
            return Immutable.fromJS(props.global.currentUser.members);
        }
        return Immutable.fromJS([]);
    }

    /**
     * ## Append static tools
     */
    static appendStaticTools(json, immutable) {
        let arr = _.union(STATIC_TOOLS, json);
        return immutable ? Immutable.fromJS(arr) : arr;
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getTools(props) {
        if (props.toolsList.list.size > 0) {
            return this.appendStaticTools(props.toolsList.list.toJS(), true);
        }
        if (props.global.currentToolsList) {
            return this.appendStaticTools(props.global.currentToolsList.list, true);
        }
        return Immutable.fromJS([]);
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getToolSaves(props) {
        if (props.toolSavesList.list.size > 0) {
            return props.toolSavesList.list;
        }
        if (props.global.currentToolSavesList) {
            return Immutable.fromJS(props.global.currentToolSavesList.list);
        }
        return Immutable.fromJS([]);
    }

    /**
     *
     * @param value
     * @param defaultValue
     * @param props
     * @returns {*}
     */
    static getBounds(value, defaultValue, props) {
        if (props.profile.organisation && props.profile.organisation.appConfig[value]) {
            return props.profile.organisation.appConfig[value];
        }
        if (props.global.currentOrganisation && props.global.currentOrganisation.appConfig[value]) {
            return props.global.currentOrganisation.appConfig[value];
        }
        return defaultValue;
    }

    /**
     *
     * @param props
     * @returns {boolean|*}
     */
    static getAnimating(props) {
        return props.profile.form.isFetching
            || props.profile.form.isSyncing
            || props.profile.form.isLoadingAvatar
            || props.rating.form.isFetching
            || props.rating.form.isSyncing;
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    static getRatingHistory(props) {
        if (props.profile.ratingHistory.size > 0) {
            return props.profile.ratingHistory;
        }
        if (props.global.currentUser) {
            return Immutable.fromJS(props.global.currentUser.ratingHistory);
        }
        return Immutable.fromJS([]);
    }

    /**
     *
     * @param n
     * @param useWordBoundary
     * @returns {string}
     */
    static truncate(n, useWordBoundary) {
        var isTooLong = this.length > n,
            s_ = isTooLong ? this.substr(0, n - 1) : this;
        s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
        return isTooLong ? s_ + '...' : s_;
    }

    /**
     *
     * @param string
     * @returns {string}
     */
    static humanize(string) {
        var n = string.split("."),
            vFinal = "";

        for (var i = 0; i < n.length; i++) {
            var spacePut = "",
                spaceCount = n[i].replace(/^(\s*).*$/, "$1").length;

            n[i] = n[i].replace(/^\s+/, "");

            var newString = n[i].charAt(n[i]).toUpperCase() + n[i].slice(1);

            for (var j = 0; j < spaceCount; j++) {
                spacePut = spacePut + " ";
            }

            vFinal = vFinal + spacePut + newString + ".";
        }

        return vFinal.substring(0, vFinal.length - 1);
    }

    static transformString(string, transform) {
        if (string == null) {
          return "";
        }
        if (string) {
            switch (transform) {
                case 'lower':
                    return string.toLowerCase();
                case 'sentence':
                    return string;//this.humanize(string);
                case 'title':
                    return this.capitalize(string);
                case 'upper':
                    return string.toUpperCase();
                default:
                    return string;
            }
        }

    }

    /**
     *
     * @param string
     * @returns {void|*|XML}
     */
    static capitalize(string) {
        return string.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    static formatDate(field, date) {
        switch (field.type) {
            case 'date':
                return moment(date).format('DD/MM/YYYY');
            case 'time':
                return moment(date).format('HH:mm');
            case 'dateTime':
                return moment(date).format('DD/MM/YYYY [at] HH:mm');
        }
    }

    static getMember(members, id) {
        return members.find((member) => {
            return parseInt(member.toJS().id) === parseInt(id);
        })
    }

    static formatFieldValue(field, members) {

        let regEx = /<val>(.*?)<\/val>/g;
        if (regEx.test(field.value)) return field.value;

        let option, checked = [];
        switch (field.type) {
            case "textBlock":
                return field.value;
            case "optionSelect":
                if (!field.value) return field.options[0].text;
                option = field.options.find((opt) => {
                    return opt.value === field.value;
                });
                return option ? option.text : field.options[0].text;
            case "userSelect":
                if (field.number === 1) {
                    if (field.value && field.value.length) {
                        let m = this.getMember(members, field.value);
                        return [m.toJS().firstName.charAt(0), m.toJS().lastName.charAt(0)].join('')
                    }
                    return null;
                } else {
                    if (field.value && field.value.length) {
                        var r = field.value.map((id) => {
                            let m = this.getMember(members, id);
                            return [m.toJS().firstName.charAt(0), m.toJS().lastName.charAt(0)].join('')
                        });
                        return r.join(', ');
                    }
                    return null
                }
            case "dateTime":
                return field.value ? this.formatDate(field, field.value) : this.formatDate(field, new Date());
            case "textField":
                return field.value;
            case "textArea":
                return field.value;
            case "checkbox":
                field.options.forEach((opt) => {
                    if (opt.value) checked.push(opt.text);
                });
                return checked.length ? checked.join(', ') : null;
            case "radio":
                option = field.options.find((opt) => {
                    return opt.value;
                });
                return option ? option.text : null;
            case "summary":
                return field.value;
            default:
                return false;
        }
    }

    static formatRowValue(value, field, members) {
        field.value = value;
        switch (field.type) {
            case "checkbox":
                field.options.forEach((opt, index) => {
                    opt.value = value.indexOf(index) > -1;
                });
                break;
            case "radio":
                field.options.forEach((opt) => {
                    opt.value = opt.text === value;
                });
                break;
        }
        return this.formatFieldValue(field, members);
    }

    static replaceVal(returnValue, fields, humanValues) {
        let textBlockReturnValue, textBlockId, textBlockDefaultText,
            textBlockField, textBlockValue, textBlockUnformattedValue, textBlockTextTransform,
            regEx = /<val>(.*?)<\/val>/g;

        return returnValue.replace(regEx, (match, p1, p2) => {

            [textBlockId, textBlockDefaultText] = p1.split('|');
            textBlockField = fields[textBlockId];
            textBlockUnformattedValue = humanValues[textBlockId];
            textBlockTextTransform = textBlockField.textTransform;

            textBlockValue = Helpers.transformString(textBlockUnformattedValue, textBlockTextTransform);

            textBlockReturnValue = textBlockValue ? textBlockValue : textBlockDefaultText;
            textBlockReturnValue = textBlockReturnValue ? textBlockReturnValue : textBlockDefaultText;

            return textBlockReturnValue;

        });
    }

    static getMatches(string, regex, index = 1) {
        var matches = [],
            match;
        while (match = regex.exec(string)) {
            matches.push(match[index]);
        }
        return matches;
    }

    static hex(n) {
        n = n || 16;
        var result = '';
        while (n--) {
            result += Math.floor(Math.random() * 16).toString(16).toUpperCase();
        }
        return result;
    }

    static getColumnFlex(field) {
        switch(field.type) {
            case "textBlock":
                return 3;
            case "optionSelect":
                return 2;
            case "userSelect":
                return 1;
            case "dateTime":
                return 2;
            case "textField":
                return field.keyboardType === "numeric" ? 1 : 3;
            case "textArea":
                return 3;
            case "checkbox":
                return 2;
            case "radio":
                return 2;
            case "summary":
                return 3;
            default:
                return 2;
        }
    }
}
