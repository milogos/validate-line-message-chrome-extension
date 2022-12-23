// エラーのときの型(detailsの中身)
export interface ValidateErrorDetail {
  message: string;
  property: string;
}
// エラーのときの型
export interface ValidateError {
  message: string;
  details: ValidateErrorDetail[];
}

// popupのフォームデータ
export interface FormData {
  token: string;
  body: string;
}
