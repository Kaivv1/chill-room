package utils

import (
	"log"
	"net/http"
)

func RespondWithError(w http.ResponseWriter, code int, msg string) {
	type returnVals struct {
		Error string `json:"error"`
	}
	if code > 499 {
		log.Printf("Attention personel we have a %d error in our hands", code)
	}
	RespondWithJson(w, code, &returnVals{
		Error: msg,
	})
}
