package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"net/http"
	"os"
	"io"
	"log"
)

type Album struct {
	Id     int    `json:"id"`
	Artist string `json:"artist"`
	Name   string `json:"name"`
	Cover  string `json:"cover"`
}

var albums = []Album{
	{0, "Nirvana", "Nevermind", ""},
	{1, "Trementina", "Almost Reach The Sun", "almost_reach_the_sun.jpg"},
	{2, "Death Grips", "The Money Store", ""},
	{3, "Ride", "Nowhere", "almost_reach_the_sun.jpg"},
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Get("/albums", JsonContentType(albumList))
	r.Post("/albums/new", JsonContentType(albumAdd))

	fs := http.FileServer(http.Dir("./covers"))
	fs2 := http.StripPrefix("/covers", fs)
	r.Get("/covers/*", fs2.ServeHTTP)

	fmt.Println("serving on :8080...")
	http.ListenAndServe(":8080", r)
}

func JsonContentType(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next(w, r)
	}
}


func albumList(w http.ResponseWriter, r *http.Request) {
	b, err := json.Marshal(albums)
	if err != nil {
		fmt.Sprint(w, err)
		return
	}

	w.Write(b)
}

func albumAdd(w http.ResponseWriter, r *http.Request) {
	jsons := r.FormValue("json")
	newAlbum := Album{}
	err := json.Unmarshal([]byte(jsons), &newAlbum)
	newAlbum.Id = len(albums)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	f, header, err := r.FormFile("cover")
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	diskFile, err := os.Create("covers/"+header.Filename)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = io.Copy(diskFile, f)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	newAlbum.Cover = header.Filename
	
	albums = append(albums, newAlbum)
}

func albumCoverAdd(w http.ResponseWriter, r *http.Request) {
	f, header, err := r.FormFile("cover")
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	diskFile, err := os.Create("covers/"+header.Filename)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = io.Copy(diskFile, f)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}


