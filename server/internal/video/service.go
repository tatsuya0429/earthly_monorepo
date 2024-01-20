package video

import (
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type VideoServiceServer interface {
	UploadVideo(VideoService_UploadVideoServer) error
	mustEmbedUnimplementedVideoServiceServer()
}

// UnimplementedVideoServiceServer must be embedded to have forward compatible implementations.

type UnimplementedVideoServiceServer struct {
}

func (UnimplementedVideoServiceServer) UploadVideo(VideoService_UploadVideoServer) error {
	return status.Errorf(codes.Unimplemented, "method UploadVideo not implemented")
}
