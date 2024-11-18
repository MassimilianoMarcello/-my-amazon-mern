const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    return usernameRegex.test(username);
};
export default validateUsername;
