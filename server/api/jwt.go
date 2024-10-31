package api

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func createJwtToken(val, secret string, duration time.Duration) {
	claims := jwt.RegisteredClaims{
		Issuer:    "chill-room",
		IssuedAt:  jwt.NewNumericDate(time.Now().UTC()),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(duration)),
		Subject:   val,
	}

}
