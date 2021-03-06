package study.spring.goodspring.model;

import com.google.gson.Gson;

import lombok.Data;
import study.spring.goodspring.helper.UploadItem;

@Data
public class CrewPostCmt {

	private int comment_no; //댓글 번호
	private String comment_create_datetime; // 댓글 생성일자
	private String comment_text; // 댓글 내용
	private int user_info_user_no; // 작성자 번호
	private int crew_post_post_no; // 게시물 번호
	private String comment_usernick; // 작성자 닉네임
	
	
	//Member 객체
	private int user_no; //(사용자 일련번호)
	private String user_id;// (사용자 ID)
	private String user_name;// (사용자 이름)
	private String user_nick;// (사용자 닉네임)
	private String user_pw;// (비밀번호)
	private String gender;// (성별)
	private String address1;// (주소)	
	private String address2;// (주소)	
	private String post;// (우편번호)
	private String tel;// (연락처)
	private String email;// (이메일)
	private UploadItem user_photo;// (프로필 사진)
	private boolean user_admin;// (관리자 권한)
	private String create_datetime;// (가입일자)
	private String edit_datetime;// (수정일자)
	private String user_out;
	
	//Join CrewPost컬럼
	private int post_no; //게시물 번호
	private int post_like; // 게시물 좋아요 수
	private String post_crew; // 크루 이름
	private String post_createdate; // 게시물 생성일자
	private String post_editdate; // 게시물 수정 일자
	private String post_title; // 게시물 제목
	private String post_content; // 게시물 내용
	private String post_img; // 게시물 사진
	private String post_hits; // 게시물 조회수
	private int comment; //해당 게시물의 댓글 수
	
    /** 프로필사진 정보{json=UploadItem}, IS NULL */
    public void setPhotoJson(String user_photo) {
        this.user_photo = new Gson().fromJson(user_photo, UploadItem.class);
    }

    /** 프로필사진 정보{json=UploadItem}, IS NULL */
    public void setUser_photo(UploadItem user_photo) {
        this.user_photo = user_photo;
    }

    /** 프로필사진 정보{json=UploadItem}, IS NULL */
    public UploadItem getUser_photo() {
        return this.user_photo;
    }

    /** 프로필사진 정보{json=UploadItem}, IS NULL */
    public String getPhotoJson() {
        return new Gson().toJson(this.user_photo);
    }
}
