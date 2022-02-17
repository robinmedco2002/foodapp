function success (message, data){
    return {
        data,
        type: "success",
        message
    };
}

function error (message, errors = [], data = null){
    return {
        data,
        errors,
        message,
        type: "error"
    };
}

function response (data, message = "Success"){
    return {
        data,
        type: "success",
        message
    };
}

const wrapRequestHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const messages = () => ({
    logged_in: "Logged In",
    user_not_found: "User does not exists",
    account_disabled: "Your account has not been active",
    invalid_password: "Invalid Password",
    invalid_otp: "Invalid OTP",
    otp_required: "OTP is required to sign in",
    otp_sent: "OTP sent on your phone number"
});

module.exports = {
    success,
    error,
    response,
    wrapRequestHandler,
    messages
};
