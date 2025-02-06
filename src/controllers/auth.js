import { ONE_MONTH } from "../constants/index.js";
import { logoutUser, refreshUsersSession, registerUser } from "../services/auth.js";
import { loginUser } from "../services/auth.js";





export const registerUserController = async (req, res) => {
    const user = registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_MONTH),

    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_MONTH),

    });
    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

// export const logoutUserController = async (req, res) => {
//     if (req.cookies.sessionId) {
//         await logoutUser(req.cookies.sessionId);
//     }
//     res.clearCookie('sessionId');
//     res.clearCookie('refreshToken');

//     res.status(204).send();
// };




// export const logoutUserController = async (req, res, next) => {
//     try {
//         console.log("Cookies:", req.cookies);

//         if (!req.cookies || !req.cookies.sessionId) {
//             return res.status(400).json({ message: "No sessionId in cookies" });
//         }

//         await logoutUser(req.cookies.sessionId);
//         res.clearCookie('sessionId');
//         res.clearCookie('refreshToken');
//         res.status(204).send();
//     } catch (error) {
//         next(error);
//     }
// };




export const logoutUserController = async (req, res) => {
    await logoutUser({
        sessionId: req.cookies.sessionId,
        sessionToken: req.cookies.sessionToken,

    });
    res.clearCookie('sessionToken');
    res.clearCookie('sessionId');

    res.status(204).send();
};


const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_MONTH),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_MONTH),
    });
};

export const refreshUsersSessionController = async (req, res) => {
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,

    });
    setupSession(req, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });

};


