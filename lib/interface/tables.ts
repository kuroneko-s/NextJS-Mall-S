export interface CategoryInfo {
  name: string;
  parent_name: string;
  use_yn: string;
  create_user: string;
  create_dt: string;
  update_user: string;
  update_dt: string;
}

export interface BookInfo {
  isbn: string;
  writer_id: string;
  translator_id: string;
  category_id: string;
  artist_id: string;
  title: string;
  price: number;
  book_description: string;
  publisher: string;
  publishing_description: string;
  listening_yn: string;
  mac_yn: string;
  window_yn: string;
  android_yn: string;
  ios_yn: string;
  file_type: string;
  file_size: string;
  text_count: string;
  publisher_description: string;
  book_contents: string;
  score: string;
  image_path: string;
  create_user: string;
  create_dt: string;
  update_user: string;
  update_dt: string;
}

export interface BookSeries {
  id: string;
  finish_yn: string;
  count: number;
  create_user: string;
  create_dt: string;
  update_user: string;
  update_dt: string;
}
