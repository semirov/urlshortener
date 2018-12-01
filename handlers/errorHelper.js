const defaultError = {status: 'ERROR', message: 'Internal server error', code: 500}

const errorList = {
    NO_URL_IN_QUERY: {status: 'ERROR', message: 'No url in query param', code: 400},
    
}



function errorHelper(errorCode) {
    const error = errorList[errorCode];
    if (error === undefined) {
        return defaultError;
    }
    return error;
}

module.exports = errorHelper;