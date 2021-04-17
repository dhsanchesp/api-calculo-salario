export default class HttpResponseMock {
    private _data: object;
    private _statusCode: number;

    send(data: object): HttpResponseMock {
      this._data = data;
      return this;
    }

    status(statusCode: number): HttpResponseMock {
      this._statusCode = statusCode;
      return this;
    }

    get statusCode(): number {
      return this._statusCode;
    }

    get data(): object {
      return this._data;
    }
  }