exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:password1@ds155461.mlab.com:55461/idea-bank';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:password1@ds127841.mlab.com:27841/idea-bank-test';
exports.PORT = process.env.PORT || 8080;