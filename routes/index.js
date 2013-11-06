/*
 * GET home page.
 */
var models = require('../dao/version');

exports.index = function (req, res) {
    models.Version.find(function (err, doc) {
        if (err) {
            console.error(err);
            res.send({error: "server error."});
        } else {
            res.render('index', { title: 'Mock API', versions: doc});
        }
    });
};

exports.add = function (req, res) {
    var versionName = "versionName";

    switch (req.method) {
        case 'GET':
            res.render('version/add', {title: 'Add API version.', inputVersion: versionName});
            break;

        case 'POST':

            var data = {name: req.body[versionName]};
            var a = models.Version.count(data, function (err, count) {
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    if (count > 0) {
                        res.render('version/add', {title: 'Add API version.', inputVersion: versionName, error: "api name (" + data.name + ") is exits"});
                    } else {
                        new models.Version(data).save();
                        //res.render('version/add', {title: 'Add API version.', inputVersion: versionName, success: "add api version (" + data.name + ") success ."});
                        res.redirect('/');
                    }
                }
            });
            break;

        default :
            res.send({title: 'Add API version.', inputVersion: versionName});
            break;
    }
}


exports.oneVersion = function (req, res) {
    console.info("request version is :" + req.params.version);
    var data = {name: req.params.version};
    models.Version.count(data, function (err, count) {
        if (err) {
            res.send({error: "server error"});
        } else if (count > 0) {
            models.Version.findOne(data, function (err, doc) {
                if (err) {
                    res.send("500, server error.");
                } else {
                    res.json(doc);
                }
            });
        } else {
            res.send("ok");
        }
    });
}

exports.deleteVersion = function (req, res) {
    console.info('delete version');
    var data = {name: req.params.version};
    console.log(data);
    var json = {
        success: 'true',
        error: ''
    }

    models.Version.findOne(data, function (err, doc) {
        if (err) {
            json.success = 'false';
            json.error = '未知错误';
        } else {
            doc.remove();
        }
        res.json(json);
    });
}