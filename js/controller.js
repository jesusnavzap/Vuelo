angular.module('myApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'customersCtrl',
                templateUrl: 'vistas/buscadorVuelos.html'
            })
            .when('/view/:vueloSeleccionado', {
                controller: 'vueloCtrl',
                templateUrl: '/vistas/vueloView.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('customersCtrl', function ($scope, $http) {

        $scope.Buscarvuelos = function (origen, destino, salida, llegada) {
            $http.get("js/vuelos.json").then(function (response) {
                $scope.myData = response.data.vuelos;

            });
        };
        $scope.getTotalVuelos = function () {
            return $scope.myData.length;
        };

        $scope.formatearFecha = function (fecha) {

            if (fecha != null) {
                var d = new Date(fecha),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [year, month, day].join('-');
            }

        };

        $scope.cambioHora = function (horaJ) {
            var fecha = new Date(horaJ);
            //return tempsin[0];
            return fecha + "";
        };

        $scope.seleccionarVuelo = function (vuelo) {
            console.log(vuelo);
        }

    }).controller('vueloCtrl', function ($scope, $routeParams) {

            $scope.vueloSelec = JSON.parse($routeParams.vueloSeleccionado);
    
            $scope.numeroDeBilletes = 1;
            
            $scope.addBillete = function(val) {
                
                $scope.numeroDeBilletes+=val;
                
                if($scope.numeroDeBilletes < 1){
                    $scope.numeroDeBilletes = 1;
                }
            }

            $scope.opcionesVuelo = [{
                tipo: "Economy",
                precio: $scope.vueloSelec.economy
            }, {
                tipo: "Optima",
                precio: $scope.vueloSelec.optima
            }, {
                tipo: "Bussiness ",
                precio: $scope.vueloSelec.bussiness
            }];

            $scope.opcionesIdaVuelta = [{
                    tipo: "Ida",
                    valor: 1
                }, {
                    tipo: "Ida y vuelta",
                    valor: 2
                }];

        console.log($scope.opcionesVuelo);

        $scope.formatearFecha = function (fecha) {

                    if (fecha != null) {
                        var d = new Date(fecha),
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear(),
                            hour = d.getHours(),
                            minutes = d.getMinutes();

                        if (month.length < 2)
                            month = '0' + month;
                        if (day.length < 2)
                            day = '0' + day;

                        var horaTotal = [day, month, year].join('-') + ", a las " + [hour, minutes].join(':')
                        return horaTotal;
                    }

        };
        
        $scope.getPrecioFinal = function(){
            if ($scope.claseSelec != null){
                return $scope.claseSelec.precio * $scope.idaVuelta.valor * $scope.numeroDeBilletes;
            }
        }
            });
