<<<<<<< HEAD
angular.module("vuelos", [])
	.controller("busqueda", function ($scope) {
	$scope.algo = "";
})
=======
angular.module('myApp', [])
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

		}

		$scope.cambioHora = function (horaJ) {
			var fecha = new Date(horaJ);
			//return tempsin[0];
			return fecha + "";
		};

	});
>>>>>>> jesus
