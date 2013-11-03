/**
 * Created with IntelliJ IDEA.
 * User: Jerry
 * Mail: jerry.jobs@qq.com
 * URL: https://github.com/jerryjobs
 * Date: 13-11-2
 * Time: 下午11:44
 *
 */

exports.setEnv = function (app, express) {
    var log4js = require('log4js');
    log4js.configure({  appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: './logs/access.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'normal'
        }
    ], replaceConsole: true});
    var logger = log4js.getLogger('normal');

    if ('development' == app.get('env')) {
        logger.setLevel('INFO');
        app.use(express.errorHandler());
        app.use(log4js.connectLogger(logger, {level: 'auto', format: ':method :url'}));

    } else if ('production' == app.get('env')) {
        app.user(log4js.connectLogger(logger, {level: og4js.levels.WARN, format: ':method :url :params'}));
    }
}

exports.setRouts = function (app) {
    var route = require('./routes');
    app.get('/', route.index);
    app.get('/users', require('./routes/user').list);
    app.get('/version/add', route.add);
    app.post('/version/add', route.add);
    app.get('/api/:version', route.oneVersion);
}

exports.setDbCollection = function (app) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');
    return mongoose;
}
