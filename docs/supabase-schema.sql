create table if not exists consultation_orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  contact text not null,
  child_age text,
  problem_summary text not null,
  source text default 'website',
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists case_library (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tags text[] not null default '{}',
  audience text,
  summary text not null,
  content_md text,
  is_public boolean default true,
  created_at timestamptz default now()
);

create table if not exists ai_conversations (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  rating integer,
  lead_intent text,
  created_at timestamptz default now()
);

create index if not exists ai_conversations_created_at_idx on ai_conversations (created_at desc);
create index if not exists consultation_orders_created_at_idx on consultation_orders (created_at desc);
