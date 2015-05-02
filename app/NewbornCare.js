
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE newborncare FIELDS TERMINATED ' +
        'BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, PID, SEQ, @BDATE, BCARE, ' +
        'BCPLACE, BCARERESULT, FOOD, PROVIDER, @D_UPDATE) SET ' +
        'D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), BDATE=STR_TO_DATE(@BDATE, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};