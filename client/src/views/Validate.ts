const emailValidation = (email: string): string => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if(!email) return 'メールアドレスを入力してください。';
  if(!regex.test(email)) return '正しい形式でメールアドレスを入力してください。';

  return '';
}

const passwordValidation = (password: string) => {
  if(!password) return 'パスワードを入力してください。';
  if(password.length < 8) return '8文字以上入力してください。';

  return '';
}

class Validation {
  static formValidate = (type: string, value: string) => {
    switch(type) {
      case('email'):
       return emailValidation(value);
      case('password'):
        return passwordValidation(value);
    }
  };
}

export default Validation;