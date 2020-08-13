export default interface ISaveChanges {
  hasChanges: boolean;
  saveChanges: Function | null;
  discardChanges: Function | null;
  nextUrl?: string | null;
}
