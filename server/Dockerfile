FROM golang:latest
RUN mkdir -p /go/src/timememo
# RUN go get -u github.com/gorilla/mux
# RUN go get -u github.com/gin-gonic/gin
# RUN go get github.com/lib/pq
# RUN go get -u gorm.io/gorm
RUN go get github.com/pilu/fresh

WORKDIR /go/src/timememo/server
ADD . /go/src/timememo
ENV GO156MODULE=on

CMD ["fresh"]
# CMD ["go", "run", "server.go"]