const jwt = require('jsonwebtoken');

/**
 * 
 * This handles signing the user in;
 */
const refreshTokenService = async ({ props }) => {
    try {
        const { refreshToken } = props;

        if (!refreshToken) {
            return { code: 'E401', message: 'Unauthorized' }
        }

        jwt.verify(refreshToken, process.env.JSON_WEB_REFRESH_SECRET, (err, user) => {
            if (err) return { code: 'E403', message: 'Forbidden' }; // Forbidden

            console.log('refresh successful')
            // Generate a new access token
            const newAccessToken = jwt.sign(user, process.env.JSON_WEB_SECRET, { expiresIn: '15m' });
            return { code: '00', message: { accessToken: newAccessToken, } }

        });

    } catch (error) {
        console.log({error})

        return { code: 'E500', message: error.message }
    }
};

module.exports = refreshTokenService;