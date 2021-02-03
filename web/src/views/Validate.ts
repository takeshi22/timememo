export const emailValidation = (email: string): string => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if(!regex.test(email)) return '正しい形式でメールアドレスを入力してください。';
}

export const passwordValidation = (password: string) => {
  if(password.length < 8) return '8文字以上入力してください。';
}

export const required = (value: string): string => {
  if (!value) {
    return "必須項目です。";
  }
};
