package main

import (
	"database/sql"
	"flag"
	"log"
	"os"
	_ "rsc.io/sqlite"
)

var db *sql.DB

func init() {
	db = openConnection()

	setupdb := flag.Bool("setupdb", false, "use this to setup schema for an empty database")
	flag.Parse()
	if *setupdb == true {
		setupDatabase()
	}
}

func openConnection() *sql.DB {
	db, err := sql.Open("sqlite3", "db.sqlite3")
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	return db
}

func setupDatabase() {
	setupSql, err := os.ReadFile("sql/setup.sql")
	if err != nil {
		log.Fatal(err)
	}
	_, err = db.Exec(string(setupSql))
	if err != nil {
		log.Fatal(err)
	}
}

func listAlbums() (as []Album, err error) {
	stmt := "SELECT id, artist, name, cover FROM albums;"
	rows, err := db.Query(stmt)
	if err != nil {
		return 
	}
	defer rows.Close()
	
	for rows.Next() {
		a := Album{}
		err = rows.Scan(&a.Id, &a.Artist, &a.Name, &a.Cover)
		if err != nil {
			return
		}
		as = append(as, a)
	}
	return
}