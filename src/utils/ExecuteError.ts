export interface IErrorMessage {
  key: string;
  value: string;
}

export interface IExecuteError {
  _message: IErrorMessage;
  status: number;
}

export class ExecuteError extends Error {

  _message: IErrorMessage;

  status: number;

  constructor(error: IExecuteError) {
    super(error._message.value);

    this._message = error._message;
    this.status = error.status;
  }
}