package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

func RespondWithJson(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Add("Content-Type:", "application/json")

	dat, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Cannot marshal data and respond with json: %s", err.Error())
		w.WriteHeader(500)
		return
	}
	w.WriteHeader(code)
	w.Write(dat)
}
