const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});




/***    Middlware for testing user authentication routes
 //  Middlware to restore user session
 router.get('/restore-user', (req, res) => res.json(req.user));

 //  Middleware to return error if no session user
 const { requireAuth } = require('../../utils/auth.js');
 router.get('/require-auth', requireAuth, (req, res) => res.json(req.user));

 //  Test route for setTokenCookie()
 const { setTokenCookie } = require('../../utils/auth.js');
 const { User } = require('../../db/models');
 router.get('/set-token-cookie', async (_req, res) => {
     const user = await User.findOne({
         where: { username: 'JumboWumbo' }
     });
     setTokenCookie(res, user);
     return res.json({ user: user });
 });
***/




module.exports = router;
