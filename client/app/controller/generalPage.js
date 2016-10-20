angular.module('reactorlounge.generalPage', ['angularMoment', 'ngFileUpload', 'ngImgCrop'])

.controller('GeneralFeedController', ['$scope', 'generalFeed', 'moment', 'Upload', '$timeout', function ($scope, generalFeed, moment, Upload, $timeout ) {
   $scope.data = {}
   $scope.upload = true;
  // $scope.data.msgs = [{userId: 'Christina', created_at: 'October 15', content: 'This is great'}, {name: 'Robert', date: 'October 15', message: 'Im a genius'}, {name: 'Kendrick', date: 'October 15', message: 'I frequent Youtuber'}, {name: 'Tulasi', date: 'October 15', message: 'Im awesome'}];
  $scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();

    var initialMsgs = function(){
    generalFeed.getMsg()
    .then(function(msg){
     $scope.data.msgs = msg;
    })
    .catch(function (error) {
      console.error(error);
    });
  }

//post messages on submit, clear out msg submit field & make a call to initialmsg to fetch msgs
  $scope.postMsg = function(){
    generalFeed.addMsg($scope.msg, $scope.imgUrl)
    .then(function(){
      $scope.msg=null;
      initialMsgs()
    })
    .catch(function (error) {
      console.error(error);
    });
  }

//your private s3 credientials, do not Git commit these 
  $scope.creds = {
      bucket: 'reactorlounge',
      access_key: '',
      secret_key: ''
    }

    $scope.upload = function() {
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
      AWS.config.region = 'us-east-1';
      var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
      if($scope.picFile) {
        var params = { Key: $scope.picFile.name, Body: $scope.picFile, ServerSideEncryption: 'AES256' };
        bucket.putObject(params, function(err, data) {
          if(err) {
            console.log(err.message);
            return false;
          }
          else if(data){
            $scope.imgUrl = 'https://reactorlounge.s3.amazonaws.com/' + $scope.picFile.name
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

//gets messages and comments when general is loaded
 initialMsgs();

}]);

  

  // var initialCmts = function(){
  //   generalFeed.getCmt()
  //   .then(function(cmt){
  //     $scope.data.cmts = cmt;
  //     console.log("comments", $scope.data.cmts);
  //   })
  //   .catch(function(err){
  //     console.log('this is a comment error', err);
  //   });
  // }

  // $scope.postCmt = function(){
  //   console.log('these are thecomments', $scope.cmt)
  //   generalFeed.addCmt($scope.cmt)
  //   .then(function(){
  //     $scope.comment=null;
  //     initialCmts()
  //   })
  //   .catch(function(err){
  //     console.log('this is a post comment error', err);
  //   })
  // }
 // initialCmts();
