export default interface IConfirmActionState {
  title?: string;
  message: string;
  confirm: Function | null;
  cancel: Function | null
};
