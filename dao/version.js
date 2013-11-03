/**
 * Created with IntelliJ IDEA.
 * User: Jerry
 * Mail: jerry.jobs@qq.com
 * URL: https://github.com/jerryjobs
 * Date: 13-11-3
 * Time: 下午2:26
 *
 */

var mongoose = require('mongoose');
require('express-mongoose');

var Schema = mongoose.Schema;

var VerionSchema = new Schema({
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    routes: {type: String, default: ''}
});

exports.Version = mongoose.model('Version', VerionSchema);