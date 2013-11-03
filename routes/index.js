/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Mock API' });
};

exports.add = function (req, res) {
    var versionName = "versionName";

    switch (req.method) {
        case 'GET':
            res.render('version/add', {title: 'Add API version.', inputVersion: versionName})
            break;

        case 'POST':
            var version = req.body[versionName];
            res.send({version: version});
            break;

        default :
            res.send({error : 'not a request'});
            break;
    }
}