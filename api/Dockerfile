FROM golang:1.23.1-alpine3.20 as builder

WORKDIR /go/src/app

ENV GO111MODULE=on

RUN go get github.com/cespare/reflex # for hot reloading

COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .

RUN go build -o ./run .

FROM alpine:3.20
RUN apk --no-cache add ca-certificates

COPY --from=builder /go/src/app/run .
EXPOSE 8080
CMD ["./run"]
