package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	"google.golang.org/grpc"

	videov1 "github.com/tatsuya0429/earthly_monorepo/server/internal/gen/app/video/v1"
)

func main() {
	port := 8080

	listner, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("Unable to listen on port %d: %v", port, err)
	}

	s := grpc.NewServer()

	videov1.RegisterVideoServiceServer(s, videov1.VideoServiceServer)

	go func() {
		if err := s.Serve(listner); err != nil {
			log.Fatalf("Failed to serve: %v", err)
		}
	}()

	// Ctrl + C to gracefully shutdown the server
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)
	<-ch
	s.GracefulStop()
}
