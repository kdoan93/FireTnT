//  backend/routes/index.js
const express = require('express');
const router = express.Router();

// router.get('/hello/world', function(req, res) {
//     //  On res, setting a cookie anmed 'XSRF-TOKEN' with return method value of req.csrfToken
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     //  Sending text 'Hello World!' as res.body
//     res.send('Hello World!');
// });

//  Route will not be exclusive to production app until frontend of application is implemented
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });

module.exports = router;
