-- Usuarios que ya existían antes de esta funcionalidad (creados en cualquier
-- momento previo a que esta migración corra en cada ambiente) no deben verse
-- forzados a /accept-terms como si acabaran de registrarse: solo los
-- registros nuevos, creados después de este punto, arrancan con
-- justRegistered = true (ver src/lib/auth.ts y api/auth/register/route.ts).
UPDATE "users" SET "justRegistered" = false;
