<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro de usuario</title>
  <link rel="stylesheet" href="../css/bootstrap.min.css.map">
	<link rel="stylesheet" href="../css/bootstrap.css.map">
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/registro.css">
  <link rel="icon" href="../img/Icono_Notek.png">
  <script src="../js/jquery-3.6.0.min.js"></script>
</head>

<body>
  <div class="d-flex align-items-center">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center mb-2 mt-2">
        <a href="../index.html"><img src="../img/Logo_Notek.png" alt="Logo_Notek" id="logo"></a>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card bg-dark text-white mb-2" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Crear una cuenta</h2>
              <form>
                <div class="form-outline mb-2">
                  <p class="form-label">ID de la cuenta</p>
                  <input type="text" id="idRegistro" class="form-control form-control-sm" />
                  <p class="errores"></p>
                </div>
                <div class="form-outline mb-2">
                  <p class="form-label">Nombre</p>
                  <input type="text" id="nombreRegistro" class="form-control form-control-sm" />
                  <p class="errores"></p>
                </div>

                <div class="form-outline mb-2">
                  <p class="form-label">Apellidos</p>
                  <input type="text" id="apellidosRegistro" class="form-control form-control-sm" />
                  <p class="errores"></p>
                </div>

                <div class="form-outline mb-2">
                  <p class="form-label">Correo electrónico</p>
                  <input type="text" id="correoRegistro" class="form-control form-control-sm" />
                  <p class="errores"></p>
                </div>

                <div class="form-outline mb-2">
                  <p class="form-label">Contraseña</p>
                  <input type="password" id="contraseniaRegistro" class="form-control form-control-sm" />
                  <p class="errores"></p>
                </div>

                <div class="d-flex justify-content-center mt-3">
                  <button id="botonRegistro" class="form-control w-auto btn btn-outline-light me-3">
                    Registrarse
                  </button>
                </div>
                <p class="text-center text-muted mt-3 mb-0">¿Ya tienes una cuenta? <a href="./iniciarSesion.php"
                    class="fw-bold text-info"><u>Inicia sesión</u></a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script type="module" src="../js/registro.js"></script>
</body>

</html>