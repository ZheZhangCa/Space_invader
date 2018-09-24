            var GET_MESSAGE_SERVICE = 'http://playdoh.algonquincollege.com/lts/mike/WebServices/MessageService.asmx/GetScores';
            var SEND_MESSAGE_SERVICE = 'http://playdoh.algonquincollege.com/lts/mike/WebServices/MessageService.asmx/SendScores';


            function getMessages() {
                $.ajax({
                    url: GET_MESSAGE_SERVICE,
                    type: 'GET',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    cache: false,
                    success: onGetMessageSuccess,
                    error: onAjaxError
                });
            }

            function onAjaxError(jqXHR, status, errorThrown) {
                $("#con_detail .all_scores").html(status + ": " + errorThrown + "<br><br>" + jqXHR.
				 responseText);
            }

            function onGetMessageSuccess(data) {
                var messageList = data.d,
                    innerHTml = '';
                $('foot').empty();
                for (var i in messageList) {
                    innerHTml += '<dl><dt> eee name:' + messageList[i].name + '</dt><dd>　SCORE:' + messageList[i].score + '</dt></dl>'
                }
                $('#con_detail .all_scores').html(innerHTml);
            }
            function sendMessage() {
                var msg = $('#score').html();

                if (msg.length > 0) {
                    $.ajax({
                        url: SEND_MESSAGE_SERVICE,
                        type: 'POST',
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({ name: 'game', score: parseInt('#score').val }),
                        success: onGetMessageSuccess, //Returns the list of messages 
                        error: onAjaxError
                    });
                } 
            }// JavaScript Document