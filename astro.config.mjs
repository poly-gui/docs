import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	site: "https://polygui.org",
	integrations: [
		starlight({
			title: "Poly",
			defaultLocale: "root",
			social: {
				github: "https://github.com/poly-gui"
			},
			logo: {
				light: "./src/assets/logo-black.svg",
				dark: "./src/assets/logo-white.svg"
			},
			customCss: [
				"./src/styles/style.css"
			],
			sidebar: [
				{
					label: "Introduction",
					items: [
						{ label: "What is Poly?", link: "/introduction/what-is-poly/" },
						{ label: "Architecture", link: "/introduction/architecture/" }
					]
				},
				{
					label: "Guides",
					items: [
						{ label: "Installation", link: "/guides/installation/" }
					]
				},
				{
					label: "NanoPack",
					items: [
						{ label: "What is NanoPack?", link: "/nanopack/introduction/" },
						{ label: "Defining a Message", link: "/nanopack/defining-message/" },
						{ label: "Defining an Enum", link: "/nanopack/defining-enum/" },
						{ label: "Data Types", link: "/nanopack/data-types/" },
						{ label: "Code Generation", link: "/nanopack/code-generation/" },
						{
							label: "Binary Format",
							items: [
								{ label: "NanoPack Buffer", link: "/nanopack/binary-format/" },
								{ label: "Data Types", link: "/nanopack/binary-format/data-types/" }
							]
						}
					]
				}
			],
			locales: {
				root: {
					label: "English",
					lang: "en"
				}
			}
		})
	]
});
