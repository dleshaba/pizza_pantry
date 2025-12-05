// export type RootStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   InventoryList: undefined;
//   AddItem: { refresh?: () => Promise<void> };
//   EditItem: { item: any; refresh?: () => Promise<void> };
//   ItemDetail: { item: any };
// };

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  InventoryList: undefined;
  AddItem: { refresh?: () => Promise<void> };
  EditItem: { item: any; refresh?: () => Promise<void> };
  ItemDetail: { item: any };
};

