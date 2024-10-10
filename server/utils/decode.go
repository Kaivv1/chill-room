package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

func DecodeBody(w http.ResponseWriter, r *http.Request, params interface{}, msg string) {
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(params)
	if err != nil {
		log.Println(msg)
		RespondWithError(w, http.StatusBadRequest, "Cannot decode request body")
		return
	}
}
