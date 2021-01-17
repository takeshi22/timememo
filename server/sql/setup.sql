CREATE TABLE IF NOT EXISTS schedules (
  id serial primary key
  title varchar(255)
  content text
  day date
  start_time time
  end_time time
  created_at timestamp not null
  updated_at timestamp not null
)