//  backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});




/***    Middlware for testing user authentication routes
 //  Middlware to restore user session
 router.use(restoreUser);
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
