export enum OPERATION_TYPE {
  ADD_GROUP = 'ADD_GROUP',
  EDIT_GROUP = 'EDIT_GROUP',
}

export type ModalFormContextData<T = OPERATION_TYPE> = T extends OPERATION_TYPE.ADD_GROUP
  ? {
      type: OPERATION_TYPE.ADD_GROUP;
    }
  : {
      defaultName: string;
      id: string;
      type: OPERATION_TYPE.EDIT_GROUP;
    };
