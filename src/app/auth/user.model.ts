export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiresDate: Date
  ) {}

  get token() {
    if (!(new Date() > this._tokenExpiresDate) || !this._token) {
      return null;
    }
    return this._token;
  }
}
