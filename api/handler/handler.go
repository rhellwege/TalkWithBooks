package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// services will be added here
type Handler struct{}

type Config struct {
	R *gin.Engine // Router
}

// Handler builder
func NewHandler(c *Config) {
	h := &Handler{}

	// create a grouping of routes
	g := c.R.Group("/api")

	g.POST("/signup", h.Signup)
	g.POST("/signin", h.Signin)
	g.POST("/signout", h.Signout)
	g.POST("/tokens", h.Tokens)
	g.POST("/library", h.AddLibrary)
	g.DELETE("/library", h.DeleteLibrary)

}

func (h *Handler) Signup(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{"name": "signup"})
}

func (h *Handler) Signin(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{"name": "signin"})
}

func (h *Handler) Signout(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{"name": "signout"})

}

func (h *Handler) Tokens(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{"name": "tokens"})
}

func (h *Handler) AddLibrary(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{"name": "addlibrary"})
}

func (h *Handler) DeleteLibrary(g *gin.Context) {
	g.JSON(http.StatusOK, gin.H{"name": "deletelibrary"})
}
