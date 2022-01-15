//utility functions

export const fetchData = async (url) => fetch(url).then(res => res.json());


export function formatPostsToIds(articoli) {

  // Reduce function invece di iterare con loop for 
  // USO  .reduce((accumulator, currentValue, index, array) => { ... }, initialValue)
  const titles = articoli.reduce((ac, p) => ([...ac, { name: p.properties.Name.title[0].plain_text, id: p.id }]), []);

  // const titles = articoli.map((p) => p.properties.Name.title[0].plain_text); //oppure uso map e facc primm

  return (titles);
}

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



export const mergedPostsByTags = (tags, activeTags) => {
  let posts = []
  tags = tags.filter(tag => activeTags.includes(tag.name))
  let ok = true;
  for (let tag of tags) {
    for (let taggedPost of tag.posts) {
      ok = true;
      for (let p of posts) {
        if (p.id == taggedPost.id) {
          ok = false;
          break;
        }
      }
      if (ok) posts.push(taggedPost)
    }
  }
  return (posts);
}
