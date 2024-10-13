package api

import (
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/Kaivv1/chill-room/types"
	"github.com/Kaivv1/chill-room/utils"
	"github.com/google/uuid"
)

func (s *Server) CreateRoom(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name       string `json:"name"`
		Creator_ID string `json:"creator_id"`
	}
	type returnVals struct {
		ID   string `json:"id"`
		Name string `json:"name"`
	}
	params := &parameters{}
	utils.DecodeBody(w, r, params, "Cannot decode body at CreateRoom")
	creator_uuid, err := uuid.Parse(params.Creator_ID)
	if err != nil {
		log.Printf("Error while parsing creator uuid from body at CreateRoom: %s", err.Error())
		utils.RespondWithError(w, http.StatusUnprocessableEntity, "not valid user")
		return
	}
	room, err := s.db.CreateDbRoom(types.Room{
		ID:         uuid.New(),
		Created_At: time.Now().UTC(),
		Updated_At: time.Now().UTC(),
		Is_Active:  true,
		Name:       params.Name,
		Creator_ID: creator_uuid}, r.Context())
	if err != nil {
		if RoomAlreadyExists := strings.Contains(err.Error(), "violates unique constraint \"rooms_name_key\""); RoomAlreadyExists {
			utils.RespondWithError(w, http.StatusConflict, "room with that name already exists")
			log.Println(err.Error())
			return
		}
		if UserAlreadyHasRoom := strings.Contains(err.Error(), "violates unique constraint \"rooms_creator_id_key\""); UserAlreadyHasRoom {
			utils.RespondWithError(w, http.StatusConflict, "user already has a room")
			log.Println(err.Error())
			return
		}
		utils.RespondWithError(w, 500, "DB Error while creating a room")
		log.Printf("Error while creating new room in db: %s\n", err.Error())
		return
	}
	utils.RespondWithJson(w, 201, &returnVals{
		ID:   room.ID.String(),
		Name: room.Name,
	})
}

func (s *Server) JoinRoom(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Room_ID string `json:"room_id"`
		User_ID string `json:"user_id"`
	}
	params := &parameters{}
	utils.DecodeBody(w, r, params, "Error while decoding body in JoinRoom")
	room_uuid, err := uuid.Parse(params.Room_ID)
	if err != nil {
		utils.RespondWithError(w, http.StatusUnprocessableEntity, "not valid room id")
		return
	}
	user_uuid, err := uuid.Parse(params.User_ID)
	if err != nil {
		utils.RespondWithError(w, http.StatusUnprocessableEntity, "not valid user id")
		return
	}

	exists, err := s.db.CheckIfRoomExists(room_uuid, r.Context())
	if err != nil {
		utils.RespondWithError(w, 500, "DB error while checking if room exists")
		return
	}
	if !exists {
		utils.RespondWithError(w, 404, "Room does not exist")
		return
	}
	err = s.db.UserJoinsRoom(types.Room_User{
		ID:         uuid.New(),
		Created_At: time.Now().UTC(),
		Room_ID:    room_uuid,
		User_ID:    user_uuid,
	}, r.Context())
	if err != nil {
		log.Println(err.Error())
		utils.RespondWithError(w, 500, "DB error while joining room")
		return
	}
	w.WriteHeader(201)
}

func (s *Server) CheckIfRoomExists(w http.ResponseWriter, r *http.Request) {
	type returnVals struct {
		Exists bool `json:"exists"`
	}
	room_id := r.URL.Query().Get("id")
	if room_id == "" {
		utils.RespondWithError(w, http.StatusBadRequest, "No room id provided to check if it exists")
		return
	}
	room_uuid, err := uuid.Parse(room_id)
	if err != nil {
		utils.RespondWithError(w, http.StatusUnprocessableEntity, "Not a valid room id for existence check")
		return
	}
	exists, err := s.db.CheckIfRoomExists(room_uuid, r.Context())
	if err != nil {
		utils.RespondWithError(w, 500, "DB error while checking if room exists")
		return
	}
	utils.RespondWithJson(w, 200, returnVals{
		Exists: exists,
	})
}
