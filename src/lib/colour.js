var tinycolor = require("tinycolor2");

export default class Colour {
    /**
     * ## Colour
     *
     */
    constructor() {
    }

    /**
     *
     * ### get
     * Get all colours from a base colour for the app
     *
     * @param input
     * @returns {{base: string, buttonPrimary: string, buttonSecondary: string, menuIcon: string, drawerLinearGradientPrimary: string, drawerLinearGradientSecondary: string, drawerItemBorderBottomSecondary: string, drawerItemBorderBottomPrimary: string, drawerHeaderTextColour: string, drawerTextColour: string}}
     */
    static get(input) {
        /**
         * Default
         *
         * Get HSLA
         * returns {h: 0,s: 1,l: 0.5,a: 1}
         */
        var colour = tinycolor(input),

            hslObject = {
                h: parseInt(colour.toHsl().h),
                s: parseInt(colour.toHsl().s * 100),
                l: parseInt(colour.toHsl().l * 100)
            },

            // 204, 73, 23
            base = 'hsl(' + hslObject.h + ', ' + hslObject.s + '%, ' + hslObject.l + '%)',

            // 197, 75, 51
            buttonPrimary = 'hsl(' + (hslObject.h - 7) + ', 75%, 51%)',

            // 29, 91, 54
            buttonSecondary = 'hsl(' + (hslObject.h + 11) + ', 91%, 54%)',

            menuIcon = 'hsl(' + (hslObject.h - 2) + ', ' + (hslObject.s + 1) + '%, ' + (hslObject.l + 33) + '%)',

            drawerLinearGradientPrimary = 'hsl(' + (hslObject.h + 2) + ', ' + (hslObject.s - 1) + '%, ' + (hslObject.l + 2) + '%)' + '%)',
            drawerLinearGradientSecondary = 'hsl(' + (hslObject.h - 2) + ', ' + (hslObject.s + 1) + '%, ' + (hslObject.l - 2) + '%)',
            drawerItemBorderBottomSecondary = 'hsl(' + (hslObject.h + 1) + ', ' + (hslObject.s + 11) + '%, ' + (hslObject.l + 1) + '%)',
            drawerItemBorderBottomPrimary = 'hsl(' + (hslObject.h + 1) + ', ' + (hslObject.s + 11) + '%, ' + (hslObject.l - 2) + '%)',
            drawerHeaderTextColour = 'hsl(' + (hslObject.h - 2) + ', ' + (hslObject.s + 1) + '%, ' + (hslObject.l + 33) + '%)',
            drawerTextColour = 'hsl(' + hslObject.h + ', 100%, 95%)';

        return {
            base: base,
            buttonPrimary: buttonPrimary,
            buttonSecondary: buttonSecondary,
            menuIcon: menuIcon,
            drawerLinearGradientPrimary: drawerLinearGradientPrimary,
            drawerLinearGradientSecondary: drawerLinearGradientSecondary,
            drawerItemBorderBottomSecondary: drawerItemBorderBottomSecondary,
            drawerItemBorderBottomPrimary: drawerItemBorderBottomPrimary,
            drawerHeaderTextColour: drawerHeaderTextColour,
            drawerTextColour: drawerTextColour
        };
    }

    /**
     *
     * ### shift
     * Get shifted colour
     *
     * @param input
     * @param hShift
     * @param sShift
     * @param lShift
     * @returns {string}
     */
    static shift(input, hShift, sShift, lShift) {

        var colour = tinycolor(input),

            hslObject = {
                h: parseInt(colour.toHsl().h),
                s: parseInt(colour.toHsl().s * 100),
                l: parseInt(colour.toHsl().l * 100)
            };

            return 'hsl(' + (hslObject.h + hShift) + ', ' + (hslObject.s + sShift) + '%, ' + (hslObject.l + lShift) + '%)';
    }
}
