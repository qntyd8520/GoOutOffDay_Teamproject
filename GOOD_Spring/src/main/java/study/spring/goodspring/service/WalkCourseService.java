package study.spring.goodspring.service;

import java.util.List;

import study.spring.goodspring.model.WalkCourse;

/** 코스목록 데이터 관리 기능을 제공하기 위한 Service계층 */
public interface WalkCourseService {
	
	/**
	 * 걷기코스 목록 조회
	 * @return 조회 결과에 대한 컬렉션
	 * @throws Exception
	 */
	public List<WalkCourse> getWalkCourseList(WalkCourse input) throws Exception;
	
	
	/**
	 * [페이지네이션에 필요]
	 * 데이터가 저장되어 있는 갯수 조회
	 * @return int
	 * @throws Exception
	 */
	public int getWalkCourseCount(WalkCourse input) throws Exception;
}
