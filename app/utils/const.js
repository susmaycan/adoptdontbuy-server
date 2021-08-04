module.exports = {
    LITERALS: {
        UNKNOWN : 'unknown',
        EMPTY : '',
        DEFAULT_COUNTRY : 'Spain',
        ANIMAL : 'animal',
        USER : 'user',
        REVIEW : 'review',
    },
    MODEL: {
        ANIMAL: {
            NAME: 'name',
            SPECIE: 'specie',
            BREED: 'breed',
            GENDER: 'gender',
            SIZE: 'size',
            AGE: 'age',
            COUNTRY: 'country',
            REGION: 'region',
            PROVINCE: 'province',
            CITY: 'city',
            PICTURES: 'picture',
            ABOUT: 'about',
            CASTRATED: 'castrated',
            VACCINATED: 'vaccinated',
            ALONG_WITH_DOGS: 'alongWithDogs',
            ALONG_WITH_CATS: 'alongWithCats',
            ALONG_WITH_KIDS: 'alongWithKids',
            SOCIAL_LEVEL: 'socialLevel',
            TRAUMA_LEVEL: 'traumaLevel',
            ENERGY_LEVEL: 'energyLevel',
            STATUS: 'status',
            OWNER: 'owner',
        },
        REVIEW: {
            DESC: 'desc',
            RATING: 'rating',
            FROM: 'from',
            TO: 'to',
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
