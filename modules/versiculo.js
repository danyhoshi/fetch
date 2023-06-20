async function bible(version, book, chapter, verse) {
  // https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${book}/chapters/${chapter}.json
  await fetch(`https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${book}/chapters/${chapter}/verses/${verse}.json`)
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then((data) => {
      console.log(data.text);
      const p = document.querySelector('p');
      p.textContent = data.text;
    })
    .catch((err) => {
      const message = err.statusText || 'Ocurrio un error';
      alert(`Error ${err.status}: ${message}`);
    });
}
export default bible;