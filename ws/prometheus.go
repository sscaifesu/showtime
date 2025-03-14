package ws

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	roomsCreatedTotal = promauto.NewCounter(prometheus.CounterOpts{
		Name: "showtime_room_created_total",
		Help: "Number of created rooms",
	})
	roomsClosedTotal = promauto.NewCounter(prometheus.CounterOpts{
		Name: "showtime_room_closed_total",
		Help: "Number of closed rooms",
	})
	usersJoinedTotal = promauto.NewCounter(prometheus.CounterOpts{
		Name: "showtime_user_joined_total",
		Help: "Number of users which joined a room",
	})
	usersLeftTotal = promauto.NewCounter(prometheus.CounterOpts{
		Name: "showtime_user_left_total",
		Help: "Number of users which left a room",
	})
	sessionsCreatedTotal = promauto.NewCounter(prometheus.CounterOpts{
		Name: "showtime_session_created_total",
		Help: "Number of created sessions",
	})
	sessionsClosedTotal = promauto.NewCounter(prometheus.CounterOpts{
		Name: "showtime_session_closed_total",
		Help: "Number of closed sessions",
	})
)
