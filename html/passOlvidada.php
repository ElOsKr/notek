<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer contraseña</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css.map">
	<link rel="stylesheet" href="../css/bootstrap.css.map">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/passOlvidada.css">
    <link rel="icon" href="../img/Icono_Notek.png">
    <link rel="stylesheet" href="../css/animate.css">
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <div class="d-flex align-items-center">
        <div class="container cajaPrincipal">
            <div class="d-flex justify-content-center align-items-center mb-2">
                <a href="../index.html"><img src="../img/Logo_Notek.png" alt="Logo_Notek" id="logo"></a>
            </div>
            <div class="row justify-content-center align-items-center h-100">
                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card bg-dark text-white mb-2" style="border-radius: 15px;">
                        <div class="card-body p-5">
                            <h2 class="text-center mb-5">Restablecer contraseña de la cuenta</h2>
                            <form>
                                <div class="form-outline mb-4">
                                    <p class="form-label">Correo electrónico de la cuenta</p>
                                    <input type="text" id="idRegistro" class="form-control form-control-lg" />
                                </div>
                                <div class="d-flex justify-content-center">
                                    <button id="botonCodigoPass" class="form-control w-auto btn btn-outline-light me-3">
                                        Enviar Código
                                    </button>
                                </div>
                                <p class="text-center text-muted mt-3 mb-0">¿Ya tienes una cuenta? <a
                                        href="./iniciarSesion.php" class="fw-bold text-info"><u>Inicia sesión</u></a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="../js/passOlvidada.js"></script>
</body>

</html>