function Animal(name, date, genre, race, owner, type) {
    /*
        animale
        
        + codice
        - nome
        - data di nascita
        - genere (gatto, cane, cavallo)
        > razza (persiano, alano)
        > owner (codice fiscale del proprietario)
    */
    this.name = name;
    this.date = date;
    this.genre = genre;
    this.race = race;
    this.owner = owner;
    this.type = type;
    this.code = new Date().getTime();
}

// converting this object to json
Animal.prototype.tojson = function() {
    return JSON.stringify(this);
};

// converting this object to array
Animal.prototype.toarray = function() {
    return [this.code, this.name, this.date, this.genre, this.race, this.owner, this.type];
}

// creating table inside db
//var OracleDB = require("../DB").DB;
//var db = new OracleDB();
Animal.create = function(db, callback) {
    db.connect().then(function(connection) {
        var query = "DROP TABLE vet_animals PURGE";

        console.log("about to create table vet_animals");
        db.execute(connection, query, function(connection, result, err) {

            if (err) {
                console.log(err);
                db.close(connection);
                return;
            }

            query = "CREATE TABLE vet_animals (";
            query += "code NUMBER PRIMARY KEY, "
            query += "name VARCHAR2(20) NOT NULL, "
            query += "anim_date VARCHAR2(20) NOT NULL, "
            query += "genre VARCHAR2(20) NOT NULL, "
            query += "race VARCHAR2(20) NOT NULL CONSTRAINT fk_vet_animals_1 REFERENCES vet_races(race) ON DELETE CASCADE, "
            query += "owner VARCHAR2(20) NOT NULL CONSTRAINT fk_vet_animals_2 REFERENCES vet_owners(cf) ON DELETE CASCADE)";
            //query += "type VARCHAR2(20) NOT NULL)";

            console.log(query);

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


// exporting animal module
module.exports = Animal;