-- Run this once against your Postgres database (e.g. in the Neon SQL editor)
-- before your first deploy. It creates the one table the site needs.

create table if not exists rsvps (
  id            serial primary key,
  full_name     text not null,
  email         text not null,
  attending     boolean not null,
  guest_count   integer not null default 1,
  song_request  text,
  message       text,
  created_at    timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx on rsvps (created_at desc);
