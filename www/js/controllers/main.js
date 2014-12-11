(function() {
    'use strict';
    var module = angular.module('Main', []);


    module.controller('MainController', function($scope, $http, userData) {
        $scope.userData = userData;
        $scope.isWorking = false;
        $scope.documentacionVehiculo = [];
        $scope.documentacionContratista = [];
        $scope.detallesEmpleado = [];
        $scope.documentacionEmpleado = [];
        $scope.searchResult = [];
        $scope.searchType = '';


        $scope.logout = function() {
                $scope.userData.logout();
                $scope.menu.setMainPage('templates/forms/login.html');
            }
            //--- Search
        $scope.search = function(pTipo, pSearchString) {
            $scope.loading = true;
            $scope.searchType = pTipo;
            ons.navigator.pushPage('templates/pages/listaSearchResult.html');
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=' + $scope.searchType + '&parametro=' + pSearchString + '&cliente=' + $scope.userData.profileData.codigo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: '' //'_method=POST&data[Login][login]=' + $scope.userData.userName + '&data[Login][password]=' + $scope.userData.password + '&',
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpSearchSuccess);
            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpSearchSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.searchResult = data;
        };

        $scope.getDocumentacionVehiculo = function(pVehicleCode) {
            $scope.loading = true;
            ons.navigator.pushPage('templates/pages/listaDocumentacionVehiculo.html');
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=documentacionVehiculo&codigoVehiculo=' + pVehicleCode,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDocumentacionVehiculoSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDocumentacionVehiculoSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.documentacionVehiculo = data;
            console.log(data);
        };

        $scope.getDetallesEmpleado = function(pEmpleadoCodigo) {
            $scope.loading = true;
            ons.navigator.pushPage('templates/pages/detallesPersonal.html');
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=empleadoDetalle&codigoEmpleado=' + pEmpleadoCodigo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDetallesEmpleadoSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpDetallesEmpleadoError);

            var requestDocEmpleados = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=documentacionEmpleado&codigoEmpleado=' + pEmpleadoCodigo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            requestDocEmpleados.success($scope.httpDocumentacionEmpleadoSuccess);

            // Store the data-dump of the FORM scope.
            requestDocEmpleados.error($scope.httpError);
        }

        $scope.httpDocumentacionEmpleadoSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.documentacionEmpleado = data;
            console.log(data);
        };

        $scope.httpDetallesEmpleadoSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.detallesEmpleado = data;
            console.log(data);
        };


        $scope.getDocumentacionContratista = function(pContratistaCode, pDontRedirect) {
            $scope.loading = true;
            if(!pDontRedirect)
            {
                ons.navigator.pushPage('templates/pages/listaDocumentacionContratista.html');
            }
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=documentacionContratista&codigo=' + pContratistaCode,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDocumentacionContratistaSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDocumentacionContratistaSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.documentacionContratista = data;
            console.log(data);
        };




        $scope.getEmpleados = function(pContratistaCode) {
            //http://ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=' + pContratistaCode + '&parametro=',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpGetEmpleadosSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpGetEmpleadosSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.searchResult = data;
            console.log(data);
        }



        $scope.getVehiculos = function(pContratistaCode) {
            //http://ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=vehiculos&codigo=' + pContratistaCode + '&parametro=',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpGetVehiculosSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpGetVehiculosSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.searchResult = data;
            console.log(data);
        }

        $scope.httpError = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.connectionFail = true;
        };

        $scope.getDocumentosRechazados = function(pContratistaCode) {
            //http://ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=documentosRechazados&codigo=' + pContratistaCode,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDocumentosRechazadosSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDocumentosRechazadosSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.searchResult = data;
            console.log(data);
        }

        $scope.getDetallesContratista = function(pContratistaCode) {
            //http://ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=contratistaDetalle&codigo=' + pContratistaCode,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDetallesContratistaSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDetallesContratistaSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.userData.contratistaInfo = data;
            $scope.searchResult = data;
            $scope.getDocumentacionContratista($scope.userData.profileData.codigo, true);
        }

    });

    module.directive('moduleSinConexion', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/sinConexion.html'
        };
    });

    module.directive('moduleLoadingSpinner', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/loadingSpinner.html'
        };
    });
})();
