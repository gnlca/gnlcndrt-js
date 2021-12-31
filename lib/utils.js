//utility functions

export function formatPostsToIds(articoli) {
  // let titoli = [];

  // Reduce function invece di iterare con loop for 
  // USO  .reduce((accumulator, currentValue, index, array) => { ... }, initialValue)
  const titles = articoli.reduce((ac, p) => ({ ...ac, [p.properties.Name.title[0].plain_text]: p.id }), {});

  // const titles = articoli.map((p) => p.properties.Name.title[0].plain_text); //oppure uso map e facc primm

  return (titles);

}



export const fetchData = async (url) => fetch(url).then(res => res.json());



export async function filteredPosts(tags) {
  let url = "/api/notionApi?" + tags.map(tag => "tags=" + tag).join('&');
  console.log(`the api url is ${url}`);
  const data = await fetchData(url);
  let posts = formatPostsToIds(data)
  console.log(posts);
  return (posts);
  // setPostTitles(posts => utils.formatPostsToIds(data));
};



export function formatTags(properties) {
  var {
    properties: {
      Tags: {
        multi_select: {
          options: tags
        }
      }
    }
  } = properties; //object destructuring

  tags = tags.map((tag) => ({
    name: tag.name,
    id: tag.id
  }));
  return (tags)
}