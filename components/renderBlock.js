import Image from 'next/image'

import { TextBlock } from "./TextBlock"


export const renderBlock = (block) => {
  switch (block.type) {
    case "heading_1": {
      // <h1> viene usato per il titolo dell'articolo quindi partiamo da <h2>
      return (
        <h2>
          <TextBlock nodes={block.heading_1.text} />
        </h2>
      )
    }
    case "heading_2": {
      return (
        <h3>
          <TextBlock nodes={block.heading_2.text} />
        </h3>
      )
    }
    case "heading_3": {
      return (
        <h4>
          <TextBlock nodes={block.heading_3.text} />
        </h4>
      )
    }
    case "paragraph": {
      return (
        <p>
          <TextBlock nodes={block.paragraph.text} />
        </p>
      )
    }

    case "numbered_list_item": {
      return (
        <li>
          <TextBlock nodes={block.numbered_list_item.text} />
        </li>
      )
    }

    case "bulleted_list_item": {
      return (
        <TextBlock nodes={block.bulleted_list_item.text} />
      )
    }

    case "image": {
      return (
        <Image src={block.image.file.url} width="100vh" height="100vh" layout="responsive" objectFit="contain" />
      )
    }

    case "video": {
      return (
        <div className="videoContainer">
          <iframe className="video" width="560" height="315" src={block.video.external.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      )
    }

    default: {
      return("Unsupported block")
    }
  }
}
