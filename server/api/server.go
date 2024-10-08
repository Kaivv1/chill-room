package api

import (
	"fmt"
	"net/http"

	db "github.com/Kaivv1/chill-room/database"
	"github.com/Kaivv1/chill-room/utils"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type Server struct {
	listenAddr string
	db         db.DBFuncs
}

func NewServer(listenAddr string, db db.DBFuncs) *Server {
	return &Server{
		listenAddr: listenAddr,
		db:         db,
	}
}

func (s *Server) Start() error {
	router := chi.NewRouter()
	api := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Mount("/api", api)
	api.Get("/healthz", s.Healthz)
	api.Get("/errors", s.Errors)
	// api.Post("/users", s.RegisterUser)
	api.HandleFunc("/ws", s.wsHandler)
	return http.ListenAndServe(fmt.Sprintf(":%s", s.listenAddr), router)
}

func (s *Server) Healthz(w http.ResponseWriter, r *http.Request) {
	type returnVals struct {
		Status string `json:"status"`
	}
	utils.RespondWithJson(w, http.StatusOK, &returnVals{
		Status: "We healthy",
	})
}

func (s *Server) Errors(w http.ResponseWriter, r *http.Request) {
	utils.RespondWithError(w, 500, "Server error")
}
