module.exports = 
    (rawUserData) => {
        userData = {
            "id" : rawUserData.id,
            "name" : rawUserData.name,
            "email" : rawUserData.email
        }
        return userData
    }