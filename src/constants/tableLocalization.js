export const tableLabels = {
  textLabels: {
    body: {
      noMatch: 'لا يوجد نتائج مطابقه للبحث',
      toolTip: 'ترتيب',
      columnHeaderTooltip: (column) => `ترتيب حسب ${column.label}`,
    },
    pagination: {
      next: 'الصفحه التاليه',
      previous: 'الصفحه السابقه',
      rowsPerPage: 'عدد الصفوف:',
      displayRows: 'من',
    },
    toolbar: {
      search: 'بحث',
      downloadCsv: 'CSV تحميل',
      print: 'طباعه',
      viewColumns: 'عرض',
      filterTable: 'تصنيف',
    },
    filter: {
      all: 'الكل',
      title: 'تصنيف',
      reset: 'إعادة تعيين',
    },
    viewColumns: {
      title: 'عرض الأعمدة',
      titleAria: 'إظهار / إخفاء أعمدة الجدول',
    },
    selectedRows: {
      text: 'صف(وف) محددة',
      delete: 'حذف',
      deleteAria: 'حذف الصف المحدد',
    },
  },
};
