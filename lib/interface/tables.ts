export interface CategoryInfo {
  name: string; // 카테고리 명
  parent_name: string; // 상위 카테고리
  use_yn: string; // 사용여부
  create_user: string;
  create_dt: string;
  update_user: string;
  update_dt: string;
}

export interface BookInfo {
  isbn: string; // PK
  writer_id: string; // 저자 id
  translator_id: string; // 역자 id
  category_id: string; // 카테고리 id
  artist_id: string; // 그림 id
  title: string; // 책 제목
  price: number; // 책 가격
  book_description: string; // 책 설명
  publisher: string; // 출판사
  publishing_description: string; // 출판사 설명
  listening_yn: string; // 듣기 기능 유무
  mac_yn: string; // 맥 사용 유무
  window_yn: string; // 윈도우 사용 유무
  android_yn: string; // 안드로이드 사용 유무
  ios_yn: string; // 애플 사용 유무
  file_type: string; // 파일 타입
  file_size: string; // 파일 사이즈
  text_count: string; // 파일 텍스트 길이
  publisher_description: string; // 미사용 (중복으로 보임)
  book_contents: string; // 작품 소개
  score: string; // 점수
  image_path: string; // 책 이미지 경로
  create_user: string;
  create_dt: string;
  update_user: string;
  update_dt: string;
}

export interface BookSeries {
  id: string; // PK
  finish_yn: string; // 완결 유무
  count: number; // 총 권수
  create_user: string;
  create_dt: string;
  update_user: string;
  update_dt: string;
}

export interface WriterInfo {
  name: string; // 저자 이름
  description: string; // 저자 설명
  nationality: string; // 국적
  birth: string; // 생년월일
  education: string; // 학력
  career: string; // 경력
  awards: string; // 수상 이력
  create_user: string;
  create_dt: string;
  update_user: string;
  update_dt: string;
}

export interface TranslatorInfo {
  name: string; // 저자 이름
  description: string; // 저자 설명
  nationality: string; // 국적
  birth: string; // 생년월일
  education: string; // 학력
  career: string; // 경력
  awards: string; // 수상 이력
  create_user: string;
  create_dt: string;
  update_user: string;
  update_dt: string;
}

export interface UserInfo {
  id: number;
  name: string;
}
