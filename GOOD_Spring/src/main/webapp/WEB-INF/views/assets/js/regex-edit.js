 function getContextPath() {
      var hostIndex = location.href.indexOf(location.host)
            + location.host.length;
      var contextPath = location.href.substring(hostIndex, location.href
            .indexOf('/', hostIndex + 1));
      return contextPath;
   }
		function execDaumPostcode() {
			new daum.Postcode(
					{
						oncomplete : function(data) {
							// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

							// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
							// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
							var roadAddr = data.roadAddress; // 도로명 주소 변수
							var extraRoadAddr = ''; // 참고 항목 변수

							// 법정동명이 있을 경우 추가한다. (법정리는 제외)
							// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
							if (data.bname !== ''
									&& /[동|로|가]$/g.test(data.bname)) {
								extraRoadAddr += data.bname;
							}
							// 건물명이 있고, 공동주택일 경우 추가한다.
							if (data.buildingName !== ''
									&& data.apartment === 'Y') {
								extraRoadAddr += (extraRoadAddr !== '' ? ', '
										+ data.buildingName : data.buildingName);
							}
							// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
							if (extraRoadAddr !== '') {
								extraRoadAddr = ' (' + extraRoadAddr + ')';
							}

							// 우편번호와 주소 정보를 해당 필드에 넣는다.
							document.getElementById('postcode').value = data.zonecode;
							document.getElementById("addr1").value = roadAddr;


							

							
						}
					}).open();
		}
$(function(){
	
		/**유효성 검사 추가 함수 */
	$.validator.addMethod("kor", function(value, element){
		return this.optional(element) 
		|| /^[가-힣]*$/i.test(value);
	});
	
	$.validator.addMethod("phone", function(value, element){
		return this.optional(element) 
		|| /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/i.test(value) 
		|| /^\d{2,3}\d{3,4}\d{4}$/i.test(value);
	});
	$.validator.addMethod("nick", function(value, element){
		return this.optional(element) 
		|| /^[ㄱ-ㅎ가-힣a-zA-Z0-9~!@#$%^&*()-_+|<>?:{}]*$/i.test(value);
	});
	
	/** form태그에 부여한 id속성에 대한 유효성 검사 함수 호출 */
		$("#edit_form").validate({
			/**입력검사 규칙 */
				//[비밀번호] 필수 + 글자수 길이 제한
				user_pw: {required: true, minlength: 4, maxlength: 30},
				//[비밀번호 확인] 필수 + 특정 항목과 일치 (user_pw로 연결)
				user_pw_re: {required: true, equalTo: "#user_pw"},
				//[이메일] 필수 + 이메일 형식 일치 필요
				email: {
                required: true, email: true, maxlength: 255,
                remote : {
                    url : getContextPath() + '/mainPage/join/email_unique_check',
                    type : 'post',
                    data : {
                        email : function() {
                            return $("#email").val();
	                        }
    	                }
  	              }
  	          },
				//[연락처] 필수
				tel: {required: true, minlength: 9, maxlength: 11},
				//[우편번호] 필수
				postcode: {required: true},
				// [도로명주소] 필수
     		    addr1: 'required',           		
				//[나머지주소] 필수 + 한글, 숫자, 특수문자, 공백, 영어 조합 허용
				addr2: {required: true},


			/**규칙이 맞지 않을 경우의 메시지 */
			messages: {
				
				user_pw: {
					required: "비밀번호를 입력하세요.",
					minlength: "비밀번호는 최소 {0}글자 이상 입력하셔야 합니다.",
					maxlength: '아이디는 최대 {0}글자까지 가능합니다.'
				},
				user_pw_re: {
              		required: '비밀번호 확인값을 입력하세요.',
                	equalTo: '비밀번호 확인이 잘못되었습니다.'
         		},
          		email: {
                    required: '이메일을 입력하세요.',
                    email: '이메일 형식이 잘못되었습니다.',
                    maxlength: '이메일은 최대 {0}글자까지 가능합니다.',
                    remote: '이미 사용중인 이메일 입니다.'
                },
				tel: {
                    required: '연락처를 입력하세요.',
                    phone: '연락처 형식이 잘못되었습니다.',
                    minlength: '연락처는 최소 {0}글자 이상 입력하셔야 합니다.',
                    maxlength: '연락처는 최대 {0}글자까지 가능합니다.'
          		},
				postcode: {
					required: '우편번호를 검색하세요.'
				},
				addr1: {
					required: '도로명 주소를 입력하세요.'
				},
				
				addr2:{
					required: '나머지 주소를 입력하세요.',
				},
				
			}
		});// end validate()
		
		$('#edit_form').ajaxForm({
        // submit 전에 호출된다.
        beforeSubmit: function(arr, form, option) {
            // validation 플러그인을 수동으로 호출하여 결과를 리턴한다.
            // 검사규칙에 위배되어 false가 리턴될 경우 submit을 중단한다.
            return $(form).valid();
        },
		success: function(json) {
            swal('알림', '정보수정이 완료되었습니다.', 'success').then(function(result) {
                window.location = getContextPath() + '/myPage/myPage_index.do';
            });
        },error: function(data, status, error){
			var error_msg =data.responseJSON.rt
				swal({
					title : "에러",
					text :error_msg,
					type : "error"
					})
			return false; // <-- 실행 중단
		}
    }); // end ajaxForm

    $("#email_unique_check").click(function(e) {
        const email = $("#email").val();

        if (!email) {
            swal('알림', '이메일을 입력하세요.', 'warning');
            return;
        }

        $.post(getContextPath() + '/myPage/myPage_accountEdit/email_unique_check_jquery', {
            email: email
        }, function(json) {
            swal('확인', '사용가능한 이메일 입니다.', 'success');
        });
    });
})