export const permissionTypeFormatter = (permissionType: boolean) => {
  return permissionType ? 1 : 0;
};

export const dateFormatter = (date?: string | Date) => {
  if (!date) return;
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

export const removeDuplicates = (arr: any[]) => {
  return arr.reduce((acc, current) => {
    if(acc.find((item: { id: any; }) => +item.id === +current.id)) {
      return acc;
    }
    return [...acc, current];
  }, [])
};
