package api

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func CreateJwtToken(val, secret string, duration time.Duration) (string, error) {
	claims := jwt.RegisteredClaims{
		Issuer:    "chill-room",
		IssuedAt:  jwt.NewNumericDate(time.Now().UTC()),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(duration)),
		Subject:   val,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
	tokenString, err := token.SignedString(secret)
	if err != nil {
		return "", err
	}
	return tokenString, err
}

func VerifyJwtToken(token string) {

}
