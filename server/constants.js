const {
    HOST,
    PORT,
    APP_ENV,
    API_DB_HOST,
    API_DB_PORT = 3306,
    API_DB_NAME,
    API_DB_USERNAME,
    API_DB_PASSWORD,
    RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET,
    rapidapi_key
} = process.env;

module.exports = {

    HOST,
    PORT,
    APP_ENV,
    API_DB_HOST,
    API_DB_PORT,
    API_DB_NAME,
    API_DB_USERNAME,
    API_DB_PASSWORD,
    RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET,
    rapidapi_key,

    LOGIN_TOKEN: "login",
    RESET_PASSWORD_TOKEN: "reset-password",
    OTP_TOKEN: "otp-authentication",

    CREATE_EMPLOYEE: "CREATE_EMPLOYEE",
    VIEW_EMPLOYEES: "VIEW_EMPLOYEES",
    UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
    DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
    CREATE_USER: "CREATE_USER",
    VIEW_USERS: "VIEW_USERS",
    UPDATE_USER: "UPDATE_USER",
    VIEW_KYC: "VIEW_KYC",
    UPDATE_KYC: "UPDATE_KYC",
    CREATE_NOTIFICATION: "CREATE_NOTIFICATION",
    VIEW_NOTIFICATIONS: "VIEW_NOTIFICATIONS",
};