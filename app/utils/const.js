module.exports = {
    LITERALS: {
        UNKNOWN : 'unknown',
        DEFAULT_COUNTRY : 'Spain',
        ANIMAL : 'animal',
        USER : 'user'
    },
    MODEL: {
        ANIMAL: {
            OWNER: 'owner'
        },
        USER: {
            USERNAME: 'username',
            EMAIL: 'email',
        },
    },
    ANIMAL_STATUS: {
        IN_ADOPTION: '00'
    },
    CODE_ERRORS: {
        NOT_FOUND: 404,
        SERVER_ERROR: 500
    },
    QUERY: {
        ORDER_DESC_BY_DATE : -1,
        MAX_NUMBER_OF_ITEMS : 9,
    }
}
