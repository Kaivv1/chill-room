package api

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type RoomUser struct {
	Conn   *websocket.Conn
	ID     string
	RoomID string
}

type Room struct {
	RoomUsers map[string]*RoomUser
}

type Message struct {
	Sender_ID string
	Content   interface{}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var rooms = make(map[string]*Room)

func (s *Server) wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to upgrade conn: %s\n", err.Error())
		return
	}
	userID := r.URL.Query().Get("user_id")
	roomID := r.URL.Query().Get("room_id")
	if _, ok := rooms[roomID]; !ok {
		rooms[roomID] = &Room{RoomUsers: make(map[string]*RoomUser)}
		log.Println("Room doesnt exists so one is created")

	}
	if _, ok := rooms[roomID].RoomUsers[userID]; !ok {
		rooms[roomID].RoomUsers[userID] = &RoomUser{
			Conn:   conn,
			ID:     userID,
			RoomID: roomID,
		}
		log.Println("User doesnt exist in the room so one is created")
	}
	for {
		messageType, data, err := conn.ReadMessage()
		log.Println(messageType)
		log.Println(string(data))
		if err != nil {
			log.Println(err)
			return
		}
		if err = conn.WriteMessage(messageType, data); err != nil {
			log.Println(err)
			return
		}
	}
}
