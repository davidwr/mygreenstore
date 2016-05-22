var path = require('path')

module.exports = function(){
  return {
    getUrl: function() {
      return 'http://' + (process.env.OPENSHIFT_APP_DNS || this.ip + ':' + this.port);
    },
    port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip: process.env.OPENSHIFT_NODEJS_IP || 'localhost',
    gui_root: path.resolve('./frontend'),
    db: {
      adapter: 'sails-mongo',
      host: process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost',
      port: process.env.OPENSHIFT_MONGODB_DB_PORT || 27017,
      user: process.env.OPENSHIFT_MONGODB_DB_USERNAME || 'admin',
      password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '123mudar',
      database: process.env.OPENSHIFT_APP_NAME || 'mygreenstore'
    },

    getConnectionString : function() {
      return  "mongodb://" +
  							this.db.user + ":" +
  							this.db.password + "@" +
  							this.db.host + ':' +
  							this.db.port + '/' +
  							this.db.database;
    },

    getGoogleAuth : function() {
      return {
        clientID      : '781562583420-jp5dnffk58hu8qa37jjb59mvnauaks2r.apps.googleusercontent.com',
        clientSecret  : 'dvgwlxeBh71G99f6E-fS2WsL',
        callbackURL   : this.getUrl() + '/auth/google/callback'
      }
    }
  };
}
