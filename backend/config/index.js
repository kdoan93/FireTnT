// backend/config/index.js
//  Reads and exports each environment variable as a key from index.js
module.exports = {
    environment: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  };
