/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "app.video.v1";

export interface UploadVideoRequest {
  videoName: string;
  videoChunk: Uint8Array;
}

export interface UploadVideoResponse {
  videoId: string;
}

function createBaseUploadVideoRequest(): UploadVideoRequest {
  return { videoName: "", videoChunk: new Uint8Array(0) };
}

export const UploadVideoRequest = {
  encode(message: UploadVideoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.videoName !== "") {
      writer.uint32(10).string(message.videoName);
    }
    if (message.videoChunk.length !== 0) {
      writer.uint32(18).bytes(message.videoChunk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadVideoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadVideoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.videoName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.videoChunk = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadVideoRequest {
    return {
      videoName: isSet(object.videoName) ? globalThis.String(object.videoName) : "",
      videoChunk: isSet(object.videoChunk) ? bytesFromBase64(object.videoChunk) : new Uint8Array(0),
    };
  },

  toJSON(message: UploadVideoRequest): unknown {
    const obj: any = {};
    if (message.videoName !== "") {
      obj.videoName = message.videoName;
    }
    if (message.videoChunk.length !== 0) {
      obj.videoChunk = base64FromBytes(message.videoChunk);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadVideoRequest>, I>>(base?: I): UploadVideoRequest {
    return UploadVideoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadVideoRequest>, I>>(object: I): UploadVideoRequest {
    const message = createBaseUploadVideoRequest();
    message.videoName = object.videoName ?? "";
    message.videoChunk = object.videoChunk ?? new Uint8Array(0);
    return message;
  },
};

function createBaseUploadVideoResponse(): UploadVideoResponse {
  return { videoId: "" };
}

export const UploadVideoResponse = {
  encode(message: UploadVideoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.videoId !== "") {
      writer.uint32(10).string(message.videoId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadVideoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadVideoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.videoId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadVideoResponse {
    return { videoId: isSet(object.videoId) ? globalThis.String(object.videoId) : "" };
  },

  toJSON(message: UploadVideoResponse): unknown {
    const obj: any = {};
    if (message.videoId !== "") {
      obj.videoId = message.videoId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadVideoResponse>, I>>(base?: I): UploadVideoResponse {
    return UploadVideoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadVideoResponse>, I>>(object: I): UploadVideoResponse {
    const message = createBaseUploadVideoResponse();
    message.videoId = object.videoId ?? "";
    return message;
  },
};

export interface VideoService {
  UploadVideo(request: Observable<UploadVideoRequest>): Promise<UploadVideoResponse>;
}

export const VideoServiceServiceName = "app.video.v1.VideoService";
export class VideoServiceClientImpl implements VideoService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || VideoServiceServiceName;
    this.rpc = rpc;
    this.UploadVideo = this.UploadVideo.bind(this);
  }
  UploadVideo(request: Observable<UploadVideoRequest>): Promise<UploadVideoResponse> {
    const data = request.pipe(map((request) => UploadVideoRequest.encode(request).finish()));
    const promise = this.rpc.clientStreamingRequest(this.service, "UploadVideo", data);
    return promise.then((data) => UploadVideoResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
