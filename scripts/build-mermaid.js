import { globSync } from "glob";
import { basename, extname } from "node:path";
import { exec } from "node:child_process";

const files = globSync("src/mermaid/*.mmd");
for (const file of files) {
	exec(
		`mmdc -i ${file} -o src/assets/${basename(file).replace(extname(file), ".svg")} -t dark -b "rgb(23, 23, 26)"`,
		(err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`Compiled ${file}`);
			}
		},
	);
}
