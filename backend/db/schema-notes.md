Why UUID instead of auto-incrementing integers?
    *Because they are safer and more scalable in modern applications.

Why TIMESTAMPTZ instead of TIMESTAMP?
    *Because TIMESTAMPTZ means timestamp with time zone while TIMESTAMP means without time zone.
    *also because  modern apps usually deal with users,servers and APIs in different time zones.

What does the CHECK (status IN (...)) constraint buy you over just a comment?
    *Check constraint help the developer to protect there data integrity and without constraints bad data cam enter into there database.