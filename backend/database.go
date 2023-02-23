package main

import (
	"database/sql"
	"flag"
	"log"
	"os"

	_ "rsc.io/sqlite"
)

var handle *sql.DB

func init() {
	handle = DBOpenConnection()

	setupdb := flag.Bool("setupdb", false, "use this to setup schema for an empty database")
	flag.Parse()
	if *setupdb == true {
		DBSetup()
	}
}

func DBOpenConnection() *sql.DB {
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

func DBSetup() {
	setupSql, err := os.ReadFile("sql/schema.sql")
	if err != nil {
		log.Fatal(err)
	}
	_, err = handle.Exec(string(setupSql))
	if err != nil {
		log.Fatal(err)
	}
}

func DBListAlbums() (as []Album, err error) {
	stmt := "SELECT id, artist, name, cover FROM albums;"
	rows, err := handle.Query(stmt)
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

func DBGetAlbum(id int) (a Album, err error) {
	stmt := `SELECT id, artist, name, cover FROM albums WHERE id = ?`
	err = handle.QueryRow(stmt, id).Scan(&a.Id, &a.Artist, &a.Name, &a.Cover)
	return
}

func DBAddAlbum(a Album) error {
	stmt := `INSERT INTO albums (artist, name, cover) VALUES (?, ?, ?); `
	_, err := handle.Exec(stmt, a.Artist, a.Name, a.Cover)
	return err
}

func DBUpdateAlbum(id int, a Album) error {
	stmt := `UPDATE albums 
	SET artist = ?,
	name = ?,
	cover = ?
	WHERE id = ?;`
	_, err := handle.Exec(stmt, a.Artist, a.Name, a.Cover, id)
	return err
}

func DBDeleteAlbum(id int) error {
	stmt := `DELETE FROM albums WHERE id = ?`
	_, err := handle.Exec(stmt, id)
	return err
}
