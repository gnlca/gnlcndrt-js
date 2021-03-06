import Image from 'next/image'

import { TextBlock } from "../components/TextBlock"


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


    case "bookmark": {
      return (
        <a href={block.bookmark.url}>{block.bookmark.url}</a>
      )
    }

    case "bulleted_list_item": {
      return (
        <li>
          <TextBlock nodes={block.bulleted_list_item.text} />
        </li>
      )
    }

    case "image": {
      if (block.image.type == "file") {
        return (
          <div className="Image">
            <img src={block.image.file.url} alt=" " />
          </div>
        )
      } else if (block.image.type == "external") {
        return (
          <div className="Image">
            <img src={block.image.external.url} alt=" " />
          </div>
        )
      }
    }

    case "video": {

      if (block.video.type == "file") {
        return (
          <div className="videoContainer">
            <video className="video" controls>
              <source src={block.video.file.url} type="video/mp4" />
            </video>
          </div>
        )
      } else if (block.video.type == "external") {
        return (
          <iframe className="video" src={block.video.external.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

        )
      }
    }

    case "code": {
      return (
        <div className="code">
          <code><TextBlock nodes={block.code.text} /></code>
        </div>
      )
    }


    default: {
      return ("Unsupported block")
    }
  }
}
