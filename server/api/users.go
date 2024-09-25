package api

import (
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/Kaivv1/chill-room/types"
	"github.com/Kaivv1/chill-room/utils"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func (s *Server) RegisterUser(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	params := &parameters{}
	utils.DecodeBody(w, r, params, "Cannot decode body at RegisterUser")
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(params.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Problem hashing password while creating user")
		return
	}
	newUser, err := s.db.CreateUser(types.User{
		Id:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Username:  params.Username,
		Email:     params.Email,
		Password:  string(hashedPass),
	}, r.Context())

	if err != nil {
		if emailExists := strings.Contains(err.Error(), "\"users_email_key\""); emailExists {
			log.Println("Email already exists")
			utils.RespondWithError(w, http.StatusBadRequest, "User with that email already exists")
			return
		}
		if usernameExists := strings.Contains(err.Error(), "\"users_username_key\""); usernameExists {
			log.Println("Username already exists")
			utils.RespondWithError(w, http.StatusBadRequest, "User with that username already exists")
			return
		}
		log.Println(err.Error())
		utils.RespondWithError(w, 500, err.Error())
		return
	}

	utils.RespondWithJson(w, 200, types.UserToUserJson(&newUser))
}
