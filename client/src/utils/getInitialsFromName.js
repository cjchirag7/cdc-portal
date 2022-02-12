function getInitialsFromName(name) {
  try {
    if (!name) {
      return '';
    }

    const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();

    return initials;
  } catch {
    return '';
  }
}

export default getInitialsFromName;
