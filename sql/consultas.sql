SELECT TOP (1000) [ID]
      ,[Nombre]
      ,[Apellidos]
      ,[Correo]
      ,[Contrasena]
      ,[ID_Usuario]
  FROM [Notek].[dbo].[Usuarios]
  INSERT into Usuarios(Nombre,Apellidos,Correo,Contrasena,ID_Usuario) 
  VALUES ('David','Manrique','davidmanrique15@gmail.com','cocaine39','davman15');