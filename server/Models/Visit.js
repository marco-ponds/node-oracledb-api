
function Visit(date, animal, notes) {
    /*
        visita

        + codice visita
        - data
        - annotazioni
        > animale id
    */
    this.date = date;
    this.note = notes;
    this.animal = animal;
    this.code = new Date().getTime();
}

// converting this object to json
Visit.prototype.tojson = function() {
    return JSON.stringify(this);
};

// converting this object to array
Visit.prototype.toarray = function() {
    return [this.code, this.date, this.note, this.animal];
}

// creating table inside db
//var OracleDB = require("../DB").DB;
//var db = new OracleDB();

Visit.create = function(db, callback) {
    db.connect().then(function(connection) {
        var query = "DROP TABLE vet_visits PURGE";

        console.log("about to create table vet_visits");
        db.execute(connection, query, function(connection, result, err) {

            if (err) {
                console.log(err);
                db.close(connection);
                return;
            }

            query = "CREATE TABLE vet_visits (";
            query += "code NUMBER PRIMARY KEY, "
            query += "visit_date VARCHAR2(20) NOT NULL, "
            query += "note VARCHAR2(400) NOT NULL, "
            query += "animal NUMBER NOT NULL CONSTRAINT fk_vet_visits REFERENCES vet_animals(code) ON DELETE CASCADE)";

            db.execute(connection, query, function(connection, result, err) {
                if (err) {
                    console.log(err);
                    db.close(connection);
                    return;
                }
                // closing db
                db.close(connection);
                callback();
            });
        });
    });
}

// exporting Visit module
module.exports = Visit;