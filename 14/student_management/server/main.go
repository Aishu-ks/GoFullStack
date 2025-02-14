package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	mongoUri              = "mongodb://localhost:27017"
	mongoDbName           = "student_management_db"
	mongoCollectionStudent = "students"
	mongoclient           *mongo.Client
	studentCollection     *mongo.Collection
)

type Student struct {
	USN     string `bson:"usn" json:"usn"`
	Name    string `bson:"name" json:"name"`
	Section string `bson:"section" json:"section"`
	Type    string `bson:"type" json:"type"`
}

func connectDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if err != nil {
		log.Println("MongoDB Connection Error:", err)
		return
	}

	// Ping the database to ensure connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Println("MongoDB Ping Error:", err)
		return
	}

	mongoclient = client
	studentCollection = client.Database(mongoDbName).Collection(mongoCollectionStudent)
	fmt.Println("Connected to MongoDB!")
}

func createStudent(c *gin.Context) {
	var jbodyStudent Student

	if err := c.BindJSON(&jbodyStudent); err != nil {
		log.Println("Invalid request:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := studentCollection.InsertOne(ctx, jbodyStudent)
	if err != nil {
		log.Println("Insert Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Student created successfully", "student": jbodyStudent})
}

func readAllStudents(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := studentCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Println("Fetch Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
		return
	}
	defer cursor.Close(ctx)

	students := []Student{}
	if err := cursor.All(ctx, &students); err != nil {
		log.Println("Cursor Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse students"})
		return
	}

	c.JSON(http.StatusOK, students)
}

func readStudentByUSN(c *gin.Context) {
	usn := c.Param("usn")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var student Student
	err := studentCollection.FindOne(ctx, bson.M{"usn": usn}).Decode(&student)
	if err != nil {
		log.Println("FindOne Error:", err)
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	c.JSON(http.StatusOK, student)
}

func updateStudent(c *gin.Context) {
	usn := c.Param("usn")
	var jbodyStudent Student

	if err := c.BindJSON(&jbodyStudent); err != nil {
		log.Println("Invalid request:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := studentCollection.UpdateOne(ctx, bson.M{"usn": usn}, bson.M{"$set": jbodyStudent})
	if err != nil {
		log.Println("Update Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update student"})
		return
	}

	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Student updated successfully"})
}

func deleteStudent(c *gin.Context) {
	usn := c.Param("usn")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := studentCollection.DeleteOne(ctx, bson.M{"usn": usn})
	if err != nil {
		log.Println("Delete Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete student"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Student deleted successfully"})
}

func main() {
	connectDB()
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/students", createStudent)
	r.GET("/students", readAllStudents)
	r.GET("/students/:usn", readStudentByUSN)
	r.PUT("/students/:usn", updateStudent)
	r.DELETE("/students/:usn", deleteStudent)

	fmt.Println("Server running on port 8080...")
	err := r.Run(":8080")
	if err != nil {
		log.Fatal("Server Error:", err)
	}
}
