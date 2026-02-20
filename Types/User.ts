type User = {
  id: string;
  hash: string;
  salt: string;
};

type UserLogin = {
  id: string;
  password: string;
};