(function () {
    'use strict';
    var module = angular.module('Contact', []);

    module.controller('ContactController', function ($scope) {

        $scope.askCallSoporte = function (cod_sucursal) {
            try {
                alert(navigator.notification);
                navigator.notification.confirm(
                    '¿Desea llamar a la sucursal?', // message
                    $scope.onConfirm, // callback to invoke with index of button pressed
                    'Contacto', // title
                    ['Llamar ahora', 'Tal vez mas tarde'] // buttonLabels
                );
            } catch (e) {
                alert(e);
            }
        }

        $scope.onConfirm = function (buttonIndex) {
            if (buttonIndex == 1) {
                $scope.callContacto();
            }
        }

        $scope.callContacto = function () {
            phonedialer.dial(
                "01148335900",
                function (err) {
                    if (err == "empty") alert("Unknown phone number");
                    else alert("Dialer Error:" + err);
                },
                function (success) {
                    //alert('Dialing succeeded');
                }
            );
        }
        $scope.emailContacto = function () {
            var link = "mailto:contratistas@ehslatam.com" + "?subject=" + escape("Consulta") + "&body=" + escape("Estimado equipo de soporte:\n");
            window.plugin.email.open({
                to:          ['contratistas@ehslatam.com'], // email addresses for TO field
                cc:          [], // email addresses for CC field
                bcc:         [], // email addresses for BCC field
                attachments: [], // paths to the files you want to attach or base64 encoded data streams
                subject:    "Solicitud de soporte", // subject of the email
                body:       "Estimado equipo de soporte:<br>", // email body (could be HTML code, in this case set isHtml to true)
                isHtml:    true, // indicats if the body is HTML or plain text
            });
        }


    });
})();