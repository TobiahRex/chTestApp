function editAlbumModalController($scope, $uibModalInstance, editAlbum) {
  console.log('editTenantModalCtrl');
  $scope.album = editAlbum.album;
  console.log('$scope.album: ', $scope.album);
  $scope.submitChanges = () => {
    $uibModalInstance.close($scope.album);
  };
  $scope.cancel = () => $uibModalInstance.dismiss();
}

angular.module('fullStackTemplate').controller('editAlbumModalController', editAlbumModalController);
