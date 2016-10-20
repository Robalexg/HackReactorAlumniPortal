angular.module('reactorlounge.uploadPage', ['ngFileUpload', 'ngImgCrop'])

  .controller('UploadController', ['$scope', 'Upload', '$timeout', 'generalFeed', function($scope, Upload, $timeout, generalFeed){
    $scope.creds = {
      bucket: '',
      access_key: '',
      secret_key: ''
    }

    $scope.upload = function() {
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
      AWS.config.region = 'us-east-1';
      var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
      if($scope.croppedDataUrl) {
        var params = { Key: $scope.picFile.name, Body: $scope.croppedDataUrl, ServerSideEncryption: 'AES256' };
        bucket.putObject(params, function(err, data) {
          if(err) {
            console.log(err.message);
            return false;
          }
          else if(data){
            $scope.imgUrl = 'reactorlounge.s3.amazonaws.com/' + $scope.picFile.name
            console.log('Upload Done', $scope.imgUrl);
          }
        })
        .on('httpUploadProgress',function(progress) {
              console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
      }
      else {
        console.log('No File Selected');
      }
    }
  }])



   
