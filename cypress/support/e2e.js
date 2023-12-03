export const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

export const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

export const filterByCombined = (movieList, string, genreId) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1 && m.genre_ids.includes(genreId));

export const filterPeople = (peopleList, string) =>
  peopleList.filter((p) => p.name.toLowerCase().search(string) !== -1);


export const generateRandomString = length => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
};

export const generateRandomEmail = () => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const prefix = generateRandomString(8);
  return `${prefix}@${randomDomain}`;
};
