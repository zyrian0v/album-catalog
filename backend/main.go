package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"log"
	"net/http"
	"os"
	"strconv"
)

type Album struct {
	Id     int    `json:"id"`
	Artist string `json:"artist"`
	Name   string `json:"name"`
	Cover  string `json:"cover"`
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
	r.Post("/albums/{id}/update", JsonContentType(albumUpdate))
	r.Delete("/albums/{id}/delete", albumDelete)

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
	as, err := DBListAlbums()
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	b, err := json.Marshal(as)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(b)
}

func albumAdd(w http.ResponseWriter, r *http.Request) {
	jsons := r.FormValue("json")
	newAlbum := Album{}
	err := json.Unmarshal([]byte(jsons), &newAlbum)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	filename, err := saveCoverFile(r)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newAlbum.Cover = filename

	err = DBAddAlbum(newAlbum)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func albumUpdate(w http.ResponseWriter, r *http.Request) {
	jsons := r.FormValue("json")
	updatedAlbum := Album{}
	err := json.Unmarshal([]byte(jsons), &updatedAlbum)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	filename, err := saveCoverFile(r)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	updatedAlbum.Cover = filename

	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = DBUpdateAlbum(id, updatedAlbum)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func albumDelete(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	a, err := DBGetAlbum(id)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if a.Cover != "" {
		os.Remove("covers/" + a.Cover)
	}

	err = DBDeleteAlbum(id)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
