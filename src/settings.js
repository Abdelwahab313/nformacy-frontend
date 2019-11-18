export const API_BASE_URL = 'http://127.0.0.1:8000';
export const GOOGLE_MAPS_API_KEY = 'AIzaSyAkTN0O0xKX8L9-NHvR7YSNungyim6nkgk';
export const default_location = { lat: 29.8984711, lng: 31.2576282 };

export const table_localization = (type) => ({
  pagination: {
    labelDisplayedRows: '{from}-{to} من {count}',
    labelRowsSelect: type,
    firstAriaLabel: 'الصفحه الاولى',
    firstTooltip: 'الصفحه الاولى',
    previousAriaLabel: 'الصفحه السابقه',
    previousTooltip: 'الصفحه السابقه',
    nextAriaLabel: 'الصفحه التاليه',
    nextTooltip: 'الصفحه التاليه',
    lastAriaLabel: 'الصفحه الأخيره',
    lastTooltip: 'الصفحه الأخيره',
  },
  toolbar: {
    searchPlaceholder: 'بحث',
    searchTooltip: 'بحث',
  },
  header: {
    actions: 'عمليات',
  },
  body: {
    emptyDataSourceMessage: 'لا يوجد بيانات لعرضها',
    filterRow: {
      filterTooltip: 'تصفية',
    },
  },
});
