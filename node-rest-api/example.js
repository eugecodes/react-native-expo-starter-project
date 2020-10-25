var sqlFindMobile = "select * from user_mobiles where mobile=?";
var sqlNewUser = "insert into users (password) values (?)";
//var sqlUserId = "select last_insert_id() as user_id";
var sqlNewMobile = "insert into user_mobiles (user_id, mobile) values (?,?)";
connection.connect(function(err){});
var query = connection.query(sqlFindMobile, [req.body.mobile], function(err, results) {
    if(err) throw err;
    console.log("mobile query");
    if(results.length==0) {
        var query = connection.query(sqlNewUser, [req.body.password], function(err, results) {
            if(err) throw err;
            console.log("added user");
            var user_id = results.insertId;
            connection.query(sqlNewMobile, [user_id, req.body.mobile], function(err, results) {
                if(err) throw err;
                connection.end();
                });
        });
    }
});
