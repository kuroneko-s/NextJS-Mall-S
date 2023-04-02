export interface CategoryInfo {
  name: string;
  level: string;
  create_dt: string;
  create_user: string;
  update_dt: string;
  update_user: string;
  use_yn: string;
  parent: string;
}

export interface BookInfo {
  isbn: string;
  writer_id: string;
  category_id: string;
  translator_id: string;
  artist_id: string;
  title: string;
  price: number;
  book_description: string;
  publisher: string;
  publishing_description: string;
  listening_yn: string;
  pc_yn: string;
  mac_yn: string;
  window_yn: string;
  android_yn: string;
  linux_yn: string;
  ios_yn: string;
  file_type: string;
  file_size: string;
  text_count: string;
  publisher_description: string;
  book_contents: string;
  score: number;
  series_yn: string;
