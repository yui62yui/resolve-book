# 고민해결책 Resolve-Book
<br>

## 📓 프로젝트 소개

*고민을 작성하면 조언을 명언으로 제공 받을 수 있는 사이트 입니다. <br>커뮤니티 페이지에서는 본인의 고민 뿐만 아니라, 타인의 고민과 그에 대한 해결책(조언)을 보고 공감할 수 있습니다. 또한 마이페이지에서 자신의 고민을 모아볼 수 있으며, 타인의 고민글 중 마음에 드는 글을 보관하여 추후에 다시 볼 수 있습니다. ‘고민 사이트’의 취지에 맞게 모든 글은 익명으로 보관, 관리됩니다.*
<br>
<br>
(미리보기 영상 업로드 예정)
<br>
<br>

## ⏱️ 개발 기간

23.08.07 - 23.08.14
<br>
<br>

## 🗝️ 주요 기능

- **로그인/회원가입** : *firebase에서 제공하는 이메일 방식과 구글, 깃허브, 페이스북을 연결하여 간편하게 로그인 할 수 있도록 합니다.*
- **조언(명언) 불러오기** : *PageFlip 라이브러리와 명언 API를 이용해, 고민을 입력하면 조언(명언)을 랜덤으로 불러옵니다.*
- **글 보관함** : *내가 쓴 고민글과 조언들, 북마크한 글을 보여주고 관리하는 페이지 입니다.*
- **커뮤니티** : *내 고민글과 함께 다른 이들의 고민을 한눈에 볼 수 있는 리스트 페이지입니다.*
- **카드 상세보기** : *섬네일 카드를 클릭할 시, 해당 고민에 매칭된 조언 글의 상세보기가 가능하고 공감 버튼과 북마크 기능을 제공합니다.*
- **공감하기** : *이모지 공감 버튼을 클릭할 시, 공감 숫자가 카운트 되는 것을 볼 수 있습니다.*
- **북마크** : *북마크 기능으로 다른 이의 글을 저장할 수 있고 자신의 글 보관함에서 확인할 수 있습니다.*
- **무한스크롤** : *커뮤니티 페이지에 저장된 글들을 페이지 아래로 스크롤하면 자동적으로 추가 데이터를 불러옵니다.*
  <br>
  <br>

## 🤼‍♀️ 멤버 구성

- 팀장 조유이 : *글 보관함 페이지 / 헤더* 
- 팀원 손형정 : *글 작성 / 조언(명언) 불러오기*
- 팀원 이소율 : *로그인,회원가입 / 커뮤니티 무한스크롤*
- 팀원 최수아 : *커뮤니티 페이지 / 무한스크롤*
  <br>
  <br>

## ⚙️ 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<br>
- Jotai
- Json-server
- axios
- Kadvice (명언 API)
<br>

## 🎬 데모 영상

(영상 업로드 예정)
<br>
<br>

## 🥊 트러블 슈팅

#### React PageFlip 라이브러리 이슈

- 현상 : React PageFlip 컴포넌트 내부에 input 태그 삽입시 사용자가 글자 하나를 입력하면 포커스가 사라지는 현상
- 원인 : React PageFlip 라이브러리의 버그
- 해결책 : React PageFlip 컴포넌트 외부로 input 태그를 배치하여 라이브러리의 영향을 받지 않도록 처리

#### Jotai 렌더링 이슈

- 현상 : 컴포넌트 안에 컴포넌트가 있고, Jotai로 데이터를 함께 구독하고 있음에도 한 컴포넌트만 랜더링이 일어나고, 나머지 페이지는 랜더링이 일어나지 않음
- 원인 : 같이 jotai 로 데이터를 구독하고 있긴 하지만, 즉각적으로 랜더링이 일어나지 않음을 console.log를 찍어봄으로서 확인함.
- 해결책 : useEffect의 의존성배열에 jotai의 데이터를 넣어줌으로서, 데이터에 변화가 있을 때마다 랜더링이 일어나도록 함.

