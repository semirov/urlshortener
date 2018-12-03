const defaultError = { status: 'ERROR', message: 'Internal server error', code: 500 }

const errorList = {
    NO_URL_IN_QUERY: { status: 'ERROR', message: 'No url in query param', code: 400 },

}



function errorHelper(error) {
    let code = error.code;
    if (code === undefined) {
        code = error;
    }
    const errorResponse = errorList[code];
    if (errorResponse === undefined) {
        return defaultError;
    }
    return error;
}

module.exports = errorHelper;
