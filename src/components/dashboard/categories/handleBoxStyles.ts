const handleBoxStyles = (color: string) => {
  switch (color) {
    case 'purple':
      return {
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        shadowColor: 'shadow-purple-100/50',
      };
    case 'blue':
      return {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        shadowColor: 'shadow-blue-100/50',
      };
    case 'pink':
      return {
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-800',
        shadowColor: 'shadow-pink-100/50',
      };
    default:
      return {
        bgColor: 'bg-slate-100',
        textColor: 'text-slate-800',
        shadowColor: 'shadow-slate-100/50',
      };
  }
};

export default handleBoxStyles;