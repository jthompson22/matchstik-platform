import ISaveChanges from '../interfaces/ISaveChanges';

const saveChangesState = (): ISaveChanges => {
  return {
    hasChanges: false,
    saveChanges: null,
    discardChanges: null,
    nextUrl: null,
  };
}

export default saveChangesState;
