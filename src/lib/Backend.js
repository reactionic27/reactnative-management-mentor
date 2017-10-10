/**
 * # Backend.js
 *
 * Abstract Base class for Backend support
 *
 */
'use strict';
/**
 * ## Async support
 *
 */
require('regenerator/runtime');

export default class Backend {
    /**
     * ## Constructor
     *
     *
     * @throws tokenMissing if token is undefined
     */
    constructor(token) {
    }

    /**
     * ### organisationLogin
     * encode the data and and call _fetch
     *
     * @param data
     * The organisation UUID
     * "6902095088a0dd8ab617231de205c384"
     *
     * @returns
     *
     * if good:
     * data: {
     * * id: 1,
     * * uuid: "6902095088a0dd8ab617231de205c384",
     * * name: "Wolff-Lowe",
     * * hq: "Sweden",
     * * town: "Port Joel",
     * * county: "Alabama",
     * * sector: "Insurance",
     * * country: "Ethiopia",
     * * postcode: "70302",
     * * addressLine1: "348 Marks Skyway",
     * * addressLine2: "Apt. 471",
     * * createdAt: "2016-04-01T11:28:02.857Z",
     * * updatedAt: "2016-04-01T11:28:02.857Z"
     * * logo: "data:image/png;base64,iVBO..."
     * * appConfig: {
     * * * id: 1,
     * * * enthusiasmMax: 100
     * * * enthusiasmMin: 0
     * * * enthusiasmFirstTertileGreatestUpperBound: 30
     * * * enthusiasmSecondTertileGreatestUpperBound: 70
     * * * productivityMax: 100
     * * * productivityMin: 0
     * * * productivityFirstTertileGreatestUpperBound: 30
     * * * productivitySecondTertileGreatestUpperBound: 70
     * * * primaryColour: '#000000'
     * * * secondaryColour: '#FFFFFF'
     * * * decisionMatrixOverall1: 1
     * * * decisionMatrixOverall2: 1
     * * * decisionMatrixOverall3: 1
     * * * decisionMatrixOverall4: 1
     * * * decisionMatrixProductivity1: 1
     * * * decisionMatrixProductivity2: 1
     * * * decisionMatrixProductivity3: 1
     * * * decisionMatrixProductivity4: 1
     * * * decisionMatrixProductivity5: 1
     * * * decisionMatrixProductivity6: 1
     * * * decisionMatrixProductivity7: 1
     * * * decisionMatrixEnthusiasm1: 1
     * * * decisionMatrixEnthusiasm2: 1
     * * * decisionMatrixEnthusiasm3: 1
     * * * decisionMatrixEnthusiasm4: 1
     * * * decisionMatrixEnthusiasm5: 1
     * * * decisionMatrixEnthusiasm6: 1
     * * * decisionMatrixEnthusiasm7: 1
     * * }
     * }
     *
     * if error:
     * errors:  ['message']
     */
    async organisationLogin(data) {

    }

    /**
     * ### login
     * encode the data and and call _fetch
     *
     * @param data
     *
     * {email: "user@example.com", password: "changeme"}
     *
     * @returns
     *
     * if good:
     * success: true
     *
     * if error:
     * errors:  ['message']
     */
    async login(data) {

    }

    /**
     * ### logout
     * prepare the request and call _fetch
     *
     * if good:
     * success: true
     *
     * if error:
     * errors:  ['message']
     */
    async logout() {

    }

    /**
     * ### changePassword
     * the data is already in a JSON format, so call _fetch
     *
     * @param data
     *
     * {email: "user@example.com"}
     *
     * @returns empty object
     *
     * if error:
     * errors:  ['message']
     */
    async resetPassword(data) {

    }

    /**
     * ### getProfile
     * Using the sessionToken, we'll get everything about
     * the current user.
     *
     * @returns
     *
     * if good:
     * response.json() -> promise(json)
     * json = data: {
     * * acceptTerms: null,
     * * age: "32",
     * * avatar: "data:image/png;base64,iVBO..."
     * * createdAt: "2016-04-01T11:28:02.857Z",
     * * email: "user@example.com",
     * * firstName: "Matthew",
     * * gender: "Male",
     * * id: 1,
     * * isActive: true,
     * * lastName: "Ager",
     * * nationality: "United Kingdom",
     * * provider: "email",
     * * role: "admin",
     * * uid: "user@example.com",
     * * updatedAt: "2016-04-02T09:43:45.763Z"
     * * iLeader: true
     * * member: false
     * * myILeader: {
     * * }
     * * members: [
     * * * ...
     * * * ratings: [
     * * * ]
     * * ]
     * * team: {
     * * * id: 1,
     * * * uuid: 1,
     * * * position: 1,
     * * * name: 1,
     * * * iLeaderId: 1,
     * * * createdAt: "2016-04-01T11:28:02.857Z",
     * * * updatedAt: "2016-04-01T11:28:02.857Z"
     * * * parent: {
     * * * },
     * * }
     * * organisation: {
     * * * id: 1,
     * * * uuid: "6902095088a0dd8ab617231de205c384",
     * * * name: "Wolff-Lowe",
     * * * hq: "Sweden",
     * * * town: "Port Joel",
     * * * county: "Alabama",
     * * * sector: "Insurance",
     * * * country: "Ethiopia",
     * * * postcode: "70302",
     * * * addressLine1: "348 Marks Skyway",
     * * * addressLine2: "Apt. 471",
     * * * createdAt: "2016-04-01T11:28:02.857Z",
     * * * updatedAt: "2016-04-01T11:28:02.857Z"
     * * * logo: "data:image/png;base64,iVBO..."
     * * * appConfig: {
     * * * * id: 1,
     * * * * enthusiasmMax: 100
     * * * * enthusiasmMin: 0
     * * * * enthusiasmFirstTertileGreatestUpperBound: 30
     * * * * enthusiasmSecondTertileGreatestUpperBound: 70
     * * * * productivityMax: 100
     * * * * productivityMin: 0
     * * * * productivityFirstTertileGreatestUpperBound: 30
     * * * * productivitySecondTertileGreatestUpperBound: 70
     * * * * primaryColour: '#000000'
     * * * * secondaryColour: '#FFFFFF'
     * * * }
     * * }
     * }
     * response.headers.get(...)
     * * uid, client, access-token, token-type, expiry
     *
     * if error:
     * errors:  ['message']
     */
    async getProfile() {
    }

    /**
     * ### updateProfile
     * for this user, update their record
     * the data is already in JSON format
     *
     * @param data object:
     * {
     * * email: "user@example.com"
     * * firstName: "Matthew"
     * * lastName: "Ager"
     * * age: "32"
     * * gender: "Male"
     * * nationality: "United Kingdom"
     * }
     */
    async updateProfile(data) {
    }

    /**
     * ### getRatings
     * Using the sessionToken, we'll get everything about
     * the current user's ratings.
     *
     * @returns
     *
     * if good:
     * response.json() -> promise(json)
     * json = data: [
     * * {
     * * * id: 1,
     * * * userId: 1,
     * * * scoreDatetime: "2016-04-02T09:43:45.763Z",
     * * * productivity: "100",
     * * * enthusiasm: "100",
     * * },
     * * {},
     * * ...
     * ]
     * response.headers.get(...)
     * * uid, client, access-token, token-type, expiry
     *
     * if error:
     * errors:  ['message']
     */
    async getRatings() {
    }

    /**
     * ### createRating
     * for this user, create a rating
     * the data is already in JSON format
     *
     * @param data object:
     * {
     * * productivity: "100"
     * * enthusiasm: "100"
     * * scoreDatetime: "2016-04-02T09:43:45.763Z"
     * }
     */
    async createRating(data) {
    }

    /**
     * ### syncRatings
     * for this user, sync all local ratings to the server
     * the data is already in JSON format
     *
     * @param data object:
     * [
     * * {
     * * * productivity: "100"
     * * * enthusiasm: "100"
     * * * scoreDatetime: "2016-04-02T09:43:45.763Z"
     * * },
     * * {},
     * * ...
     * ]
     */
    async syncRatings(data) {
    }

    /**
     * ### getTools
     * Using the sessionToken, we'll get everything about
     * the current user's tools.
     *
     * @returns
     *
     * if good:
     * response.json() -> promise(json)
     * json = data: [
     * * {
     * * * id: 2,
     * * * position: 1,
     * * * name: "One Tool To Test Them All",
     * * * abstract: "Lorem ipsum...",
     * * * checklist: "Lorem ipsum...",
     * * * icon: "build",
     * * * colour: "#FFFFFF",
     * * * backgroundImage: "data:image/png;base64,iVBO..."
     * * * scrollable: true,
     * * * displayArrows: true,
     * * * createdAt: "2016-04-02T09:43:45.763Z",
     * * * updatedAt: "2016-04-02T09:43:45.763Z",
     * * * slides: [
     * * * * {
     * * * * * id: 4,
     * * * * * name: "Slide",
     * * * * * position: 1,
     * * * * * createdAt: "2016-04-02T09:43:45.763Z",
     * * * * * updatedAt: "2016-04-02T09:43:45.763Z",
     * * * * * slideItems: [
     * * * * * * {
     * * * * * * * id: 6,
     * * * * * * * position: 1,
     * * * * * * * type: "card",
     * * * * * * * createdAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * updatedAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * fields: [
     * * * * * * * * {
     * * * * * * * * * id: 13,
     * * * * * * * * * position: 1,
     * * * * * * * * * type: "TextBlock",
     * * * * * * * * * createdAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * * * updatedAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * * * value: "Some static text",
     * * * * * * * * * label: "Some label",
     * * * * * * * * * placeholder: "Some placeholder",
     * * * * * * * * * style: "Heading1",
     * * * * * * * * * textAlign: "center",
     * * * * * * * * * textTransform: "sentence",
     * * * * * * * * * multiple: false,
     * * * * * * * * * includeBlank: true,
     * * * * * * * * * options: [
     * * * * * * * * * * {
     * * * * * * * * * * * text: "text",
     * * * * * * * * * * * value: 1,
     * * * * * * * * * * },
     * * * * * * * * * * {)
     * * * * * * * * * * ...
     * * * * * * * * * ], (options)
     * * * * * * * * * number: 2,
     * * * * * * * * * separator: "vs",
     * * * * * * * * * dateTimeType: "datetime",
     * * * * * * * * * rows: 3,
     * * * * * * * * * recipients: "<val>1</val>"
     * * * * * * * * },
     * * * * * * * * {},
     * * * * * * * * ...
     * * * * * * * ], (fields)
     * * * * * * * table: {
     * * * * * * * * id: 2,
     * * * * * * * * sortable: true,
     * * * * * * * * appendable: true,
     * * * * * * * * createdAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * * updatedAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * * columns: [
     * * * * * * * * * {
     * * * * * * * * * * id: 6,
     * * * * * * * * * * position: 1,
     * * * * * * * * * * type: "text_field",
     * * * * * * * * * * createdAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * * * * updatedAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * * * * value: "Task I could delegate",
     * * * * * * * * * * field: {
     * * * * * * * * * * * value: false
     * * * * * * * * * * },
     * * * * * * * * * * textAlign: "left",
     * * * * * * * * * * textTransform: "sentence"
     * * * * * * * * * },
     * * * * * * * * * {},
     * * * * * * * * * ...
     * * * * * * * * ] (columns)
     * * * * * * * * rows: [
     * * * * * * * * * {
     * * * * * * * * * * id: 1,
     * * * * * * * * * * position: 1,
     * * * * * * * * * * data: [
     * * * * * * * * * * * "Some text field value",
     * * * * * * * * * * * "Chosen select value",
     * * * * * * * * * * * "ileader",
     * * * * * * * * * * * [
     * * * * * * * * * * * * "self",
     * * * * * * * * * * * * 5
     * * * * * * * * * * * ],
     * * * * * * * * * * * [
     * * * * * * * * * * * * "ileader",
     * * * * * * * * * * * * [1] 4,
     * * * * * * * * * * * * [2] "self",
     * * * * * * * * * * * * 10
     * * * * * * * * * * * ],
     * * * * * * * * * * * "2016-06-08T13:24:18.513+02:00",
     * * * * * * * * * * * true
     * * * * * * * * * * ], (data)
     * * * * * * * * * * createdAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * * * * updatedAt: "2016-04-02T09:43:45.763Z"
     * * * * * * * * * }
     * * * * * * * * ] (rows)
     * * * * * * * } (table)
     * * * * * * * button: {
     * * * * * * * * id: 1,
     * * * * * * * * type: "positive",
     * * * * * * * * createdAt "2016-04-02T09:43:45.763Z",
     * * * * * * * * updatedAt: "2016-04-02T09:43:45.763Z",
     * * * * * * * * value: nil,
     * * * * * * * * textTransform: "sentence",
     * * * * * * * * text: "Yes - Agree task allocation"
     * * * * * * * }
     * * * * * * }
     * * * * * ] (slideItems)
     * * * * }
     * * * ] (slides)
     * * * saves: [
     * * * * {
     * * * * * id: 1,
     * * * * * tooldId: 1,
     * * * * * createdAt "2016-04-02T09:43:45.763Z",
     * * * * * updatedAt "2016-04-02T09:43:45.763Z",
     * * * * * data: {
     * * * * * * fields: {
     * * * * * * * 2: 1,
     * * * * * * * 4: 123,
     * * * * * * * 8: "2016-04-02T09:43:45.763Z",
     * * * * * * * 9: "Something",
     * * * * * * * 10: "Lorem ipsum...",
     * * * * * * * 11: [1, 2],
     * * * * * * * 12: 1
     * * * * * * }, (fields)
     * * * * * * tables: {
     * * * * * * * 1: [
     * * * * * * * * "Some text field value",
     * * * * * * * * "Chosen select value",
     * * * * * * * * 1,
     * * * * * * * * [1, 2],
     * * * * * * * * [1, 2, 3, 4],
     * * * * * * * * "2016-04-02T09:43:45.763Z",
     * * * * * * * * true
     * * * * * * * ]
     * * * * * * } (tables)
     * * * * * } (data)
     * * * * }
     * * * ] (saves)
     * * }
     * ] (data)
     * response.headers.get(...)
     * * uid, client, access-token, token-type, expiry
     *
     * if error:
     * errors:  ['message']
     */
    async getTools() {
    }

    /**
     * ### getToolSaves
     * Using the sessionToken, we'll get everything about
     * the current user's tool saves.
     *
     * @returns
     *
     * if good:
     * response.json() -> promise(json)
     * json = data: [
     * * {
     * * * id: 1,
     * * * uuid: "0123456789ABCDEFG"
     * * * tooldId: 1,
     * * * tooldName: "Something",
     * * * tooldIcon: "spanner",
     * * * createdAt "2016-04-02T09:43:45.763Z",
     * * * updatedAt "2016-04-02T09:43:45.763Z",
     * * * data: {
     * * * * ...
     * * * }
     * * }
     * ] (data)
     * response.headers.get(...)
     * * uid, client, access-token, token-type, expiry
     *
     * if error:
     * errors:  ['message']
     */
    async getToolSaves() {
    }

    /**
     * ### createToolSave
     * for this user, create a tool save
     * the data is already in JSON format
     *
     * @param data object:
     * {
     * * data: {
     * * * ...
     * * }
     * }
     */
    async createToolSave(data) {
    }

    /**
     * ### syncToolSaves
     * for this user, sync all local tool saves to the server
     * the data is already in JSON format
     *
     * @param data object:
     * [
     * * {
     * * * data: {
     * * * * ...
     * * * }
     * * }
     * ]
     */
    async syncToolSaves(data) {
    }
};

