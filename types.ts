export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AddItem: undefined;
  ItemDetail: { item: any };
  InventoryList: { refresh?: boolean } | undefined;
  EditItem: { item: any };
};
