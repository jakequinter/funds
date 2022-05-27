const handleCategoryColors = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        shadowColor: 'shadow-blue-100/50',
      };
    case 'cyan':
      return {
        bgColor: 'bg-cyan-100',
        textColor: 'text-cyan-800',
        shadowColor: 'shadow-cyan-100/50',
      };
    case 'green':
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        shadowColor: 'shadow-green-100/50',
      };
    case 'orange':
      return {
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
        shadowColor: 'shadow-orange-100/50',
      };
    case 'pink':
      return {
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-800',
        shadowColor: 'shadow-pink-100/50',
      };
    case 'purple':
      return {
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        shadowColor: 'shadow-purple-100/50',
      };
    case 'red':
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        shadowColor: 'shadow-red-100/50',
      };
    case 'teal':
      return {
        bgColor: 'bg-teal-100',
        textColor: 'text-teal-800',
        shadowColor: 'shadow-teal-100/50',
      };
    default:
      return {
        bgColor: 'bg-slate-100',
        textColor: 'text-slate-800',
        shadowColor: 'shadow-slate-100/50',
      };
  }
};

export default handleCategoryColors;
