//function to return a random 255 character string 
const randomString = () => {
    const length = 255;
    let randomStr = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        randomStr += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomStr;
}

module.exports = {
    randomString,
};