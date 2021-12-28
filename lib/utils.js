//utility functions

export function formatPostsToIds(articoli) {
    let titoli = [];
  
    // Reduce function invece di iterare con loop for 
    // USO  .reduce((accumulator, currentValue, index, array) => { ... }, initialValue)
    const titles = articoli.reduce((ac,p)=>({...ac, [p.properties.Name.title[0].plain_text]: p.id}),{});
  
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
    
    tags = tags.map((tag)=>({
      name:tag.name,
      id: tag.id
    }));
    return(tags)
  }