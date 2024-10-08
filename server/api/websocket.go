package api

import (
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type RoomUser struct {
	Conn     *websocket.Conn
	Username string
	ID       uuid.UUID
	RoomID   uuid.UUID
}

type Room struct {
	RoomUsers []*RoomUser
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var rooms = make(map[string]*Room)

func (s *Server) wsHandler(w http.ResponseWriter, r *http.Request) {
	_, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to upgrade conn: %s", err.Error())
		return
	}
	username := r.URL.Query().Get("username")
	roomID := r.URL.Query().Get("rood_id")

	log.Printf("Username: %s and roomID: %s", username, roomID)
}
