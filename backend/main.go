package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"net/http"
)

type Album struct {
	Id     int    `json:"id"`
	Artist string `json:"artist"`
	Name   string `json:"name"`
	Cover  string `json:"cover"`
}

var albums = []Album{
	{0, "Nirvana", "Nevermind", "nevermind.jpg"},
	{1, "Tremantina", "Almost React The Sun", "react_the_sun.jpg"},
	{2, "Death Grips", "The Money Store", "the_money_store.jpg"},
	{3, "Ride", "Nowhere", "ride.jpg"},
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(JsonMiddleware)
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

	r.Get("/albums", albumList)
	r.Post("/albums/new", albumAdd)

	fmt.Println("serving on :8080...")
	http.ListenAndServe(":8080", r)
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
	dec := json.NewDecoder(r.Body)
	newAlbum := Album{}
	err := dec.Decode(&newAlbum)
	if err != nil {
		fmt.Sprint(w, err)
	}
	albums = append(albums, newAlbum)
}

func JsonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
