'use strict';

VK.init({
    apiId: 2721918 // ID ������ ��������� VK
});

// ��������� ���������� ����� get ����� ���������� ���
function $_GET(key) { return decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)'))[1]); }

// �������� ��������� ������� ������� � api
var api_result = JSON.parse($_GET('api_result'));
$('.profile').html('<img width="40px" src="' + api_result.response[0].photo_50 + '"/><div>' + api_result.response[0].first_name + '<br/>' + api_result.response[0].last_name + '</div>');

var sendApp = angular.module('sendApp', []);
sendApp.controller('FriendListCtrl', function($scope) {

	$scope.friends = [];
	VK.api('friends.get', {user_id: $_GET('viewer_id'), fields: "photo_50", v: "5.28"}, function(data) {
		if (data.response){
			$scope.$apply ( function () {
				  $scope.friends = data.response.items;
			});
		} else alert(data.error.error_msg);
	});
		
});

var photo = 353958054;

function newPhoto() {
	VK.api('photos.get', {owner_id: "-45653560", album_id: 165477320, count: 1000, v: "5.28"}, function(data) {
		var apiID_index = Math.floor(Math.random() * (data.response.count));
		photo = data.response.items[apiID_index].id; 
		$('.photoimg').html('<div class="imag" style="background-image: url(' + data.response.items[apiID_index].photo_604 + ');"></div>');
	});
}
function send(obj) {
		var id = $('#id', obj).text();
		newPhoto();
		$('.form_send').html('<textarea class="textarea-sty form-control" rows="5" id="textarea">� 23 �������!!!</textarea>');
		$('.form_send').append('<div class="btn-group btn-sty" role="group">'
			+ '<button type="button" class="btn btn-warning" onclick="newPhoto(' + id + ')">������ �����������</button>'
			+ '<button type="button" class="btn btn-success" onclick="sendWallPhotoText(' + id + ', ' + photo + ')">��������� �� ������</button>'
		+ '</div>');
}

function sendWallPhotoText(id, photo_id) {
	VK.api('wall.post', {message: $('#textarea').val(), attachments: 'photo-45653560_' + photo + ', http://vk.com/app2721918_33610634', owner_id: id}, function(data) {
		if (data.error.error_code == 214) VK.callMethod('showRequestBox', id, $('#textarea').val(), $('#textarea').val());
	});
}