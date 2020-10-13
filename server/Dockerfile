FROM golang:latest
RUN mkdir -p /go/src/timememo
RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/gin-gonic/gin
RUN go get github.com/lib/pq
WORKDIR /go/src/timememo/server
ADD . /go/src/timememo

CMD ["go", "run", "server.go"]

