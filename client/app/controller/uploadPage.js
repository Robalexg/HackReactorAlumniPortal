angular.module('reactorlounge.uploadPage', ['ngFileUpload', 'ngImgCrop'])

  .controller('UploadController', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout, $window){
    $scope.creds = {
    bucket: 'reactorlounge',
    access_key: 'AKIAJLCU56S6ZCUJ3MCQ',
    secret_key: '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'
    }

  $scope.upload = function() {
  // Configure The S3 Object 
  AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
  AWS.config.region = 'us-east-1';
  var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
 
  if($scope.croppedDataUrl) {
    var params = { Key: $scope.picFile.name, Body: $scope.croppedDataUrl, ServerSideEncryption: 'AES256' };
    bucket.putObject(params, function(err, data) {
      if(err) {
        // There Was An Error With Your S3 Config
        console.log(err.message);
        return false;
      }
      else if(data){
        // Success!
        $scope.imgUrl = 'reactorlounge.s3.amazonaws.com/' + $scope.picFile.name
        console.log('Upload Done', $scope.imgUrl);
      }
    })
    .on('httpUploadProgress',function(progress) {
          // Log Progress Information
          console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
        });
  }
  else {
    // No File Selected
    alert('No File Selected');
  }
}
  }])



   
