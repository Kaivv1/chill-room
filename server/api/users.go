package api

import (
	"log"
	"net/http"
	"time"

	"github.com/Kaivv1/chill-room/types"
	"github.com/Kaivv1/chill-room/utils"
	"github.com/google/uuid"
)

func (s *Server) RegisterUser(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	params := &parameters{}
	utils.DecodeBody(w, r, params, "Cannot decode body at RegisterUser")

	newUser, err := s.db.CreateUser(types.User{
		Id:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Username:  params.Username,
		Email:     params.Email,
		Password:  params.Password,
	}, r.Context())

	if err != nil {
		log.Println(err.Error())
		utils.RespondWithError(w, 500, err.Error())
		return
	}

	utils.RespondWithJson(w, 200, types.UserToUserJson(&newUser))
}
