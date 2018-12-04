const defaultError = { status: 'ERROR', message: 'Internal server error', code: 500 }

const errorList = {
    NO_URL_IN_QUERY: { status: 'ERROR', message: 'No url in query param', code: 400 },
    SHORT_URL_ALREDY_EXIST: { status: 'ERROR', message: 'Short url alredy exist', code: 400 },
    INVALID_URL: { status: 'ERROR', message: 'Url is invalid', code: 400 },
    ERROR_IN_GENERATE_CUT_URL: { status: 'ERROR', message: 'Error while generate cute url, sorry, plz, repeat query', code: 500 },
    SHORTURL_UNDEFINED: { status: 'ERROR', message: 'ShortUrl field is undefined', code: 400 },
}



function errorHelper(error) {
    const errorResponse = errorList[error];
    if (errorResponse == undefined) {
        return defaultError;
    }
    return errorResponse;
}

module.exports = errorHelper;
