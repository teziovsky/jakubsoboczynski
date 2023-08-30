// export const rendererOptions = {
//   renderNode: {
//     "embedded-asset-block": ({}) => {
//       return `<img
//         class="${fields.title === "Profile Picture" ? "rounded-full" : ""}"
//         src="${fields.file.url}"
//         width="${fields.title === "Profile Picture" ? 100 : fields.file.details.image.width}"
//         height="${fields.title === "Profile Picture" ? 100 : fields.file.details.image.height}"
//         alt="${fields.description}" />`;
//     },
//     hyperlink: (node, next) => {
//       return `<a href="${node.data.uri}" target="_blank" rel="noopener nofollow noreferrer">${next(node.content)}</a>`;
//     },
//     "asset-hyperlink": ({
//       data: {
//         target: { fields },
//       },
//     }) => {
//       return `<img
//         class="mix-blend-luminosity"
//         src="${fields.file.url}"
//         height="${fields.file.details.image.height}"
//         width="${fields.file.details.image.width}"
//         alt="${fields.description}" />`;
//     },
//   },
// };
