package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"net/http"
)

type Album struct {
	Artist string `json:"artist"`
	Name   string `json:"name"`
	Cover  string `json:"cover"`
}

var albums = []Album{
	{"Nirvana", "Nevermind", "nevermind.jpg"},
	{"Tremantina", "Almost React The Sun", "react_the_sun.jpg"},
	{"Death Grips", "The Money Store", "the_money_store.jpg"},
	{"Ride", "Nowhere", "ride.jpg"},
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(JsonMiddleware)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})
	r.Get("/albums", albumList)

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

func JsonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
