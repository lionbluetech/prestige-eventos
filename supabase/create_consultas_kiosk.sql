-- Tabla para guardar cada consulta que hace un cliente en el kiosco.
-- Ejecutar en Supabase SQL Editor.

create table if not exists consultas_kiosk (
  id uuid primary key default gen_random_uuid(),
  event_type text,
  guests int,
  mujeres int,
  hombres int,
  consumo text,
  cocktails jsonb,
  client_name text,
  client_phone text,
  event_date date,
  total_tragos int,
  created_at timestamptz not null default now()
);

alter table consultas_kiosk enable row level security;
create policy "Insertar consultas" on consultas_kiosk for insert with check (true);
create policy "Leer consultas logueados" on consultas_kiosk for select using (auth.uid() is not null);
