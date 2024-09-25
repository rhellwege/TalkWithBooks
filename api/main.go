package main

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

const REDIS_ADDRESS = "localhost:6379"

func handleCreateAccount(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"name": "test"})
}

func main() {
	ctx := context.Background()
	redisClient := redis.NewClient(&redis.Options{
		Addr:     REDIS_ADDRESS,
		Password: "",
		DB:       0,
	})
	err := redisClient.Set(ctx, "foo", "bar", 0).Err()
	if err != nil {
		panic(err)
	}

	redisClient.LPush(ctx, "task")

	router := gin.Default()
	router.POST("/create-account", handleCreateAccount)
	router.Run("localhost:8080")
}
