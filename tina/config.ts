import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "aboutMe",
        label: "About Me",
        path: "src/content/about-me",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "content",
            label: "Content",
            isBody: true,
            required: true,
          },
        ],
      },
      {
        name: "project",
        label: "Project",
        path: "src/content/project",
        format: "mdx",
        fields: [
          {
            type: "number",
            name: "sort",
            label: "Sort",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "screenshot",
            label: "Screenshot",
            fields: [
              {
                type: "image",
                name: "src",
                label: "Source",
                required: true,
              },
              {
                type: "string",
                name: "alt",
                label: "Alt",
                required: true,
              },
            ],
            required: true,
          },
          {
            type: "string",
            name: "technologies",
            label: "Technologies",
            required: true,
          },
          {
            type: "string",
            name: "githubUrl",
            label: "Github URL",
            required: true,
          },
          {
            type: "string",
            name: "demoUrl",
            label: "Demo URL",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
            isBody: true,
            required: true,
          },
        ],
      },
      {
        name: "socialLink",
        label: "Social Link",
        path: "src/content/social-link",
        format: "mdx",
        fields: [
          {
            type: "number",
            name: "sort",
            label: "Sort",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "link",
            label: "Link",
            required: true,
          },
          {
            type: "string",
            name: "altText",
            label: "Alt Text",
            required: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon",
            required: true,
          },
          {
            type: "boolean",
            name: "newTab",
            label: "Open In New Tab",
            required: true,
          },
        ],
      },
      {
        name: "uses",
        label: "Uses",
        path: "src/content/uses",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "content",
            label: "Content",
            isBody: true,
            required: true,
          },
        ],
      },
    ],
  },
});
