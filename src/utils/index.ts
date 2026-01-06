export const permissionTypeFormatter = (permissionType: boolean) => {
  return permissionType ? 1 : 0;
};

export const dateFormatter = (date?: string | Date) => {
  if (!date) return;
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
};
