# 간단한 color picker 웹 페이지 입니다.

## 동작 화면  
![동작화면](./동작화면.gif)

이미지를 복사하여 Ctrl + v 또는 아래의 붙여넣기 버튼을 통해 이미지를 붙여넣고 마우스로 클릭하여 해당 픽셀의 색을 추출하는 Color Picker 웹 페이지 입니다.

<br/>

**작업시간** : 약 _7시간_  
**링크** : [서비스 링크](https://sad-heyrovsky-5a07d8.netlify.app)  
(netify 서비스를 이용하여 배포하였음)
<br/><br/>

## 개요
- 서비스 : 스포이드 기능 웹 페이지
- 개발 환경 : visual code
- 개발 언어 : html , css, javascript
- 기타 환경 : git
- 외부 지원 : -

<br/>

## 주요 기능
- Ctrl + v를 이용한 붙여넣기
- 버튼을 이용한 클립보드 접근 및 붙여넣기
- drag to scroll (마우스를 클릭한 상태에서 움직이면 그 방향으로 슬라이드)
- 클릭시 해당 영역 색 추가
- 추가된 색 클릭시 hex코드 클립보드에 복사
- 추가된 색 더블 클릭시 색 삭제

<br/>

## 내용
- navigator.clipboard 를 이용한 클립보드 접근
- canvas를 이용한 해당 좌표 색 추출